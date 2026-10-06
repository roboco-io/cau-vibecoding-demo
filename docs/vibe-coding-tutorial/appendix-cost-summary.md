# 비용 부록: 발생 비용과 설계 예산

## 실제 세션 비용

| 대상 | 기록으로 확인한 작업 | 비용 기록 |
|---|---|---|
| 이 프로젝트 AWS 리소스 | 생성·배포 없음 | 사용료 발생 작업 없음, 추적 누적 $0.00 |
| GitHub Pages | 공개 배포와 Actions 성공 | 실제 계정 청구 미확인 |
| AI 코딩·Exa 검색 | 도구 사용 기록 있음 | 단가·청구량·실제 청구 미확인 |
| 합계 | 서로 다른 서비스 비용 | 총액 산출 불가 |

다른 AWS 계정 리소스의 사용료는 조사하지 않았습니다. 공개 목업이 열린다는 사실로 전체 작업이 무료였다고 결론내리지 않습니다.

## 월 운영 견적

2026-10-06 서울 리전 공식 단가와 설계 가정으로 계산했습니다. API 10만회 외에 정적 요청 10만회, DSQL 저장 2GB, S3 평균 5GB, 월 적재 30회, 추가 DPU 20,000 등을 포함합니다.

| API당 DPU 가정 | 월 총 DPU | 무료 혜택 전 환산 | 사용 가능한 무료량 적용 |
|---|---:|---:|---:|
| 0.1 | 30000.0 | $5.43 | $0.66 |
| 1 | 120000 | $6.33 | $0.86 |
| 10 | 1020000 | $15.33 | $9.86 |

기본 1DPU 시나리오의 상세 합계는 $6.32848012와 $0.862입니다. 요청당 DPU는 벤치마크한 값이 아닙니다. 저장한 가격은 당시의 단가이므로 실제 배포에는 최신 공식 가격을 확인해야 합니다.

계획용 환율 1,500원/$로 환산하면 약 9,493원과 1,293원입니다. VAT 10%를 추가 가정하면 약 10,442원과 1,422원이며 현재 환율·실제 세금계산서가 아닙니다. 무료량이 계정·조직의 다른 사용으로 이미 소진됐다면 무료 적용 후 금액을 사용할 수 없습니다.

[상세 산식과 제외 범위](../../projects/diamonddb/docs/cost-estimate.md) · [단가 스냅샷](../../projects/diamonddb/docs/cost/pricing-snapshot.json) · [계산 결과](../../projects/diamonddb/docs/cost/estimate-results.json)

## 직접 해보기

```sh
python3 projects/diamonddb/scripts/estimate_cost.py --dpu-per-request 0.1
python3 projects/diamonddb/scripts/estimate_cost.py --free-tier
python3 projects/diamonddb/scripts/estimate_cost.py --dpu-per-request 10 --free-tier
```

`--requests`를 바꾸어도 정적 요청·전송·저장·적재량은 자동으로 비례 증가하지 않습니다. 작은 기본 시나리오를 설명하는 도구이며 대규모 과금 티어·모든 운영 기능을 계산하는 도구가 아닙니다.
