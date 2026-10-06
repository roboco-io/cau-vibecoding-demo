"""설계 단계 비용 계산. AWS 연결 없이 공식 단가 스냅샷과 가정으로 계산한다."""
import argparse
import json
from decimal import Decimal
from pathlib import Path


def calculate(snapshot, requests, dpu_per_request, free_tier=False):
    d = lambda value: Decimal(str(value))
    a = {k: d(v) for k, v in snapshot['assumptions'].items()}
    rates = {k: d(v['usd']) for k, v in snapshot['rates'].items()}
    allowances = {k: d(v) if free_tier else Decimal(0)
                  for k, v in snapshot['monthly_free_allowances'].items()}
    billable = lambda key, value: max(Decimal(0), value - allowances[key])
    n = d(requests)
    duration = n * a['api_memory_gb'] * a['api_seconds']
    duration += a['ingest_runs'] * a['ingest_memory_gb'] * a['ingest_seconds']
    total_dpu = n * d(dpu_per_request) + a['other_monthly_dpu']
    lines = {
        'API Gateway HTTP API': n * rates['http_api_request'],
        'Lambda': billable('lambda_requests', n + a['ingest_runs']) * rates['lambda_request']
                  + billable('lambda_gb_seconds', duration) * rates['lambda_gb_second'],
        'Aurora DSQL DPU': billable('dsql_dpu', total_dpu) * rates['dsql_dpu'],
        'Aurora DSQL storage': billable('dsql_storage_gb_month', a['dsql_storage_gb_month'])
                               * rates['dsql_storage_gb_month'],
        'CloudFront': billable('cloudfront_requests', n + a['static_requests'])
                      * rates['cloudfront_https_request']
                      + billable('cloudfront_egress_gb', a['viewer_egress_gb'])
                      * rates['cloudfront_egress_gb']
                      + a['origin_transfer_gb'] * rates['cloudfront_to_origin_gb'],
        'S3': a['s3_storage_gb_month'] * rates['s3_storage_gb_month']
              + a['s3_put_requests'] * rates['s3_put']
              + a['s3_get_requests'] * rates['s3_get'],
        'SQS': billable('sqs_requests', a['sqs_requests_including_idle_polls']) * rates['sqs_request'],
        'CloudWatch': billable('logs_ingest_gb', a['logs_ingest_gb']) * rates['logs_ingest_gb']
                      + billable('logs_storage_gb_month', a['logs_storage_gb_month'])
                      * rates['logs_storage_gb_month']
                      + billable('standard_alarms', a['standard_alarms']) * rates['alarm_month'],
        'Cognito Lite': billable('cognito_direct_mau', a['cognito_direct_mau']) * rates['cognito_mau'],
    }
    total = sum(lines.values())
    return {'free_allowances_applied': free_tier, 'api_requests': requests,
            'dpu_per_api_request': str(dpu_per_request), 'total_dpu': str(total_dpu),
            'lambda_gb_seconds': str(duration),
            'monthly_usd_by_service': {k: str(v) for k, v in lines.items()},
            'monthly_usd_total': str(total),
            'monthly_krw_budget_net': str(total * a['budget_krw_per_usd']),
            'monthly_krw_budget_with_assumed_vat': str(total * a['budget_krw_per_usd']
                                                      * (1 + a['assumed_vat_rate']))}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--requests', type=int, default=100000)
    parser.add_argument('--dpu-per-request', type=Decimal, default=Decimal(1))
    parser.add_argument('--free-tier', action='store_true')
    args = parser.parse_args()
    if args.requests < 0 or not args.dpu_per_request.is_finite() or args.dpu_per_request < 0:
        parser.error('요청 수와 DPU는 유한한 음이 아닌 수여야 합니다.')
    snapshot = json.loads((Path(__file__).resolve().parents[1]
                           / 'docs/cost/pricing-snapshot.json').read_text())
    print(json.dumps(calculate(snapshot, args.requests, args.dpu_per_request, args.free_tier),
                     indent=2, ensure_ascii=False))


if __name__ == '__main__':
    main()
