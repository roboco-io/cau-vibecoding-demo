# 중앙대학교 바이브코딩 데모

저장소: https://github.com/roboco-io/cau-vibecoding-demo

[![저장소로 이동하는 QR 코드](demo/repository-qr.png)](https://github.com/roboco-io/cau-vibecoding-demo)

**[DiamondDB 공개 UI 목업](https://roboco.io/cau-vibecoding-demo/)** · [프로젝트 설계·ADR·AWS 서버리스 비용](projects/diamonddb/README.md) · [가상 목표 프로필](portfolio/profile.md)

학생이 에이전트와 함께 자료를 탐색하고, 포트폴리오를 만들고, 지원에 도움이 되는 프로젝트를 구현하고, 결과를 다시 포트폴리오에 반영하는 라이브 시연용 시작 저장소입니다.

## 시작하기

이 폴더를 에이전트의 작업 폴더로 열고 `AGENTS.md`를 읽도록 요청하세요. Claude 계열 에이전트를 위한 `CLAUDE.md`도 공통 지침을 연결합니다. 외부 서비스 키나 패키지 설치는 초기 설정에 필요하지 않습니다.

```sh
node scripts/check.mjs
```

Node.js 22 이상과 Python 3를 사용합니다. 포트폴리오를 생성한 뒤에는 다음 명령으로 미리 봅니다.

```sh
python3 -m http.server 18766 --bind 127.0.0.1 --directory portfolio
```

브라우저 주소는 `http://127.0.0.1:18766/`입니다. 현재 포트폴리오는 가상 목표 프로필 문서이며, DiamondDB는 설계와 가상 데이터 기반 UI 목업 단계입니다.

## DiamondDB 목업 배포

GitHub Pages는 `projects/diamonddb/mockup/`의 정적 화면을 공개합니다. `main`의 목업 파일 또는 Pages 워크플로우가 바뀌면 GitHub Actions가 검사 후 배포합니다. [공개 목업](https://roboco.io/cau-vibecoding-demo/)에서 PC·모바일 화면과 필터·오류 상세를 확인할 수 있습니다. 실제 AWS 리소스·DB·API는 아직 배포하지 않았습니다.

## 시연 자료

[시연 순서와 프롬프트](demo/runbook.md)를 따라 진행합니다. [가상 학생 프로필](examples/student.md)로 시작하면 실제 개인정보 없이 시연할 수 있습니다. 사용자 자료는 `inputs/`, 검색 결과는 `research/`, 포트폴리오는 `portfolio/`, 구현 프로젝트는 `projects/`에 둡니다.

GitHub Actions는 지침과 작업 폴더가 존재하는지 검사합니다. 프로젝트가 생기면 해당 기능의 테스트를 추가하세요. 각 단계의 결과를 별도 커밋하면 시연 진행 상황을 다시 확인하기 쉽습니다.
