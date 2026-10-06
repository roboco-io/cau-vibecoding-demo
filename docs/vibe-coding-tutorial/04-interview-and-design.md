# 4장: 인터뷰로 범위를 정하고 설계 근거 남기기

> **시간**: 요청 16:51:37, 사용자 범위 조정 16:54:36 KST. 실제 작업 시간 미측정.
> **비용**: 프로젝트 AWS 사용료 발생 작업 없음. AI 비용 미확인.
> **핵심 발견**: ‘프로젝트를 만든다’는 말만으로 구현 깊이를 가정하면 안 됩니다.

## 실제 프롬프트

```text
포트폴리오를 위한 프로젝트 이름을 정하고, 해당 프로젝트의 overview, ADR, 아키텍처 다이어그램등을 작성해줘. 추가적으로 필요한맥락이 있다면 심층 인터뷰를 사용해서 질문해줘.
```

## 상황과 인터뷰

사용자가 확정한 세 가지는 다음과 같습니다.

| 질문 | 실제 답변 |
|---|---|
| 어떤 데이터인가? | 추천안: MLB Statcast 투구 + Chadwick 선수 정보 |
| 누구를 위한 것인가? | 둘 다: 데이터 처리와 간단한 조회 화면 |
| 구현 시간·범위는? | 우선은 설계만 하고, UI 목업까지만 빠르게  만들거야. |

세 번째 답변은 실제 DB·API 구현으로 범위를 넓히지 않게 한 중요한 방향 전환입니다.

## 진행한 일

프로젝트명을 **DiamondDB — 야구 데이터 품질·통합 플랫폼**으로 정했습니다. [Overview](../../projects/diamonddb/docs/overview.md), [데이터 계약](../../projects/diamonddb/docs/data-contract.md), [아키텍처](../../projects/diamonddb/docs/architecture.md), ADR, 검증 계획과 [인터뷰 기록](../../projects/diamonddb/docs/interview.md)을 작성했습니다.

설계에서 ‘같은 입력 재적재는 동일’, ‘같은 키의 다른 내용은 충돌 격리’, ‘선수 연결 실패는 이름으로 추정하지 않기’를 분명히 했습니다. 입력 행수는 삽입+동일+격리의 합이며, 한 행의 여러 문제 건수와 분리합니다.

## 결과

초기 ADR-002는 로컬 Python·SQLite·조회 API를 제안했습니다.이후 AWS·SQL 조건이 추가되어 대체되었지만 결정 이력을 지우지 않았습니다. 현재 저장소에는 당시 초안보다 개선된 최종 문서가 있습니다. 처음 기록을 보려면 Git이력과 대체 상태를 함께 읽습니다.

![현재 설계](../../projects/diamonddb/docs/diagrams/architecture.svg)

## 배운 점

ADR에는 결정·이유·대안·대가·재검토 조건을 씁니다. 사용자 결정과 설계자의 가정을 구분합니다. 실제 데이터와 코드를 실행하기 전 완료 기준을 숫자 성과처럼 소개하지 않습니다.

## 직접 해보기

```sh
python3 - <<'PYCODE'
from pathlib import Path
for name in ['overview.md', 'interview.md', 'adr/002-local-stack.md']:
    print(Path('projects/diamonddb/docs', name).read_text())
PYCODE
```

‘재적재’, ‘입력 오류’, ‘SQL 조회’ 중 하나를 골라 입력·기대 결과·실패 상황을 한 문장씩 작성하세요. [Draw.io 파일](../../projects/diamonddb/docs/diagrams/architecture.drawio)은 편집 가능한 설계 원본입니다.

## 누적 비용 기록

| 단계 | 실제 작업 | 이번 프로젝트 AWS 사용료 | 누적 추적 AWS 사용료 | 별도 비용 |
|---|---|---:|---:|---|
| 이 장까지 |조사·문서·로컬 목업 또는 Pages, AWS 리소스 미배포 |$0.00 |$0.00 |AI·Exa·GitHub 청구 미확인 |

월 운영 견적은 발생 비용으로 더하지 않습니다. 다른 AWS 계정 리소스의 비용은 조사하지 않았습니다.
