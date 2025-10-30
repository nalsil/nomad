# 한국노마드 (Korean Nomad) - 홈페이지

대한민국 디지털 노마드를 위한 올인원 플랫폼 홈페이지

## 🎯 프로젝트 개요

328명의 디지털 노마드가 직접 평가한 50개 도시 정보를 제공하는 플랫폼입니다. 원격으로 일하며 살기 좋은 곳을 찾고, 커뮤니티에 참여할 수 있습니다.

## 🚀 시작하기

### 개발 서버 실행

```bash
npm install
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 을 열어 결과를 확인하세요.

### 빌드

```bash
npm run build
npm start
```

## 📦 기술 스택

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI
- **Icons**: Lucide React

## 🎨 주요 기능

### ✅ 구현된 페이지

#### 메인 홈페이지 (`/`)

1. **Navigation Bar**
   - 로고 (클릭 시 홈으로 이동), 검색 바, 필터 버튼
   - 로그인/회원가입 버튼 (비로그인 시)
   - 알림, 메시지, 사용자 프로필 아이콘 (로그인 시)
   - 모바일 반응형 디자인

2. **Hero Section**
   - 메인 타이틀과 서브 타이틀
   - 3개 CTA 버튼 (예산으로 찾기, 지도로 찾기, AI 추천받기)
   - 애니메이션 배경 효과

3. **실시간 인기 도시 섹션**
   - 4개 도시 카드 그리드
   - 도시별 정보: 평점, 리뷰 수, 생활비, 인터넷 속도, 카페 수
   - 태그, 현재 체류 노마드 수
   - 찜하기, 리뷰쓰기 버튼

4. **랭킹 시스템**
   - 4가지 랭킹 타입 (종합, 가성비, 업무환경, 급상승)
   - TOP 5 도시 표시
   - 순위 변동 표시 (▲▼)

5. **실시간 커뮤니티**
   - 오픈채팅 프리뷰 (제주, 부산)
   - 온라인 인원, 최근 메시지
   - 다가오는 밋업 정보

6. **최신 리뷰**
   - 작성자 정보, 직업군
   - 평점, 거주 기간, 한 줄 평
   - 카테고리별 평가 바 (가성비, 인터넷, 카페)
   - 좋아요, 댓글, 공유 기능

7. **실시간 노마드 맵**
   - 한국 지도 시각화
   - 도시별 노마드 수 표시
   - 호버 시 상세 정보

8. **AI 도시 추천**
   - 3단계 질문 (예산, 분위기, 우선순위)
   - 인터랙티브 선택 UI
   - 최대 3개 우선순위 선택

9. **통계 & 인사이트**
   - 4가지 주요 통계 (노마드 수, 도시 수, 리뷰 수, 밋업 수)
   - 이번 달 트렌드 (인기 검색, 급상승, 신규 가입자)

10. **앱 다운로드 CTA**
    - iOS/Android 다운로드 버튼
    - 그라디언트 배경

11. **Footer**
    - 5컬럼 레이아웃 (로고, 서비스, 커뮤니티, 파트너, 문의)
    - SNS 링크
    - 저작권 표시

#### 로그인 페이지 (`/login`)

- 이메일/비밀번호 입력 폼
- 비밀번호 표시/숨김 토글
- 로그인 상태 유지 체크박스
- 비밀번호 찾기 링크
- 소셜 로그인 (카카오, 구글, 네이버)
- 회원가입 페이지로 이동 링크
- 이용약관 및 개인정보처리방침 동의 안내
- 반응형 디자인 (그라디언트 배경)

#### 회원가입 페이지 (`/register`)

- 사용자 정보 입력 폼
  - 사용자 이름
  - 이메일
  - 직업 (10가지 선택지)
  - 비밀번호 (최소 8자)
  - 비밀번호 확인
- 비밀번호 표시/숨김 토글
- 비밀번호 유효성 검사
- 필수/선택 약관 동의 체크박스
  - 이용약관 및 개인정보처리방침 (필수)
  - 마케팅 정보 수신 (선택)
- 소셜 회원가입 (카카오, 구글, 네이버)
- 로그인 페이지로 이동 링크
- 반응형 디자인 (그라디언트 배경)

## 📱 반응형 디자인

- **Mobile**: 1컬럼 레이아웃, 햄버거 메뉴
- **Tablet**: 2컬럼 레이아웃
- **Desktop**: 4컬럼 레이아웃

모든 섹션이 모바일, 태블릿, 데스크톱에 최적화되어 있습니다.

## 🗂️ 프로젝트 구조

```
nomad/
├── app/
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Homepage
│   ├── login/
│   │   └── page.tsx            # Login page
│   ├── register/
│   │   └── page.tsx            # Register page
│   └── globals.css             # Global styles
├── components/
│   ├── ui/                     # Shadcn UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── badge.tsx
│   │   ├── avatar.tsx
│   │   ├── progress.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   └── checkbox.tsx
│   ├── layout/
│   │   ├── navigation.tsx      # Navigation bar
│   │   └── footer.tsx          # Footer
│   └── home/
│       ├── hero-section.tsx
│       ├── popular-cities.tsx
│       ├── city-card.tsx
│       ├── ranking-section.tsx
│       ├── community-section.tsx
│       ├── reviews-section.tsx
│       ├── nomad-map.tsx
│       ├── ai-recommendation.tsx
│       ├── stats-section.tsx
│       └── app-download.tsx
├── lib/
│   ├── utils.ts                # Utility functions
│   └── constants.ts            # Mock data
└── public/
```

## 🎨 디자인 시스템

### 색상
- **Primary**: Blue-Purple gradient
- **Background**: White/Muted
- **Text**: Foreground/Muted-foreground
- **Accent**: Primary color variations

### 타이포그래피
- **Font**: Inter (Next.js 기본 폰트)
- **Sizes**: 4xl, 3xl, 2xl, xl, lg, base, sm, xs

### 컴포넌트
- Shadcn UI 기반 재사용 가능한 컴포넌트
- Consistent design language
- Accessible by default

## 📝 Mock Data

모든 데이터는 `lib/constants.ts`에 하드코딩되어 있습니다:
- 도시 정보 (4개)
- 리뷰 (2개)
- 랭킹 (4가지 타입)
- 커뮤니티 정보
- 통계
- 노마드 위치

## 🔜 다음 단계

### Phase 2 (백엔드 연동)
- [ ] API 엔드포인트 개발
- [ ] 데이터베이스 연결
- [ ] 실제 데이터 연동

### Phase 3 (추가 기능)
- [ ] 도시 상세 페이지
- [ ] 리뷰 작성 페이지
- [ ] 사용자 프로필
- [ ] 실제 채팅 기능
- [ ] 밋업 관리

### Phase 4 (최적화)
- [ ] 이미지 최적화
- [ ] SEO 개선
- [ ] 성능 최적화
- [ ] 접근성 개선

## 📄 라이센스

© 2025 한국노마드. All rights reserved.

## 📧 문의

contact@koreannomad.com
