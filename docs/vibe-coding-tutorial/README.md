---
last_generated: "2026-10-06T11:02:53+00:00"
last_log_message_uuid: "msg_0e4d49f3e5c79c46016ac4d24cab7487d0ae6e3e83e47bc933"
source_session_id: "01a10e88-fb33-7091-a606-0b6e238acfad"
source_until: "2026-10-06T10:49:48.892Z"
language: ko
chapter_count: 7
---

# 공고에서 공개 목업까지: DiamondDB 바이브 코딩 튜토리얼

중앙대학교 학생을 위한 한국어 튜토리얼입니다. 실제 대화의 **공고 → 가상 목표 프로필 → 공개 자료 조사 → 설계 인터뷰 → UI 목업 → AWS SQL 설계·비용 → GitHub Pages 배포** 흐름을 따라갑니다. 실제 프롬프트의 오탈자도 대부분 유지했습니다.

**[완성된 공개 목업](https://roboco.io/cau-vibecoding-demo/)** · [프로젝트 문서](../../projects/diamonddb/README.md)

## 무엇이 완성되었는가

| 실제 수행 | 아직 계획 또는 미수행 |
|---|---|
| 공고 이미지 확인과 자료 조사 | 실제 Statcast 경기·선수 파일 확보·적재 |
| 목표 프로필·Overview·ADR·다이어그램 | 실제 SQL 스키마·DB·조회 API |
| 가상 UI와 브라우저 검증 | AWS 리소스 생성·배포·DPU 측정 |
| 공식 단가 기반 계산기 | 실제 월 AWS 청구·운영 성능 |
| GitHub Pages 공개 배포 | 실제 구단 장비·시스템 연동 |

목업에 표시된 경기·선수·수치는 가상입니다.이 튜토리얼은 학생의 실제 경력·성과를 만들어내지 않습니다.

## 준비물

- Git, Node.js 22이상, Python 3, 웹브라우저. 명령 예시는 macOS/Linux/WSL 셸 기준입니다.
- GitHub CLI는 7장의 읽기 전용 상태 확인에 필요합니다. 별도 로그인 명령이나 개인 자격 증명은 싣지 않습니다.
- SQL·AWS 용어는 설계에서 설명합니다. 튜토리얼을 따라 목업을 실행하는 데 AWS 계정·API 키·FastAPI·DSQL 커넥터 설치는 필요하지 않습니다.
- AI 코딩 도구는 구현 과정 재현에 사용할 수 있지만 유료 이용·검색 비용은 각자 확인합니다.

## 목차

| 장 | 내용 |
|---|---|
| [1. 채용공고와 요구](01-job-to-requirements.md) | 이미지에 숨은 업무를 확인하고 검증 가능한 역량으로 변환 |
| [2. 목표 프로필](02-target-profile.md) | 경력 대신 수행할 업무·AI 협업·증거 설명 |
| [3. 공개 자료 선택](03-open-data-project.md) | Statcast·Chadwick, 라이선스와 데이터 결측 |
| [4. 인터뷰와 설계](04-interview-and-design.md) | 범위 확정, DiamondDB, ADR와 완료 기준 |
| [5. 목업과 디버깅](05-mockup-and-debugging.md) | 초기화 오류, PC·모바일·키보드 검증 |
| [6. AWS 서버리스 SQL·비용](06-serverless-sql-cost.md) | DynamoDB 제안에서 Aurora DSQL로 수정, 예산 시나리오 |
| [7. Pages 배포](07-github-pages-deployment.md) | 커밋 분리, 원격 상태·실제 공개 URL 검증 |
| [비용 부록](appendix-cost-summary.md) | 발생 비용과 월 운영 견적 구분 |
| [타임라인·근거 부록](appendix-timeline-and-evidence.md) | 로그 시각, 근거와 업데이트 기준 |

## 시간과 비용

기록의 핵심 구간은 2026-10-06 **16:41:56–19:49:48 KST**, 경과 약 **3시간 8분**입니다. 중단·대기·사용자 응답이 포함되어 있어 실제 작업 시간이나 따라하기 예상시간이 아닙니다. 각 장은 논리적 주제로 묶어 시간 구간이 겹칠 수 있습니다.

이번 세션은 AWS 리소스를 생성하지 않아 이 프로젝트의 AWS 사용료를 발생시키는 작업은 없습니다. AI·Exa·GitHub 서비스의 실제 청구는 확인하지 않았으므로 **총 세션 비용은 미확인**입니다. 설계한 월 운영 견적은 기본 가정에서 무료 혜택 전 **$6.33**, 무료량을 모두 사용할 수 있을 때 **$0.86**이며 실제 발생비용으로 합산하지 않습니다.

## 읽는 방법과 다시 실행

1장에서 저장소를 clone 한 뒤 각 장의 ‘직접 해보기’를 실행합니다. 현 저장소는 후속 개선이 반영된 최종 파일을 제공하며 과거의 초안·오류를 그대로 실행하는 자료는 아닙니다. 배포 당시 커밋은 `6ec04d4`입니다.

```sh
node scripts/check.mjs
node --check projects/diamonddb/mockup/app.js
python3 projects/diamonddb/scripts/estimate_cost.py
```

## 자료 범위와 업데이트

요청한 프로젝트의 Codex JSONL 한 세션만 분석했습니다. `response_item`의 message/tool 출력 구조를 확인했고 Claude Code 의`type:user`구조를 가정하지 않았습니다. 시스템 알림·로그인·비밀값·개인 경력 추천·반복 시도는 본문에서 제외했습니다.

[선택한 프롬프트와 근거](source-map.json)를 남겼습니다. `last_log_message_uuid`에는 실제 Codex 메시지 ID를 사용하며 이후 업데이트는 이 기준 뒤의 새 작업만 분석하고 기존 장을 보존합니다. 튜토리얼 생성 자체의 대화는 대상 범위에 포함하지 않았습니다.
