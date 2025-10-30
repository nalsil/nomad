---
command: "/create-issue"
description: "GitHub 이슈를 생성하고 gh CLI로 바로 등록합니다"
---

# GitHub Issue 생성 및 등록

GitHub 이슈를 작성하고 `gh` CLI를 사용하여 바로 GitHub에 등록합니다.

## 전제조건

`gh` CLI가 설치되고 인증되어 있어야 합니다.

확인 방법:
```bash
gh auth status
```

## 프로세스

### 1. 이슈 작성
`/issue` 명령어와 동일하게 이슈를 작성합니다.

### 2. 이슈 생성 명령어 제공

이슈 내용을 작성한 후, 다음과 같이 `gh` 명령어를 제공합니다:

```bash
# Bug Report 예시
gh issue create \
  --title "[Bug] 필터 초기화 버튼이 모바일에서 표시되지 않음" \
  --label "bug,ui,mobile,priority:medium" \
  --body "$(cat <<'EOF'
## 🐛 버그 설명
필터 초기화 버튼이 데스크톱에서는 정상적으로 표시되지만, 모바일 화면에서는 보이지 않습니다.

## 📝 재현 단계
1. 모바일 기기 또는 브라우저 개발자 도구로 모바일 화면 크기로 설정
2. 홈페이지 접속
3. 필터 선택 후 초기화 버튼 확인

## ✅ 기대 동작
모바일 화면에서도 필터 초기화 버튼이 표시되어야 합니다.

## ❌ 실제 동작
필터 초기화 버튼이 보이지 않습니다.

## 🌐 환경
- Screen Size: 375px, 768px 이하
- Browser: Chrome, Safari

## 🔧 제안 해결책
모바일 필터 섹션에도 초기화 버튼 추가
EOF
)"
```

### 3. 사용자 확인

```markdown
---

## 🚀 GitHub Issue 생성

위 명령어를 복사하여 터미널에서 실행하면 이슈가 생성됩니다.

**또는** Bash 도구를 사용하여 바로 생성할까요?

옵션:
1. 명령어 복사하여 직접 실행
2. Bash 도구로 바로 생성
3. 이슈 내용 수정 필요
```

## 타입별 gh 명령어 템플릿

### Bug Report
```bash
gh issue create \
  --title "[Bug] {제목}" \
  --label "bug,{추가라벨},priority:{우선순위}" \
  --body "$(cat <<'EOF'
{이슈 내용}
EOF
)"
```

### Feature Request
```bash
gh issue create \
  --title "[Feature] {제목}" \
  --label "feature,enhancement,priority:{우선순위}" \
  --body "$(cat <<'EOF'
{이슈 내용}
EOF
)"
```

### Enhancement
```bash
gh issue create \
  --title "[Enhancement] {제목}" \
  --label "enhancement,priority:{우선순위}" \
  --body "$(cat <<'EOF'
{이슈 내용}
EOF
)"
```

### Documentation
```bash
gh issue create \
  --title "[Docs] {제목}" \
  --label "documentation" \
  --body "$(cat <<'EOF'
{이슈 내용}
EOF
)"
```

### Question
```bash
gh issue create \
  --title "[Question] {제목}" \
  --label "question" \
  --body "$(cat <<'EOF'
{이슈 내용}
EOF
)"
```

## 고급 옵션

### Assignee 추가
```bash
gh issue create \
  --title "..." \
  --label "..." \
  --assignee "@me" \
  --body "..."
```

### Milestone 설정
```bash
gh issue create \
  --title "..." \
  --label "..." \
  --milestone "v1.0.0" \
  --body "..."
```

### Project 추가
```bash
gh issue create \
  --title "..." \
  --label "..." \
  --project "Project Name" \
  --body "..."
```

## 이슈 생성 후 작업

이슈 생성 성공 시:
```markdown
✅ 이슈가 성공적으로 생성되었습니다!

이슈 번호: #{number}
URL: {url}

다음 단계:
1. 이슈 확인: gh issue view {number}
2. 작업 시작: git checkout -b issue-{number}
3. 작업 완료 후 PR 생성: /create-pr
```

## 에러 처리

### gh CLI 미설치
```markdown
❌ gh CLI가 설치되어 있지 않습니다.

설치 방법:
- Windows: winget install GitHub.cli
- macOS: brew install gh
- Linux: https://github.com/cli/cli#installation

설치 후: gh auth login
```

### 인증 필요
```markdown
❌ GitHub 인증이 필요합니다.

인증: gh auth login
```

### Repository 없음
```markdown
❌ 현재 디렉토리가 Git 저장소가 아니거나 GitHub 리모트가 없습니다.

확인: git remote -v
```

## 사용 예시

### 예시 1: 간단한 버그
입력:
```
/create-issue 로그인 버튼 클릭 시 404 에러
```

출력:
```bash
gh issue create \
  --title "[Bug] 로그인 버튼 클릭 시 404 에러 발생" \
  --label "bug,priority:high" \
  --body "$(cat <<'EOF'
## 🐛 버그 설명
로그인 버튼을 클릭하면 404 에러가 발생합니다.

## 📝 재현 단계
1. 홈페이지 접속
2. 로그인 버튼 클릭
3. 404 에러 페이지 표시

## ✅ 기대 동작
로그인 페이지로 이동해야 합니다.

## ❌ 실제 동작
404 에러 페이지가 표시됩니다.
EOF
)"
```

### 예시 2: 기능 요청
입력:
```
/create-issue 다크모드 추가하고 싶어요
```

출력:
```bash
gh issue create \
  --title "[Feature] 다크모드 지원" \
  --label "feature,enhancement,priority:medium" \
  --body "$(cat <<'EOF'
## 🚀 기능 제안
사이트에 다크모드를 추가하고 싶습니다.

## 💡 동기 및 사용 사례
**현재 문제:**
밤에 사이트를 사용할 때 눈이 부십니다.

**제안하는 해결책:**
라이트/다크 모드 토글 기능을 추가합니다.

**사용 시나리오:**
1. 사용자가 밤에 사이트 접속
2. 다크모드 토글 클릭
3. 편안한 다크 테마로 변경

## 📋 요구사항
**필수:**
- [ ] 다크모드 토글 버튼
- [ ] localStorage에 선택 저장
- [ ] 시스템 설정 감지

**선택:**
- [ ] 부드러운 전환 애니메이션
EOF
)"
```

## 통합 워크플로우

```markdown
1. /create-issue {설명}
   ↓
2. 이슈 생성 (gh CLI)
   ↓
3. 브랜치 생성 (git checkout -b issue-{number})
   ↓
4. 작업 진행
   ↓
5. /create-pr (PR 생성)
   ↓
6. 리뷰 & 머지
```
