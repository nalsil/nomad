# 🚀 Quick Start Guide

## 한국노마드 홈페이지 - 빠른 시작

### 1️⃣ 개발 서버 시작

```bash
npm install
npm run dev
```

브라우저에서 http://localhost:3000 접속

### 2️⃣ 프로젝트 구조

```
📁 app/
  ├── layout.tsx          # 메인 레이아웃 (Navigation + Footer)
  ├── page.tsx            # 홈페이지 (모든 섹션 조합)
  └── globals.css         # 전역 스타일

📁 components/
  ├── ui/                 # Shadcn UI 컴포넌트
  ├── layout/             # Navigation, Footer
  └── home/               # 홈페이지 섹션들
      ├── hero-section.tsx
      ├── popular-cities.tsx
      ├── city-card.tsx
      ├── ranking-section.tsx
      ├── community-section.tsx
      ├── reviews-section.tsx
      ├── nomad-map.tsx
      ├── ai-recommendation.tsx
      ├── stats-section.tsx
      └── app-download.tsx

📁 lib/
  ├── utils.ts            # 유틸리티 함수
  └── constants.ts        # Mock 데이터
```

### 3️⃣ 구현된 기능

✅ **Navigation Bar**
- 로고 (홈으로 이동)
- 검색, 필터 (예산/지역/환경)
- 로그인/회원가입 버튼 (비로그인 시)
- 알림, 메시지, 프로필 (로그인 시)

✅ **Hero Section**
- 메인 타이틀
- 3개 CTA 버튼

✅ **인기 도시 (4개 카드)**
- 이미지, 평점, 리뷰 수
- 생활비, 인터넷, 카페 정보
- 태그, 현재 노마드 수
- 찜하기/리뷰쓰기 버튼

✅ **랭킹 시스템**
- 종합/가성비/업무환경/급상승
- TOP 5 도시
- 순위 변동 표시

✅ **커뮤니티**
- 2개 오픈채팅 프리뷰
- 밋업 정보

✅ **최신 리뷰**
- 작성자, 평점, 거주 기간
- 카테고리별 평가 바
- 좋아요/댓글/공유

✅ **노마드 맵**
- 한국 지도
- 도시별 노마드 수

✅ **AI 추천**
- 3단계 질문 UI
- 예산/분위기/우선순위

✅ **통계 & 인사이트**
- 주요 통계 4개
- 이번 달 트렌드

✅ **앱 다운로드 CTA**

✅ **Footer**
- 5컬럼 레이아웃
- SNS 링크

✅ **로그인 페이지 (`/login`)**
- 이메일/비밀번호 입력
- 비밀번호 표시/숨김
- 로그인 상태 유지
- 소셜 로그인 (카카오/구글/네이버)
- 회원가입 링크

✅ **회원가입 페이지 (`/register`)**
- 사용자 정보 입력 폼
- 직업 선택 (10가지)
- 비밀번호 유효성 검사
- 약관 동의 체크박스
- 소셜 회원가입
- 로그인 링크

### 4️⃣ Mock 데이터 수정

`lib/constants.ts` 파일에서 데이터 수정 가능:

```typescript
export const MOCK_CITIES: City[] = [
  {
    id: "jeju-city",
    name: "제주시",
    rating: 4.5,
    monthlyCost: 1200000,
    // ... 더 많은 필드
  }
]
```

### 5️⃣ 스타일 커스터마이징

**색상 변경** (`app/globals.css`):
```css
:root {
  --primary: 221.2 83.2% 53.3%;  /* 메인 색상 */
  --secondary: 210 40% 96.1%;    /* 보조 색상 */
}
```

**Tailwind 설정** (`tailwind.config.ts`):
- 색상, 간격, 애니메이션 커스터마이징 가능

### 6️⃣ 컴포넌트 추가/수정

모든 컴포넌트는 **Server Component**로 구현되어 있습니다.
클라이언트 상호작용이 필요한 경우에만 `"use client"` 추가 (예: AI 추천 섹션)

### 7️⃣ 반응형 디자인

Tailwind CSS 반응형 클래스 사용:
- `sm:` - 모바일
- `md:` - 태블릿
- `lg:` - 데스크톱
- `xl:`, `2xl:` - 대형 화면

### 8️⃣ 페이지 라우팅

현재 구현된 페이지:
- `/` - 홈페이지
- `/login` - 로그인 페이지
- `/register` - 회원가입 페이지

Navigation Bar의 로그인/회원가입 버튼을 클릭하면 해당 페이지로 이동합니다.

### 9️⃣ 다음 단계

**백엔드 연동**:
1. API Routes 생성 (`app/api/...`)
2. NextAuth.js로 인증 구현
3. 데이터베이스 연결
4. Mock 데이터 → 실제 데이터 교체

**추가 페이지**:
- 도시 상세 (`app/cities/[id]/page.tsx`)
- 리뷰 작성 (`app/reviews/new/page.tsx`)
- 사용자 프로필 (`app/profile/page.tsx`)
- 비밀번호 찾기 (`app/forgot-password/page.tsx`)

### 🎨 디자인 시스템

- **Shadcn UI**: 재사용 가능한 컴포넌트
- **Tailwind CSS**: 유틸리티 기반 스타일링
- **Lucide Icons**: 아이콘 라이브러리

### 📱 테스트

**개발 모드**:
```bash
npm run dev
```

**프로덕션 빌드**:
```bash
npm run build
npm start
```

**Lint 검사**:
```bash
npm run lint
```

### 🆘 문제 해결

**의존성 오류**:
```bash
rm -rf node_modules package-lock.json
npm install
```

**캐시 삭제**:
```bash
rm -rf .next
npm run dev
```

**포트 변경** (이미 3000 포트 사용 중일 때):
```bash
PORT=3001 npm run dev
```

---

축하합니다! 🎉 한국노마드 홈페이지가 성공적으로 구축되었습니다!

브라우저에서 http://localhost:3000 을 열어 확인해보세요.
