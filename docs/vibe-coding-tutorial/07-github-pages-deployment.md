# 7장: 목업만 공개하고 배포 성공을 확인하기

> **시간**: 요청 17:17:27, 공개파일 확인 19:49:43 KST. 사이 경과 약 2시간 32분은 대기·중단을 포함하며 배포나 실제 작업 소요 시간이 아님.
> **비용**: AWS 배포 없음. GitHub·AI·검색의 실제 청구는 미확인.
> **핵심 발견**: 푸시 출력, 원격 커밋, Actions 결과, 실제 URL을 함께 확인합니다.

## 상황

가상 목업을 학생들이 직접 열어볼 수 있도록 공개하고, 설계 자료와 화면을 저장소에서 연결하려는 단계입니다.

## 실제 프롬프트

```text
목업은 github pages로 배포하고 링크도 걸어줘. 커밋하고 푸시해줘
```

## 진행한 일

GitHub Pages source를 workflow로 설정하고 [Pages 워크플로우](../../.github/workflows/pages.yml)를 작성했습니다. 검사 후`projects/diamonddb/mockup/`만 업로드합니다. 조직 사이트의`roboco.io` 도메인을 상속하므로 별도 CNAME을 넣지 않았습니다.이 저장소의 단일 Pages 사이트 루트에서 목업을 제공합니다.

연구·프로필, 설계·비용, UI, 배포 설정을 4 개 커밋으로 나눴습니다.

| 커밋 | 내용 |
|---|---|
| `fca9ced` |공고 조사와 가상 목표 프로필 |
| `6e453fb` |서버리스 SQL 설계와 비용 |
| `2d8d477` |PC·모바일 가상 UI |
| `6ec04d4` |Pages 자동 배포와 README 링크 |

### 디버깅: push가 ref 잠금 오류를 반환

- **증상**: 원격 main이 이미`6ec04d4`인데 예전 SHA를 예상했다는 오류가 나왔습니다.
- **원인**: 출력은원격참조 상태가 기대값과 달랐음을 보여줍니다. 누가 먼저 같은 커밋을 반영했는지는 로그로 확정하지 못했습니다. 동시 푸시라고 단정하지 않습니다.
- **대응**: 로컬 HEAD 와`git ls-remote`의 SHA를 비교하고 Actions 결과를 확인했습니다. 다시 일반 push 했을 때`Everything up-to-date`였습니다. force push 하지 않았습니다.
- **소요 시간**: 미측정.

## 결과

[공개 DiamondDB 목업](https://roboco.io/cau-vibecoding-demo/)이 열렸습니다. [배포 실행](https://github.com/roboco-io/cau-vibecoding-demo/actions/runs/37435360285)과 [검사 실행](https://github.com/roboco-io/cau-vibecoding-demo/actions/runs/37435360336)이 성공했습니다.

공개 index.html·style.css·app.js는 HTTP200이었고 로컬 파일과 SHA-256이 일치했습니다. 공개 브라우저에서도 6건 → 필터 2건 → 초기화 6건과 오류 상세 변경을 확인했습니다. HTTPS를 활성화했고 작업 폴더가 깨끗한 상태로 끝났습니다.

## 배운 점

GitHub Pages의 실제 배포와 AWS 설계는 별개의 결과입니다. 자신이 배포하는 저장소의 리모트·도메인·권한을 확인해야 합니다. 교육 저장소를 복제한 독자는 원본 조직 저장소에 푸시하지 않습니다.

## 직접 해보기

이 예제의 공개 상태를 읽기 전용으로 확인합니다. GitHub CLI가 설치되어 있고 필요한 인증이 이미 준비되어 있어야 합니다.

```sh
gh run list --repo roboco-io/cau-vibecoding-demo --limit 5
git rev-parse HEAD
git ls-remote origin refs/heads/main
python3 - <<'PYCODE'
import urllib.request
url = 'https://roboco.io/cau-vibecoding-demo/'
with urllib.request.urlopen(url, timeout=20) as response:
    print(response.status, response.url)
PYCODE
```

각자 배포하려면 자신의 저장소를만들어 리모트를 바꾸고, Pages source를 GitHub Actions로 설정하고, README 링크를 자신의주소로 변경합니다. 조직의도메인이 자동으로 상속된다는 설명은본인계정의 설정에 따라 달라집니다.이 튜토리얼 생성 변경은 별도 커밋·푸시 요청 전까지 로컬 문서입니다.

## 누적 비용 기록

| 단계 | 실제 작업 | 이번 프로젝트 AWS 사용료 | 누적 추적 AWS 사용료 | 별도 비용 |
|---|---|---:|---:|---|
| 이 장까지 |조사·문서·로컬 목업 또는 Pages, AWS 리소스 미배포 |$0.00 |$0.00 |AI·Exa·GitHub 청구 미확인 |

월 운영 견적은 발생 비용으로 더하지 않습니다. 다른 AWS 계정 리소스의 비용은 조사하지 않았습니다.
