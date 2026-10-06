# 데이터 계약안

상태: 설계. 실제 행값과 키 유일성은 미검증입니다. 확인일: 2026-10-06.

## 필수·선택 필드

| 입력 | 정규화 | 정책 |
|---|---|---|
| `game_pk`, `at_bat_number`, `pitch_number` | 동일 이름의 정수 | 필수, 양수. 복합 키 후보를 실제 샘플로 검증 |
| `pitcher`, `batter` | `pitcher_id`, `batter_id` | 필수, 양의 정수, MLBAM ID |
| `game_date` | ISO 날짜 | 필수, 실행당 경기 하나 |
| `home_team`, `away_team` | 문자열 | 필수, 빈 값 금지, 같은 경기 속성 일치 |
| `release_speed` | `release_speed_kmh` | 선택, 값이 있으면 유한한 양수. mph×1.609344, 저장값은 반올림하지 않음 |
| `pitch_type` | 문자열 | 선택, 미지의 코드를 임의 대체하지 않음 |
| `plate_x`, `plate_z` | 수치 또는NULL | 선택, 유한값. feet 단위를 명시 |
| `launch_speed`, `launch_angle`, `events` | 초기DB에는 저장하지 않음 | 원본에는 보존. 결측만으로 오류 판정하지 않음 |

추가 열은 원본에 보존합니다. 필수 헤더 누락·빈 파일·다중 경기·같은 경기의 속성 불일치는 파일 오류로 중단합니다. 수치의 빈 값은NULL로 처리하고 선택값의 결측 원인을 임의 추정하지 않습니다.

## 선수 연결

Chadwick의 `key_mlbam`으로 `key_uuid`, `name_first`, `name_last`를 연결합니다. 공개CSV 헤더는2026-10-06에 확인했습니다. 동일MLBAM ID가 여러UUID에 연결되면 모호한 매핑으로 분류합니다. 연결이 없거나 모호하면 경고를 남기고 ID만 저장하며 이름·UUID는NULL입니다. 이름으로 추정하지 않습니다.

## 품질 코드

| 코드 | 수준 | 처리 |
|---|---|---|
| `REQUIRED_MISSING` | error | 필수값 누락, 격리 |
| `INVALID_TYPE` | error | 수치·날짜 해석 실패, 격리 |
| `INVALID_VALUE` | error | 비유한 수치·키 또는구속의 비양수, 격리 |
| `DUPLICATE_KEY` | error | 입력 내 동일키 그룹 전체 격리 |
| `CONTENT_CONFLICT` | error | DB의 동일키와 다른 내용, 기존값 유지·격리 |
| `PLAYER_UNRESOLVED` | warning | 연결 없음·모호, ID만 저장 |
| `MEASUREMENT_MISSING` | warning | 구속·위치 결측, NULL저장 |

운영 DB는 Aurora DSQL입니다. run_id와 first_run_id는 UUID로 관리하고 SQL PK·FK를 사용합니다. [SQL 운영 정책](adr/006-aurora-dsql.md)을 따릅니다.

입력 행 번호는 헤더를 제외한1부터 시작합니다. 파일명·행 번호·코드·열·이유·값을 기록합니다. 행 판정은 `inserted`, `unchanged`, `quarantined` 중 하나입니다.

**정상 종료 실행의 입력 행수 = inserted + unchanged + quarantined.** 경고가 있는 행도inserted 또는unchanged에 포함됩니다. 문제 건수는 한 행에 여러 개일 수 있어 이 식에 사용하지 않습니다. failed 실행의 미처리 행은 완료 실행과 같은 집계로 표현하지 않습니다.

## manifest와 동일성

출처URL·취득 시각·조회 날짜와 경기ID·원본SHA-256·Chadwick 커밋SHA 및파일SHA-256·선수 추출 조건·스키마/규칙 버전·원본 또는오류 주입본 여부를 기록합니다. 값은 실제 확보 후 기록하며 임의의 성공 값을 채우지 않습니다.

DB에 저장하는 정규화 필드의 순서·NULL표현·수치 직렬화를 고정해 `canonical_hash`를 계산합니다. 입력 열 순서·행 순서·저장하지 않는 추가 열은 투구 동일성에 영향을 주지 않습니다. DB기록은 최초 삽입 실행을 참조하며 이후 실행별 판정은ROW_RESULTS에 남깁니다. 선수 매핑 정보는 최초 등록 버전을 유지하고 변경된 UUID/이름은경고로 남겨 승인 없이 덮어쓰지 않습니다. 승인 갱신은후속 범위입니다.

[Statcast 정의](https://baseballsavant.mlb.com/csv-docs) · [Chadwick Register](https://github.com/chadwickbureau/register). 헤더 확인은 행값의 정확도 검증을 뜻하지 않습니다.
