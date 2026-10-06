# 월 10만 요청 운영 비용

산정일: 2026-10-06. 리전: 서울 `ap-northeast-2`, Aurora DSQL 단일 리전, CloudFront는 한국 이용자에 적용되는 Asia Pacific 단가입니다. 실제 배포·벤치마크·청구 결과가 아닌 설계 예산입니다.

## 결과

기본 가정의 월 사용량을 무료 혜택 없이 단가로 환산하면 **$6.33**, 사용 가능한 월 무료량을 모두 적용하면 **$0.86**입니다. 환산용 **1달러=1,500원**을 가정하면 약 **9,493원 / 1,293원**, VAT 10%를 추가 가정하면 **10,442원 / 1,422원**입니다. 환율은 현재 고시 환율이 아닌 계획용 숫자이며 실제 세금·환전·계정별 무료량에 따라 청구는 달라집니다.

초기 예산은 **월 1만~2만원**을 권고합니다. 이는 기본 시나리오와 DPU가 높은 경우를 비교한 예산 판단이며 비용 상한이나 지출 차단을 보장하지 않습니다.

## 무엇을 가정했는가

| 항목 | 월 가정 |
|---|---|
| 사용자 요청 | **조회 API 100,000회**로 보수적으로 해석 |
| 추가 UI 요청 | 정적 파일 100,000회, CloudFront 총 200,000회 |
| 전송 | viewer 전달 20GB, 원점 방향 0.1GB; API 캐시 적중률 0% |
| 조회 Lambda | arm64, 512MiB, 평균 과금 시간 200ms, API당 1회 |
| 적재 Lambda | 월 30회, 1GiB, 평균 60초; 재시도 비용은 평균 사용량 가정에 반영해야 함 |
| Aurora DSQL | API당 **1 DPU라는 예산 가정**, 적재·DDL·백그라운드·추가 보고서 쿼리 월 20,000 DPU |
| DSQL 저장 | 월평균 2GB, 테이블과 인덱스 포함; 초기 실제 한 경기 크기의 측정값이 아님 |
| S3 저장·요청 | 원본·버전·선수 매핑·보고서·웹 자산 평균 5GB, PUT 1,000회, GET 10,000회 |
| 정적 캐시 | UI 원점 조회 약 10%, 나머지는 CloudFront 캐시 |
| SQS | 빈 폴링·재시도·송수신삭제를 포함해 300,000 요청의 계획 여유량 |
| CloudWatch | 로그 입력·보관 각각 0.1GB, 표준 알람 5개, 기본 서비스 지표 |
| Cognito Lite | 직접 로그인 MAU 100명, 기업 SAML/OIDC·SMS·M2M·고급보안 제외 |

API 10만회는 방문자 10만명과 다릅니다. 한 번의 페이지 이용에서 API·정적 파일 요청이 여러 번 발생할 수 있습니다. 데이터 적재량과 DB 저장량도 HTTP 요청 수에서 자동으로 결정되지 않습니다.

## 공식 단가와 산식

정확한 SKU·게시일·버전 고정 URL은 [단가 스냅샷](cost/pricing-snapshot.json)에 있습니다. API 가격의 서울 단가는 미국 리전 예시와 다를 수 있으므로 공식 지역별 Price List를 사용했습니다.

| 항목 | 단가 | 기본 산식 |
|---|---|---|
| HTTP API | $1.23 / 100만 요청 | 100,000 × $0.00000123 |
| Lambda arm64 | $0.20 / 100만 호출, $0.0000133334 / GB-s | 100,030회 + (100,000×0.5×0.2 + 30×1×60)=11,800 GB-s |
| DSQL | **$10 / 100만 DPU**, **$0.40 / GB-month** | (100,000×1+20,000)=120,000 DPU, 저장 2GB |
| CloudFront HTTPS·전송 | $0.012 / 10,000회, viewer $0.12/GB, 원점 $0.06/GB | 200,000회 + 20GB + 0.1GB |
| S3 Standard | $0.025/GB-month, PUT $0.0045/1,000, GET $0.00035/1,000 | 저장 5GB + PUT 1,000 + GET 10,000 |
| SQS Standard | $0.40 / 100만 요청 | 300,000회 |
| CloudWatch | 로그 $0.76/GB 입력, $0.0314/GB-month 보관, 알람 $0.10/월 | 각각 0.1GB + 표준 알람 5개 |
| Cognito Lite | $0.0055/MAU | 직접 로그인 100명 |

요금표의 저장·전송 단위로 가정한 사용량을 계산합니다. 실제 사용량은 해당 서비스의 과금 바이트 단위와 월평균 보관량으로 집계해야 합니다. 원점→CloudFront의 AWS 트래픽을 중복된 인터넷 송신 비용으로 더하지 않았습니다. CloudFront→원점 요청 바이트에는 별도 여유량을 넣었습니다.

## 서비스별 결과

