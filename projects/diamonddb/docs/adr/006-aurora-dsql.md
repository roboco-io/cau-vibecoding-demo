# ADR-006: SQL 필수 조건에 따라 Aurora DSQL을 사용한다

- 상태: DB 선택 채택, 상세 구현 정책 제안.
- 날짜: 2026-10-06.
- 사용자 결정: SQL 필수, DynamoDB 대신 Aurora DSQL.

## 결정

서울 리전의 단일 리전 Aurora DSQL 클러스터를 사용합니다. games·players·pitches·ingest_runs·row_results·quality_issues 관계형 모델을 유지하고 SQL JOIN, 기본 키·외래 키, 필터·집계·인덱스를 포트폴리오 증거로 남깁니다. PostgreSQL 호환 범위는 일반 PostgreSQL의 모든 기능과 같다고 가정하지 않습니다.

Lambda는 Python DSQL 커넥터와 psycopg로 IAM 인증·TLS 연결을 생성합니다. API 역할은 SELECT, 적재 역할은 필요한 DML, 마이그레이션 역할은 DDL로 분리합니다. 한 실행 환경에서 작은 연결 풀을 재사용하되 끊긴 연결은 폐기하고 새 연결의 IAM 토큰은 커넥터가 생성합니다. RDS Proxy·RDS Data API를 전제로 하지 않습니다.

UUID 실행 키는 애플리케이션에서 만들고 자동 증가 값에 의존하지 않습니다. 숫자 MLBAM·경기 ID와 UUID 기술 키를 구분합니다. 기존 투구 값을 덮어쓰는 UPSERT 대신 PK 충돌과 canonical_hash를 검사해 동일·충돌을 분류합니다.

## 트랜잭션·접속 경계

확인한 DSQL 한계는 변경 3,000행, 변경 크기 10MiB, 트랜잭션 5분, 연결 60분, 신규 연결 초당 100개입니다. 첫 파일 처리의 애플리케이션 한도는 최대 입력 500행, 계획된 전체 변경 2,000행·8MiB, 트랜잭션 120초 목표로 더 작게 둡니다. 모든 투구·선수·판정·문제 행을 합해 쓰기 계획을 검토합니다. 초과 입력은 쓰기 전에 거부하고 향후 분할 워크플로우 대상으로 안내합니다.

OCC 충돌의 SQLSTATE 40001은 전체 트랜잭션을 지수 지연·jitter로 최대 3회 재시도합니다. 동시 처리 때 기준값 조회와 삽입·완료 상태는 같은 트랜잭션에서 수행합니다. 원본 보고서의 S3 저장은 DB 트랜잭션과 원자적으로 묶이지 않으므로 DB 기록을 기준으로 보고서를 재생성할 수 있게 합니다.

조회는 키 기반 페이지네이션, LIMIT 최대 100을 사용합니다. 경기·투수/타자·타석·투구 순의 인덱스를 실제 SQL 계획으로 검토하고 인덱스 완료 전에 해당 조회를 운영에 공개하지 않습니다. SQL 권한·FK·트랜잭션 충돌·EXPLAIN 결과는 실제 DSQL에서 검증해야 합니다.

## 대안과 비용

DynamoDB는 SQL 요구를 충족하는 주 DB로 채택하지 않습니다. Aurora Serverless v2도 SQL을 제공하지만 사용자 지정 선택은 DSQL입니다. SQLite는 목업 단계의 운영 DB 후보에서 대체되었습니다. DSQL에는 상시 인스턴스 요금 대신 DPU·저장량 과금이 적용되고 요청 수만으로 비용이 확정되지는 않습니다.

## 근거

[DSQL 리전·호환성](https://docs.aws.amazon.com/aurora-dsql/latest/userguide/), [제약](https://docs.aws.amazon.com/aurora-dsql/latest/userguide/CHAP_quotas.html), [FK](https://docs.aws.amazon.com/aurora-dsql/latest/userguide/working-with-foreign-key-constraints.html), [Python 커넥터](https://docs.aws.amazon.com/aurora-dsql/latest/userguide/SECTION_program-with-dsql-connector-for-python.html), [DPU 과금](https://aws.amazon.com/rds/aurora/dsql/pricing/). 확인일: 2026-10-06.
