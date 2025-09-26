# GEMINI.md: Project “Running Mate” — Engineering Guide

## 0) Purpose

이 문서는 프로젝트 목표·스택·실행 방법과 함께  **Next.js(App Router, TypeScript) 아키텍처 규칙** ,  **조직 공통 엔지니어링 원칙** , **Git 규칙**을 단일 소스에서 안내한다.

우선순위:  **안정성 > 보안 > 성능 > 유지보수성 > 개발속도** .

---

## 1) Project Overview

**Running Mate**는 부산을 시작으로 **러닝 코스 공유**를 제공하는 **Next.js 웹 앱**이다.

초보 러너의 “어디서 어떻게 달려야 하는지 모름” 문제를 해결하기 위해 **사용자 생성 코스(GPS 경로·사진·후기)**를 축적한다.

**Target Users**

* 초보 러너, 마라톤 준비생

**Key Features**

* GPS 코스 공유/탐색, 사진/후기
* 좋아요·댓글 등 커뮤니티
* 거리/시간/경사 필터
* 개인 프로필·코스 추천

---

2) Tech Stack

* **Framework** : Next.js (App Router + Server Actions)
* **Lang** : TypeScript
* **DB & Auth** : Supabase
* **Styling** : Tailwind CSS
* **Lint** : ESLint (`next/core-web-vitals`, `next/typescript`)
* **Font** : Geist
* **Alias** : `@/*` → `src/*`

---

## 3) Build & Run

<pre class="overflow-visible!" data-start="997" data-end="1167"><div class="contain-inline-size rounded-2xl relative bg-token-sidebar-surface-primary"><div class="sticky top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre! language-bash"><span><span>npm run dev     </span><span># http://localhost:3000, Turbopack</span><span>
npm run build   </span><span># production build (Turbopack)</span><span>
npm run start   </span><span># start prod server</span><span>
npm run lint    </span><span># ESLint</span><span>
</span></span></code></div></div></pre>

---

## 4) Repository Conventions

* **Source root** : `src/`
* **Routing** : **반드시 `app/` 사용** (App Router 우선)
* **Docs** : `docs/PRD.md`, `docs/mvp_tasks.md`
* **Path Alias** : `@/*` 사용
* **컬로케이션 원칙**
  * 라우트 세그먼트 전용 구현물은 `app/<segment>/_components|_hooks|_utils|_libs` **private 폴더**에 둔다.
  * 전역 재사용 요소만 `src/components|lib|hooks` 상단 디렉터리에 둔다.

---

## 5) Next.js App Router Rules (TypeScript) — **Must/Should**

### 5.1 Routing & Files

* **Must** : `app/`에 모든 페이지/레이아웃/로딩/에러/404/템플릿/Route Handler 배치

  (`page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx`, `template.tsx`, `route.ts`)
* **Should** :  **Route Group** (`(marketing)`, `(app)`)으로 URL 영향 없이 섹션 구분
* **Can** :  **Parallel/Intercepting** (`@slot`, `(.)`, `(..)`)은 대시보드/모달 같은 복합 UI에 선택 사용
* **Must** : SEO는 `metadata`/`generateMetadata`로 처리(동적 메타는 `generateMetadata`)

### 5.2 Server Components 우선

* **Must** : 기본은  **RSC** . 브라우저 API/상태/이펙트가 필요할 때만 **Client**로 **국소화**
* **Must** : 서버 전용 로직/비밀키는 Client 번들로 새지 않게 경계 설정

### 5.3 Client Components 경계

* **Must** : `'use client'`는 꼭 필요한 파일 최상단에만
* **Must** : 상호작용 “잎사귀 컴포넌트”로 작게 쪼개고, 상위는 서버로 유지
* **Must** : 서버→클라이언트 props는 **직렬화 가능 타입**만 전달

### 5.4 타입 안정성

* **Must** : `tsconfig.json`에 **`strict: true`**
* **Must** : props/함수/API payload 등 **명시적 타입**
* **Should** : 외부 입력/응답은 **Zod**로 런타임 검증

### 5.5 Data Fetch & Mutations

* **Must** : 1차 데이터 패칭은 **RSC**에서 `fetch` 사용, `cache`/`next.revalidate`로 **정적·동적·ISR** 전략 명시
* **Must** : API는  **Route Handlers** (`route.ts`)—HTTP 메서드·상태코드·캐시 헤더 정확히, **입력 Zod 검증**
* **Must** : **Server Actions**로 변이(Form/버튼). 액션은 세그먼트에  **컬로케이트** (`_actions.ts`) + 인증/권한/검증
* **Can** : 클라 사이드 패칭은 실시간·폴링 등 **RSC에 안 맞는 경우에만** SWR/React Query

### 5.6 Performance

* **Must** : `next/image`(width/height/alt 필수, LCP는 `priority`)
* **Must** : `next/font` 사용
* **Should** : 무거운 **Client** 의존성은 `next/dynamic({ ssr: false })`
* **Must** : 각 세그먼트별 `loading.tsx` + **Suspense 경계**
* **Should** : `@next/bundle-analyzer`로 번들 모니터링
* **Must** :  **캐싱 전략** (Full Route Cache/Fetch Cache/ISR/Edge) 명시

### 5.7 State Management

* **Must** : 필터/페이지네이션은 **URL(Search Params/Route Params)**를 단일 진실원으로
* **Should** : 전역 클라 상태는 최소화. 필요 시  **Context 최소** , 또는 **Zustand/Jotai** 등 경량 선택

### 5.8 Styling

* **Must** :  **Tailwind** (권장) 또는  **CSS Modules** , 일관성 유지
* **Should** : 스타일 파일도 컴포넌트와  **컬로케이션** (특히 private 폴더)