| 서비스 | 무료 혜택 전 환산 | 월 무료량 모두 사용 가능 |
|---|---:|---:|
| API Gateway HTTP API | $0.1230 | $0.1230 |
| Lambda | $0.1773 | $0.0000 |
| Aurora DSQL DPU | $1.2000 | $0.2000 |
| Aurora DSQL storage | $0.8000 | $0.4000 |
| CloudFront | $2.6460 | $0.0060 |
| S3 | $0.1330 | $0.1330 |
| SQS | $0.1200 | $0.0000 |
| CloudWatch | $0.5791 | $0.0000 |
| Cognito Lite | $0.5500 | $0.0000 |
| **합계** | **$6.3285** | **$0.8620** |

무료 적용은 다른 서비스·배포가 같은 계정·조직의 무료량을 쓰지 않았고 해당 서비스·기능이 대상인 경우입니다. DSQL 월 100,000 DPU·1GB, Lambda 월 100만 호출·400,000GB-s, CloudFront 월 1TB·1,000만 요청, SQS 월 100만 요청, 기본 CloudWatch 무료량, Cognito 직접 로그인 월 10,000 MAU를 사용했습니다. API Gateway의 초기 12개월 혜택과 신규 계정 크레딧, S3의 한시 혜택은 적용하지 않았습니다.

## DPU 불확실성과 민감도

**API 1회=1 DPU는 제품의 고정 규칙이 아닙니다.** SQL의 읽은 데이터·계산·쓰기·인덱스·FK 검사·재시도·백그라운드 작업에 따라 달라집니다. 아래는 다른 가정을 고정하고 요청당 DPU만 바꾼 시나리오입니다.

| 요청당 DPU 가정 | 월 DPU, 추가 20,000 포함 | 무료 혜택 전 총액 | 무료량 적용 총액 |
|---|---:|---:|---:|
| 0.1 DPU | 30000.0 | $5.43 | $0.66 |
| 1 DPU | 120000 | $6.33 | $0.86 |
| 10 DPU | 1020000 | $15.33 | $9.86 |

구현 후 대표 JOIN·필터·집계와 배치 SQL을 실제 자료 분포로 실행하고 `EXPLAIN ANALYZE VERBOSE`의 방향성 추정 및 CloudWatch `TotalDPU`·청구 사용량을 비교해 가정을 바꿉니다. Lambda의 벽시계 시간과 DSQL 계산 DPU는 같은 지표가 아닙니다. 응답이 작아도 전체 스캔이 크면 DB 비용이 커질 수 있습니다.

## 포함하지 않은 비용

멀티리전·AWS Backup·PrivateLink·NAT Gateway·WAF·고정 도메인과 Route53·유료 지원·CI/CD 빌드·SMS/메일 발송·Secrets Manager·분석 SQL 대량 실행·런타임 LLM 호출은 없습니다. 기본 CloudFront 도메인, 비VPC Lambda, IAM DB 인증, 기본 암호화, S3 원본 재처리 복구를 전제로 합니다. 실제 구단 운영에서 추가 기능을 선택하면 별도 산정해야 합니다. 여러 dev/prod 환경은 저장·인증·로그 등 비용을 더합니다.

## 재계산

```sh
python3 projects/diamonddb/scripts/estimate_cost.py
python3 projects/diamonddb/scripts/estimate_cost.py --free-tier
python3 projects/diamonddb/scripts/estimate_cost.py --dpu-per-request 0.1
python3 projects/diamonddb/scripts/estimate_cost.py --dpu-per-request 10 --free-tier
```

계산기는 네트워크·AWS 계정 접근 없이 Decimal로 합산합니다. `--requests`는 API와 그에 따른 호출·DPU만 변경하며 정적 요청·전송·적재·저장량은 자동 비례 조정하지 않습니다. 큰 규모에는 티어·트래픽 가정을 모두 재검토해야 합니다. [계산 결과 JSON](cost/estimate-results.json)은 세 시나리오의 전체 금액을 기록합니다.

## 공식 출처

- [Aurora DSQL 가격](https://aws.amazon.com/rds/aurora/dsql/pricing/)과 [서울 리전 가격 JSON](https://pricing.us-east-1.amazonaws.com/offers/v1.0/aws/AuroraDSQL/20260911124522/ap-northeast-2/index.json).
- [API Gateway](https://aws.amazon.com/api-gateway/pricing/), [Lambda](https://aws.amazon.com/lambda/pricing/), [S3](https://aws.amazon.com/s3/pricing/), [SQS](https://aws.amazon.com/sqs/pricing/).
- [CloudFront 종량제](https://aws.amazon.com/cloudfront/pricing/pay-as-you-go/), [CloudWatch](https://aws.amazon.com/cloudwatch/pricing/), [Cognito](https://aws.amazon.com/cognito/pricing/).

단가는2026-10-06에공식AWS Price List를 조회한 값입니다. AWS 가격 페이지의 다른 리전 예시를 서울 단가로 대체하지 않았습니다.
