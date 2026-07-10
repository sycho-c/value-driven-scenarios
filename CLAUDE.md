# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Cowork+(스펙트라) 제품의 고객 도입 사례를 인터랙티브 시나리오(연출된 데모)로 보여주는 마케팅 SPA. React 18 + TypeScript + Vite, 라우팅은 react-router-dom, 애니메이션은 framer-motion. 테스트/린트 설정은 없다. UI 텍스트는 전부 한국어.

## Commands

```bash
npm run dev        # Vite 개발 서버 (port 5173, host 공개)
npm run build      # tsc -b + vite build
npm run typecheck  # tsc -b --noEmit — 검증 수단은 사실상 이것뿐
npm run preview    # 빌드 결과 미리보기
```

주의: `vite.config.ts`의 `base`가 `/value-driven-scenarios/`라서 dev/preview URL도 이 경로 하위다 (예: `http://localhost:5173/value-driven-scenarios/`). `main.tsx`가 BASE_URL을 라우터 basename으로 넘긴다. `public/` 자산 경로(예: introVideo `src`)도 BASE_URL 기준 상대 경로로 쓴다.

## Architecture

데이터 주도 시나리오 엔진 구조. **사례(case) 콘텐츠는 `src/cases/`의 순수 데이터(TS 객체)**이고, **렌더링은 `src/components/scenario/`의 스테이지 컴포넌트**가 담당한다. 새 사례/챕터 작업은 대부분 데이터 작성이고, 새로운 화면 연출이 필요할 때만 스테이지 컴포넌트를 추가한다.

### 데이터 흐름

1. `src/cases/_registry.ts` — 모든 사례를 등록하는 레지스트리. 새 사례는 여기 추가해야 노출된다 (`src/cases/hana-insurance/`는 존재하지만 미등록 상태).
2. 각 사례 모듈(`src/cases/<case-id>/`)은 `meta.ts` + `cast.ts` + `chapters/chapter-NN-*.ts` + `index.ts`(CaseDef 조립, ROI 카드 포함)로 구성.
3. `src/routes/CasePage.tsx` (`/case/:caseId`) → `CaseShell`(공통 네비 프레임) → `ChapterRunner`.
4. `ChapterRunner`(`src/components/scenario/ChapterRunner.tsx`)가 시나리오 엔진: 챕터의 `states[]`(ChapterStateNode 배열)를 인덱스로 진행하며, 챕터의 `stage` 값(StageVariant)에 따라 스테이지 컴포넌트를 선택 렌더링한다. 상태 진행은 프리셋 칩 클릭, `advanceOn` 트리거, 자동재생(`useAutoAdvance`)으로 일어난다.

### 핵심 타입 (`src/cases/_types.ts`)

이 파일(1,100줄+)이 전체 스키마의 단일 소스다:
- `CaseDef` — 사례 최상위: cast, chapters, roi 카드, 선택적 `introVideo`(진입 시 전체화면 오프닝 영상).
- `Chapter` — `stage: StageVariant`와 `states: ChapterStateNode[]`. `act`(1~4)로 스토리 막 구분.
- `ChapterStateNode` — 한 장면의 전체 화면 상태. 스테이지별 상태 슬롯(`phones`, `workspace`, `desktop`, `salesbridge`, `mobilePcSplit`, `execDashboardFull`, `rentacar*` 등)과 연출 요소(`guide`, `memo`, `presets`, `takeover`, `moment`, `guideTooltip`, `pauseAfterMs`)를 가진다.
- `StageVariant` — `'three-phones' | 'phone-workspace' | 'single-phone' | 'desktop-pc' | 'salesbridge-workspace' | 'mobile-pc-split' | 'exec-dashboard' | 'rentacar'`. 새 variant를 추가하면 `ChapterRunner`의 스테이지 분기에도 연결해야 한다.

### 스테이지 컴포넌트

- `src/components/scenario/stages/` — 범용 스테이지 (StageThreePhones, StageDesktopPC, StageExecDashboard, StageMobilePCSplit 등).
- `src/components/scenario/rentacar/`, `hana/`, `salesbridge/`, `workspace/`, `phones/`, `desktop/` — 사례/화면 특화 서브컴포넌트.
- 스테이지는 ChapterStateNode의 해당 슬롯 데이터를 받아 선언적으로 렌더링만 한다. 로컬 애니메이션 상태 외 비즈니스 상태는 갖지 않는다.

### 그 외

- `src/routes/HomePage.tsx` + `src/components/marketing/` — 랜딩(히어로, 사례 그리드, ROI 티저 등). 사례 카드 메타 텍스트는 `src/content/brand.ts`의 `CASES`에 있다 (레지스트리와 별개이므로 사례 추가/수정 시 함께 갱신).
- `src/design/tokens.css` — CSS 변수 디자인 토큰(브랜드/시맨틱 컬러, 카카오톡 팔레트, radius). 스타일링은 CSS Modules(`*.module.css`) + 토큰 변수 조합.
- `@/` alias → `src/` (vite.config.ts + tsconfig).
- zustand가 dependencies에 있으나 현재 코드에서 사용되지 않는다.