### 5.9 Security

* **Must** : **서버측** 입력검증(Zod) 일관 적용(Handlers/Actions)
* **Must** : 액션/핸들러에 인증·인가 검사, 클라이언트 신뢰 금지
* **Must** : 브라우저 노출 변수만 `NEXT_PUBLIC_` 사용
* **Should** : NextAuth/Clerk 등 검증된 인증 솔루션
* **Should** : 공용 엔드포인트에 **레이트 리미팅**

### 5.10 Error Handling

* **Must** : 각 세그먼트에 `error.tsx`(Client Component) + 로깅 훅/액션
* **Must** : 404는 `not-found.tsx` 또는 `notFound()`
* **Should** : Server Action은 `useFormState`로 **구체적 에러 상태** 반환

### 5.11 Testing

* **Should** :  **Unit/Integration** (Vitest/Jest + RTL),  **E2E** (Playwright/Cypress)
* **Should** : RSC는 출력/프롭스 단위 검증, **Server Actions는 함수로 테스트**

### 5.12 Lint & Format

* **Must** : `eslint-config-next` + 접근성/Hook 규칙 엄격 적용
* **Must** : Prettier + pre-commit/CI 체크

 **Mandate** : App Router, RSC, Server Actions를 **기본 패러다임**으로 활용.

서버에서 최대치로 처리하고, 클라이언트 JS를 최소화한다.

---

## 6) Organization-Wide Engineering Baseline (요약)

1. **가독성** : 의미 있는 이름, 일관 포맷, 불필요한 영리함 금지, **왜**에 대한 주석
2. **단순성(KISS/DRY/YAGNI)** : 지금 필요한 것만 구현, 높은 응집/낮은 결합
3. **견고성** : 명시적 에러 처리, 풍부한 오류 메시지, 자원 누수 방지, **모든 외부입력 검증**
4. **보안** : 파라미터라이즈드 접근·XSS/SQLi 방지, 최소권한, 시크릿 하드코딩 금지, 취약점 스캔
5. **테스트** : 유닛/통합/E2E 자동화, 의미 있는 커버리지, DI로 테스트 용이성 확보
6. **성능** : 프로파일 먼저, 병목 위주 최적화, 네트워크/디스크 IO 효율
7. **유지보수** : 지속 리팩터링, 설정 외부화(env/flags), 전역 가변 상태 최소화
8. **협업** : Git 전략, 코드리뷰, 스타일/패턴 일관성
9. **운영 인식** : 구조적 로깅(JSON/Correlation ID), 메트릭/모니터링, CI/CD 자동화

> 이 섹션은 **항상 적용(alwaysApply: true)** 기본 원칙으로 간주한다.

---

## 7) Git & GitHub Policy

* **Commit Messages: 한국어로 작성 (필수)**
* **Conventional Commits 엄수**

  `feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `perf:`, `test:`, `chore:` 등
* **이슈 연결** : 필요 시 `#<번호>`로 연결(번호 임의 생성 금지)
* **원자적 커밋** : 하나의 논리 단위만 포함
* **안전성** : `git push --force` 금지(특별 지시·위험 인지 없이는 사용하지 않음). 충돌은 `fetch/pull --rebase` 등으로 해결 가이드.

**예시**

<pre class="overflow-visible!" data-start="5255" data-end="5355"><div class="contain-inline-size rounded-2xl relative bg-token-sidebar-surface-primary"><div class="sticky top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre!"><span><span>feat:</span><span></span><span>부산</span><span></span><span>코스</span><span></span><span>리스트</span><span></span><span>필터(거리/시간/경사)</span><span></span><span>추가</span><span></span><span>#42</span><span>
</span><span>fix:</span><span></span><span>코스</span><span></span><span>상세</span><span></span><span>페이지</span><span></span><span>이미지</span><span></span><span>LCP</span><span></span><span>저하</span><span></span><span>원인</span><span></span><span>수정</span><span>
</span><span>docs:</span><span></span><span>PRD에</span><span></span><span>추천</span><span></span><span>알고리즘</span><span></span><span>섹션</span><span></span><span>보완</span><span>
</span></span></code></div></div></pre>

---

## 8) Security & Secrets

* **서버 전용** 값은 서버 경로에서만 접근(`process.env.*`, Client 번들 유출 금지)
* 공개 필요한 값만 `NEXT_PUBLIC_` 접두어
* Supabase/인증 키 등은 **환경변수 + 배포 비밀관리** 사용

---

## 9) Testing Strategy (프로젝트 적용)

* **단위** : `_utils`, `_libs`, 서버 액션 로직 함수화 테스트
* **통합** : Route Handlers(입력 검증/권한/상태코드/캐시)
* **E2E** : 코스 탐색→필터→상세→좋아요 핵심 플로우
* **CI** : Lint/Unit/E2E 자동 실행

---

## 10) Performance & Observability

* 이미지: `next/image` 필수, LCP는 `priority`
* 폰트: `next/font` 사용
* 번들: analyzer로 크기 모니터링, 클라 의존성은 동적 import
* 로깅:  **구조적 로깅(JSON)** , 요청 ID/사용자 ID 첨부
* 메트릭: 요청 수/지연/에러율/캐시 히트율

---

## 11) Docs

* **`docs/PRD.md`** : 문제·타깃·핵심가설·MVP·측정지표·비기능 요구(성능/보안/가용성) 포함
* **`docs/mvp_tasks.md`** : 작업 단위/의존성/완료조건(DoD)/리스크

---

## 12) Deviation Policy

* 규칙에서 벗어나야 한다면 PR 설명에 **이유·대안·추후 개선 TODO**를 명시한다.

  (예: 성능 임계 경로에서 불가피한 난해한 최적화)
