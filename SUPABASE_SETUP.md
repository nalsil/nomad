# Supabase 설정 가이드

이 문서는 Nomad 프로젝트에서 Supabase 백엔드를 설정하는 방법을 설명합니다.

## 📋 목차

1. [Supabase 프로젝트 생성](#1-supabase-프로젝트-생성)
2. [데이터베이스 스키마 설정](#2-데이터베이스-스키마-설정)
3. [환경 변수 설정](#3-환경-변수-설정)
4. [초기 데이터 삽입](#4-초기-데이터-삽입)
5. [확인 및 테스트](#5-확인-및-테스트)

---

## 1. Supabase 프로젝트 생성

### 1.1 Supabase 계정 생성 및 로그인

1. [Supabase](https://supabase.com) 웹사이트 방문
2. "Start your project" 클릭
3. GitHub, Google 등으로 로그인

### 1.2 새 프로젝트 생성

1. Dashboard에서 "New Project" 클릭
2. 프로젝트 정보 입력:
   - **Name**: `nomad-app` (원하는 이름)
   - **Database Password**: 강력한 비밀번호 생성 (나중에 필요하지 않음)
   - **Region**: `Northeast Asia (Seoul)` 선택 (한국 사용자에게 최적)
   - **Pricing Plan**: Free tier 선택

3. "Create new project" 클릭
4. 프로젝트 생성 완료까지 1-2분 대기

---

## 2. 데이터베이스 스키마 설정

### 2.1 SQL Editor 접근

1. 좌측 메뉴에서 "SQL Editor" 클릭
2. "New Query" 버튼 클릭

### 2.2 스키마 생성

`supabase/migrations/001_initial_schema.sql` 파일의 전체 내용을 복사하여 SQL Editor에 붙여넣기

```sql
-- supabase/migrations/001_initial_schema.sql 파일 내용 전체 복사
```

**실행**:
- 하단의 "Run" 버튼 클릭 (또는 Ctrl/Cmd + Enter)
- 성공 메시지 확인: "Success. No rows returned"

### 2.3 생성된 테이블 확인

좌측 메뉴 "Table Editor"에서 다음 테이블이 생성되었는지 확인:

- ✅ `profiles` - 사용자 프로필
- ✅ `cities` - 도시 정보
- ✅ `reviews` - 리뷰
- ✅ `review_reactions` - 리뷰 반응 (좋아요/싫어요)
- ✅ `city_rankings` - 도시 랭킹
- ✅ `posts` - 커뮤니티 게시글

---

## 3. 환경 변수 설정

### 3.1 API 키 확인

1. 좌측 메뉴에서 "Project Settings" (톱니바퀴 아이콘) 클릭
2. "API" 섹션 선택
3. 다음 값들을 복사:
   - **Project URL**: `https://your-project.supabase.co`
   - **anon public**: `eyJhbGc...` (긴 문자열)
   - **service_role**: `eyJhbGc...` (긴 문자열, 노출 금지!)

### 3.2 .env.local 파일 설정

프로젝트 루트에 `.env.local` 파일을 생성하고 다음 내용 입력:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

**⚠️ 중요**:
- `NEXT_PUBLIC_SUPABASE_URL`과 `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`는 브라우저에 노출되어도 안전합니다
- `SUPABASE_SERVICE_ROLE_KEY`는 **절대 Git에 커밋하지 마세요!** (이미 .gitignore에 포함됨)

---

## 4. 초기 데이터 삽입

### 4.1 샘플 도시 데이터 삽입

SQL Editor에서 `supabase/seed.sql` 파일의 내용을 실행:

```sql
-- supabase/seed.sql 파일 내용 전체 복사
```

"Run" 버튼 클릭하여 실행

### 4.2 데이터 확인

1. 좌측 메뉴 "Table Editor" 클릭
2. `cities` 테이블 선택
3. 12개의 샘플 도시 데이터 확인:
   - 서울, 부산, 치앙마이, 발리, 방콕, 도쿄...

### 4.3 랭킹 계산

SQL Editor에서 다음 명령 실행:

```sql
SELECT public.calculate_city_rankings();
```

이제 `city_rankings` 테이블에 각 카테고리별 순위가 자동 생성됩니다.

---

## 5. 확인 및 테스트

### 5.1 RLS (Row Level Security) 확인

1. "Authentication" > "Policies" 메뉴 확인
2. 모든 테이블에 RLS 정책이 활성화되어 있는지 확인
3. 주요 정책:
   - 읽기: 모든 사용자 허용
   - 쓰기/수정/삭제: 인증된 사용자만 허용

### 5.2 Next.js 앱 실행

```bash
npm run dev
```

브라우저에서 `http://localhost:3000` 접속:

- ✅ 도시 리스트가 Supabase 데이터로 표시되는지 확인
- ✅ 통계 섹션이 실제 데이터를 표시하는지 확인
- ✅ 리뷰 섹션이 표시되는지 확인 (리뷰가 있는 경우)

### 5.3 회원가입 테스트

1. `/register` 페이지 접속
2. 이메일과 비밀번호로 회원가입
3. Supabase Dashboard > "Authentication" > "Users"에서 새 사용자 확인
4. "Table Editor" > `profiles` 테이블에서 프로필이 자동 생성되었는지 확인

---

## 🔧 트러블슈팅

### 문제: "relation does not exist" 오류

**해결책**:
- SQL Editor에서 스키마 생성 스크립트를 다시 실행
- 모든 테이블이 `public` 스키마에 생성되었는지 확인

### 문제: 데이터가 표시되지 않음

**해결책**:
1. `.env.local` 파일의 환경 변수가 정확한지 확인
2. Next.js 개발 서버 재시작 (`npm run dev`)
3. 브라우저 콘솔에서 에러 메시지 확인

### 문제: RLS 정책 오류

**해결책**:
- Supabase Dashboard > "Authentication" > "Policies" 확인
- 스키마 생성 스크립트의 RLS 정책 부분 재실행

### 문제: 회원가입 후 프로필이 생성되지 않음

**해결책**:
- SQL Editor에서 트리거 확인:
  ```sql
  SELECT * FROM pg_trigger WHERE tgname = 'on_auth_user_created';
  ```
- 트리거가 없으면 스키마 스크립트의 트리거 부분 재실행

---

## 📚 추가 리소스

- [Supabase 공식 문서](https://supabase.com/docs)
- [Supabase Auth 가이드](https://supabase.com/docs/guides/auth)
- [Supabase Database 가이드](https://supabase.com/docs/guides/database)
- [RLS (Row Level Security) 가이드](https://supabase.com/docs/guides/auth/row-level-security)

---

## 🎯 다음 단계

Supabase 설정이 완료되었다면:

1. ✅ 리뷰 작성 기능 테스트
2. ✅ 도시 검색 및 필터링 테스트
3. ✅ 프로필 업데이트 테스트
4. 🚀 프로덕션 배포 준비 (Vercel 등)

---

**💡 팁**: Supabase Dashboard의 "Logs" 섹션에서 실시간 쿼리 및 에러를 모니터링할 수 있습니다!
