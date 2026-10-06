# 서버리스 운영·복구 계획

상태: 설계. 배포·성능·복구 시험 전입니다. 서울 단일 리전과 공개 학습 자료를 가정합니다.

## 배포와 권한

향후 CDK로 dev 환경 하나를 만들고 S3·CloudFront·HTTP API·Lambda·SQS·DLQ·Cognito·DSQL·로그를 관리합니다. API 읽기, 적재 쓰기, DDL 배포 역할을 나눕니다. DB IAM 인증은 SQL 권한과 함께 검증하고 운영 요청에서 admin 역할을 사용하지 않습니다. 로그인용 공개 앱 클라이언트에는 비밀 키를 넣지 않습니다.

DSQL 기본 키와 외래 키를 검증한 뒤 비동기 인덱스가 준비된 것을 확인합니다. SQL은 바인딩하고 제한된 조회와 키 페이지네이션만 노출합니다. 정적 UI는 S3 OAC·HTTPS, 인증 API는 캐시 비활성·JWT 검증을 사용합니다. 개발 목업의 가상 자료와 실제 자료 모드를 구분합니다.

## 런타임 설정 제안

- 조회 Lambda: arm64, 512MiB, timeout 10초, 예약 동시성 최대 20. DB 연결은 실행 환경당 소수만 재사용합니다. 비용 계산의 200ms는 검증되지 않은 평균 가정입니다.
- 적재 Lambda: arm64, 1GiB, timeout 180초, 예약 동시성 2, SQS batch size 1. 한 메시지는 경기 하나이며 선수 매핑은 필요한 부분만 포함합니다.
- SQS visibility timeout 1,200초, 실패 전달 5회 후 DLQ, DLQ 보존 14일. 재시도 동안 visibility와 실행 시간을 확인합니다.
- 작은 파일은 최대 500개 입력 행이며 실제 전체 변경 계획이 2,000행·8MiB를 넘으면 적재 전에 거부합니다. DSQL의 실제 제한보다 낮춘 앱 정책입니다.
- 로그 보존 30일. JWT·IAM 토큰·원본 전체 행을 로그에 출력하지 않습니다. 원본 versioning과 오래된 버전 정리는 저장 예산·자료 조건에 맞춰 설정합니다.

## 관측과 대응

표준 알람 5개를 비용 가정에 넣습니다: API 5xx, Lambda Errors, DLQ 메시지 존재, DSQL TotalDPU 증가, DSQL OCC 충돌. Throttles·Duration·연결 생성률은 같은 운영 점검에서 확인합니다. 지표 조회를 자동 폴링하거나 커스텀 지표를 추가하면 비용 모델에 반영합니다.

원본 해시별 입력·적재·격리·동일 건수를 대조합니다. 알람 시 run_id → S3 버전 → Lambda 로그 → SQL 오류를 연결해 원인을 확인합니다. 확정 입력 오류는 자료 수정 후 새 해시로 재검사하고, DLQ는 원인을 해결한 뒤 재처리합니다.

DSQL 접속은 IAM 토큰과 TLS로 관리합니다. 끊긴 연결은 폐기하고 새 연결을 생성합니다. OCC 충돌은 최대 3회 전체 트랜잭션 재시도 후 실패 처리합니다. 조회와 적재가 급증하면 API 스로틀·Lambda 동시성으로 DB 접속 증가를 제한합니다.

## 복구와 비용 범위

초기 데이터는 공개 원본으로부터 재생성할 수 있습니다. S3 원본·manifest·품질 보고서·스키마 버전을 보존하고, 별도 dev 클러스터에서 재적재 후 건수·해시·조회 결과를 비교하는 복구 시험을 계획합니다. 원본 S3·DB·보고서의 같은 장애까지 보호한다고 가정하지 않으며 RPO/RTO는 시험 후 기록합니다.

AWS Backup 기반 DSQL 백업·복원은 실제 구단 운영 단계의 후보입니다. 초기 비용 계산은 원본 재처리로 복구하는 학습 환경이며 AWS Backup, 멀티리전 복제, 원격 복원 트래픽을 포함하지 않습니다. 해당 기능을 채택하면 단가와 보존량을 별도 견적합니다. 다중 AZ 가용성은 백업의 대체가 아닙니다.

## 근거

[DSQL IAM 인증](https://docs.aws.amazon.com/aurora-dsql/latest/userguide/authentication-authorization.html), [연결·트랜잭션 제한](https://docs.aws.amazon.com/aurora-dsql/latest/userguide/CHAP_quotas.html), [DSQL 백업·복원](https://docs.aws.amazon.com/aurora-dsql/latest/userguide/backup-aurora-dsql.html), [SQS와 Lambda](https://docs.aws.amazon.com/lambda/latest/dg/with-sqs.html). 확인일: 2026-10-06.
