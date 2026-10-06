# GitHub 작업 기반 채용공고 추천

확인일: 2026-10-06. 대상: [serithemage](https://github.com/serithemage). 사용자 요청에 따라 채용공고 검색·본문 조회는 Exa를 사용했다. 한국 및 해외 현지 근무를 포함한다. 적합도는 업무와 공개 근거를 비교한 판단이며 합격 가능성을 뜻하지 않는다.

## 판단 근거

[프로필 README](https://github.com/serithemage/serithemage)는 AWS Senior SDE·Senior Technical Trainer, 일본 근무 및 기업 컨설팅 경험을 기재한다. 경력은 사용자 공개 프로필의 자기기술이며 재직 증명으로 독립 검증하지 않았다.

조직 저장소의 존재만으로 개인 기여를 가정하지 않고 아래 README와 `author=serithemage` 커밋을 확인했다. 코드를 전수 검토하거나 프로젝트를 실행하지 않았으므로 운영 품질·고객 성과·실험 수치 자체를 검증한 것은 아니다.

| 작업 | 확인한 내용 | 개인 기여 근거 |
|---|---|---|
| [plugins](https://github.com/roboco-io/plugins) | Claude Code 개발·보안·워크플로우 스킬과 재사용 가능한 도구 | [커밋](https://github.com/roboco-io/plugins/commit/eb8c5ca35557188d3f3dc76437b8bc08d81ae9e0) |
| [vibe-ready-cli](https://github.com/roboco-io/vibe-ready-cli) | 개발 환경 및 프로세스 진단, Claude·Codex 통합 | [커밋](https://github.com/roboco-io/vibe-ready-cli/commit/f3ab47d578048ccd22035f29726de87ccaab9f3a) |
| [coding-agent-benchmark](https://github.com/roboco-io/coding-agent-benchmark) | 모델·하네스 조합 평가, 비용·성공률·인간 개입 및 실험 한계 기록 | [커밋](https://github.com/roboco-io/coding-agent-benchmark/commit/acf853b6d94b415c4be636bea6c7d8dc9b55a0e1) |
| [serverless-autoresearch](https://github.com/roboco-io/serverless-autoresearch) | SageMaker Spot 기반 실험 파이프라인과 튜토리얼 | [커밋](https://github.com/roboco-io/serverless-autoresearch/commit/5435b374fb5daae5eee95e3e8eb9292caacf94f8) |
| [VAF](https://github.com/roboco-io/vibe-adoption-framework) | 조직의 에이전트 개발 도입을 단계·거버넌스·환경 관점에서 구조화 | [커밋](https://github.com/roboco-io/vibe-adoption-framework/commit/10faece6c11c1c93b1046b127a1ed7ed1088e97a) |
| [learn-with-ai](https://github.com/roboco-io/learn-with-ai) | 대학생 대상 발표·데모 및 근거 기반 학습 자료 | [커밋](https://github.com/roboco-io/learn-with-ai/commit/aafe147a3fcb85488f1cf775fdde8075bde3e2f6) |
| [serverless-openclaw](https://github.com/serithemage/serverless-openclaw) | AWS 서버리스 AI 에이전트 구현. README는 alpha 상태와 프로덕션 검증 한계를 명시 | [커밋](https://github.com/serithemage/serverless-openclaw/commit/504300de7f56c56d70abf487dccd226883f9c6c8) |

이 근거로 볼 때 우선 타깃은 **직접 구현하고 고객·파트너가 활용하도록 돕는 시니어 AI 엔지니어**다. 교육·도입·아키텍처를 묶어 설명하는 것이 강점이다.

## 추천 순서

### 1. Anthropic — Developer Education Lead, Claude Platform

[공식 공고](https://job-boards.greenhouse.io/anthropic/jobs/5311465008)

- 근무: 미국 San Francisco / New York / Seattle. 공고의 일반 정책은 사무실 근무 최소 25%이며 역할에 따라 늘어날 수 있다. 비자 지원 정책은 있으나 개별 보장은 없다.
- 업무: 새 플랫폼 기능을 실습·데모·교육 과정으로 전환하고 기술 영업 조직을 교육하며 셀프서비스 도구를 만든다. MCP·Agent SDK·skills·AI 코딩 도구 경험을 요구한다.
- 적합 이유: AWS 개발과 트레이너 경력, `plugins`, `learn-with-ai`, `serverless-autoresearch`의 구현·교육 결합이 직무와 직접 연결된다. 해외 이주가 가능하다면 가장 먼저 검토할 공고다.
- 보완 증거: 영어 실습 진행 영상, 교육 대상별 설계 이유, 실제 피드백·사용 현황, 영업·솔루션 조직과 협업한 사례. 공개 저장소만으로 교육 성과를 주장하지 않는다.
- 모집 확인: 공식 Greenhouse 공개 채용 API에 해당 ID가 포함됨.

### 2. Anthropic — Applied AI Architect, Seoul

[공식 공고](https://job-boards.greenhouse.io/anthropic/jobs/5390735008)

- 업무: 기업 고객의 Claude 도입을 프리세일즈부터 평가·통합·배포까지 지원한다. 한국어 원어민 수준과 업무 영어를 요구한다.
- 적합 이유: 기업 컨설팅 경력에 VAF의 도입 설계, `vibe-ready-cli`의 환경 진단, `coding-agent-benchmark`의 평가 근거를 함께 제시할 수 있다.
- 보완 증거: 고객 요구 → 설계 대안 → 평가 기준 → 도입 결정으로 이어진 실제 사례. 복잡한 구매 과정·이해관계자 조율과 영어 설명 능력도 보여줘야 한다.
- 모집 확인: 공식 Greenhouse 공개 채용 API에 해당 ID가 포함됨.

### 3. Anthropic — Applied AI Architect, Tokyo

[공식 공고](https://job-boards.greenhouse.io/anthropic/jobs/5076109008)

- 업무: 일본 기업의 Claude 도입·기술 평가·아키텍처·워크숍을 지원한다. 일본어 원어민 수준과 업무 영어가 필수다.
- 적합 이유: 프로필에 기재된 일본 14년 근무와 Mamezou 기업 아키텍처 경험에 현재 AI 도입·평가 작업을 연결할 수 있다.
- 보완 증거: 일본어 기술·경영진 발표 사례와 일본 고객 프로젝트 사례. 일본 거주·근무 이력만으로 요구 언어 수준 충족을 단정하지 않는다.
- 모집 확인: 공식 Greenhouse 공개 채용 API에 해당 ID가 포함됨. 제3자 사이트의 과거 마감 표시보다 현재 공식 목록을 우선했다.

### 4. OpenAI — AI Deployment Engineer, Seoul

[공식 공고](https://openai.com/careers/ai-deployment-engineer-seoul-south-korea/)

- 업무: 기업 AI 활용 로드맵을 정하고 프로토타입에서 운영까지 지원한다. 기술 컨설팅 6년 이상, 클라우드·네트워크 이해, Python/JavaScript 경험을 요구한다.
- 적합 이유: 창업자·컨설턴트의 문제 정의, AWS 개발 경험, VAF 및 도구 구현을 하나의 고객 전달 사례로 묶기 좋다.
- 근무: 서울, 주 3일 사무실, 이주 지원 명시.
- 보완 증거: 운영된 AI 시스템의 평가·보안·비용·사용자 채택 사례와 OpenAI API 기반 구현. `serverless-openclaw`는 alpha이므로 운영 성과 증거로 제시하지 않는다.
- 모집 확인: Exa로 공식 공고 본문 확인. 공개 Ashby 목록 API 직접 조회는 HTTP 403으로 실패하여 현재 접수 여부는 확정하지 못했다.

### 5. OpenAI — Forward Deployed Engineer, Seoul

[공식 공고](https://openai.com/careers/forward-deployed-engineer-seoul-seoul-south-korea/)

- 업무: 고객과 함께 범위 설정부터 풀스택 구현·운영 배포까지 책임진다. 고객 대면을 포함한 엔지니어링 경험 5년 이상을 요구한다.
- 적합 이유: AWS SDE 경력과 에이전트·개발자 도구 구현이 연결된다. 직접 코딩하는 비중을 높이고 싶다면 우선순위를 올릴 수 있다.
- 근무: 서울, 주 3일 사무실, 출장 50% 예상, 이주 지원 명시.
- 보완 증거: 최근 운영 코드, 장애·배포·데이터 통합 대응, 고객 업무의 검증된 변화. 출장 조건을 검토해야 한다.
- 모집 확인: 공식 페이지 본문과 Apply now 표시 확인. 현재 접수 여부는 별도 확정하지 못했다.

## 추가 후보

- [Anthropic Applied AI Engineer, Tokyo](https://job-boards.greenhouse.io/anthropic/jobs/5390799008): 공식 공개 API에 게시 확인. 맞춤형 LLM 파일럿·평가·통합을 직접 만드는 역할이다. Python, 일본어 원어민 수준, 업무 영어가 필수이며 최근 LLM 운영 시스템 경험이 우대다. 아키텍트보다 구현 중심으로 지원하고 싶을 때 검토한다.
- [OpenAI Forward Deployed Software Engineer, Tokyo](https://openai.com/careers/forward-deployed-software-engineer-tokyo/): 공식 본문 확인. 풀스택 경험 7년 이상, 영어·일본어 능통, 관계형 DB 경험을 요구하며 주 3일 사무실과 이주 지원이 명시된다. 최근 풀스택 운영 경험을 별도로 입증해야 한다. 접수 여부는 확정하지 못했다.
- [Upstage AI 교육 전문 강사 및 멘토풀](https://careers.upstage.ai/ko/o/204879): Exa 검색 결과로 확인한 협업형 후보이며 정규직 공고가 아니다. 강의·멘토링 및 에이전트 워크플로우 경험과 맞지만 공식 접수 상태는 추가 확인이 필요하다.

## 지원 자료에 강조할 내용

1. 교육 역할: 직접 만든 영어 실습 1개와 진행 영상, 실행 가능한 코드, 학습자 피드백.
2. 아키텍트 역할: VAF·진단 CLI·평가 실험을 실제 고객 사례 하나에 연결. 고객 정보를 공개할 권한이 없는 경우 익명화하고 확인 가능한 범위만 쓴다.
3. FDE 역할: 문제 정의부터 배포·운영까지 본인이 맡은 범위를 구체화. 데모·alpha·실험과 실제 운영 경험을 구분한다.

공통 요구는 고객 문제 이해, 직접 구현, 기술 설명, 평가와 도입 책임이다. 직무별 차이는 교육·영업 지원 비중, 직접 구현·운영 책임, 언어 및 출장·이주 조건이다. 아직 확인하지 않은 언어 수준, 보상 선호, 비자 자격, 최근 운영 성과는 충족했다고 가정하지 않았다.

## 확인 방법과 제외 사례

- GitHub: `gh api user`, 사용자·조직 저장소 목록, 선택한 README, 저자별 최근 커밋 조회.
- Exa 검색: 한국 AI 아키텍트/FDE, AI DevRel/교육, OpenAI 서울, Anthropic 도쿄, OpenAI 도쿄, Anthropic 개발자 교육 검색. 위 후보들의 공식 본문은 `web_fetch_exa`로 조회했다.
- Anthropic 현재 목록: https://boards-api.greenhouse.io/v1/boards/anthropic/jobs
- Anthropic Partner Solutions Architect 도쿄(ID 5222908008)는 Exa 본문과 지원 폼이 남아 있지만 현재 공식 API 목록에 없어 주 추천에서 제외했다.
- Google FDE는 검색 결과만으로 정확한 현재 서울 모집 요건·상태를 충분히 확인하지 못해 추천 순위에서 제외했다.
- 이 파일은 추천 조사 결과다. 지원서 제출이나 외부 연락은 수행하지 않았다.
