# ADR-005: AWS 서버리스로 조회와 적재를 분리한다

- 상태: 운영 설계 채택, 구현 전. AWS 서버리스 운영은 사용자 요청.
- 날짜: 2026-10-06.
- 대체: ADR-002의 로컬 단일 앱 운영 구성.

## 결정과 이유

서울 단일 리전을 기본 가정으로 합니다. 정적 UI는 비공개 S3와 CloudFront OAC로 제공하고 `/api/*`는 API Gateway HTTP API로 전달합니다. 인증은 Cognito Lite의 직접 로그인과 JWT authorizer를 제안합니다. Python Lambda가 검증된 파라미터로 Aurora DSQL SQL을 실행합니다. 인증 API 응답은 캐시하지 않고 Authorization 헤더를 원점에 전달합니다.

원본·선수 매핑을 먼저 S3에 올리고 manifest를 마지막에 업로드합니다. `incoming/manifests/`의 객체 생성만 SQS Standard로 보내고 처리 Lambda가 두 입력을 확인·검사·적재합니다. 결과 파일은 다른 prefix에 저장해 재귀 트리거를 방지합니다. 메시지는 객체 경로·버전 참조만 담습니다. SQS와 S3의 중복 전달을 전제로 실행 키·완료 확인·재시도를 설계합니다. 실패 메시지는 DLQ로 보냅니다.

CloudWatch로 로그·에러·DLQ·DSQL 소비량을 관측하고, CDK를 향후 IaC 도구로 제안합니다. DB 인증은 Lambda IAM 역할과 DSQL 커넥터가 담당합니다. 기본 구성은 고객 VPC에 Lambda를 연결하지 않아 NAT Gateway·PrivateLink의 고정 요금을 만들지 않습니다. 공개 DSQL 엔드포인트에는 허용된 실행 역할만 접속할 수 있도록 IAM·SQL 권한을 제한합니다.

## 대안과 결과

상시 컨테이너+ALB는 고정 운영 요소가 늘고, 로컬 앱은 AWS 운영 경험을 보여주지 못합니다. Step Functions는 장기·분할 작업에서 유용하지만 한 경기 처리에는 우선 SQS와 Lambda를 사용합니다. 멀티리전은 복제 쓰기·저장 비용을 늘리므로 요구가 생길 때 재검토합니다.

서버리스도 처리 시간·연결 수·중복 전달·인증 실패를 관리해야 합니다. 배포된 리소스나 실제 성능을 주장하지 않으며 초기 운영은 공개 학습 데이터를 대상으로 합니다.

## 근거

[S3 이벤트](https://docs.aws.amazon.com/AmazonS3/latest/userguide/EventNotifications.html), [DSQL 리전](https://docs.aws.amazon.com/aurora-dsql/latest/userguide/), [DSQL 접근 정책](https://docs.aws.amazon.com/aurora-dsql/latest/userguide/resource-based-policies.html). 확인일: 2026-10-06.
