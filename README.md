# dev-voca · 개발자 영단어장

> PR, 코드리뷰, 슬랙, CLI 로딩 단어까지 — 한국어로는 대충 알지만 영어 문맥에서는 막막했던 그 단어들을 카테고리와 빈도로 정리한 웹앱입니다. **로컬 전용 / 정적 사이트** 버전 — 백엔드나 로그인 없이 동작합니다.

🔗 **개발 주소 바로가기**: [https://dev-voca-seven.vercel.app/](https://dev-voca-seven.vercel.app/)

## ✨ Features

- 📚 **12개 개발 카테고리** · CLI 상태, 에러/로그, 코드 리뷰, Git/협업, 아키텍처, 프론트엔드, 빌드/번들, 성능, 테스트, 배포/인프라, 프로세스, 은어/슬랭
- 🎯 **노출 빈도별 분류** · 자주 / 가끔 / 드물게 (칩 토글 + 카운트 표시)
- 🧠 **단어의 배경 설명** · `bug`가 왜 bug인지, `Strangler fig`가 어디서 왔는지 등 유래·뉘앙스가 있는 단어는 짧은 description 동봉
- 🔍 **통합 검색** · 영문 단어 / 한국어 뜻 / 설명 어디에 걸려도 매칭
- ♾️ **무한 스크롤** · 478개 단어를 30개씩 끊어 IntersectionObserver로 점진 로드
- 📱 **반응형 디자인** · 모바일에서 가로 스크롤 칩 + 끝단 페이드 그라데이션으로 자연스러운 UX

## 🛠 Tech Stack

| 영역     | 기술                                       |
| -------- | ------------------------------------------ |
| Frontend | Next.js 14 (App Router), React 18, TypeScript |
| Styling  | Tailwind CSS, Asta Sans (Google Fonts)     |
| Rendering| Static prerender (`next build` 정적 산출)  |
| Data     | `data/vocabulary.ts` (정적 import)         |
| Hosting  | Vercel (자동 배포)                         |

백엔드/DB/로그인 없음. 정적 빌드 산출물만 있으면 어디든 호스팅 가능합니다.

## 📁 Project Structure

```
app/
├── layout.tsx        # 루트 레이아웃 · 메타데이터
├── page.tsx          # 메인 페이지 · 검색/필터/무한스크롤 상태
└── globals.css       # 폰트 @import · 토큰 변수 · chip-row 페이드

components/
├── SearchBar.tsx     # 검색 입력
├── ChipRow.tsx       # 가로 스크롤 칩 래퍼 (좌우 페이드 그라데이션)
└── VocabCard.tsx     # 단어 카드

data/
└── vocabulary.ts     # 모든 단어 + 카테고리/빈도 라벨 (단일 소스)

tailwind.config.js    # 토스 톤 디자인 토큰
```

## 🚀 Getting Started

```bash
npm install
npm run dev
```

http://localhost:3000 으로 접속.

### Build & Start

```bash
npm run build      # .next/ 생성 (정적 prerender)
npm start          # 프로덕션 모드로 서빙
```

## 🌐 배포

본 프로젝트는 **Vercel**에 자동 배포되어 있습니다. `main` 브랜치에 push하면 자동 재배포됩니다.

- 라이브 URL: https://dev-voca-seven.vercel.app/
- Framework Preset: Next.js (자동 감지)
- Build Command: `npm run build`
- Output: `.next/`
- 환경변수 없음 ✨

### 다른 플랫폼 배포

Next.js App Router는 정적 export가 가능하면 어디든 올릴 수 있습니다.

- **Netlify / Cloudflare Pages**: Next 어댑터 사용. 본 프로젝트는 SSR이 없어 정적 산출만으로 충분합니다.
- **GitHub Pages**: `next.config.js`에 `output: "export"`를 추가하고 `next build`. `out/` 폴더를 업로드. 저장소 경로에 배포 시 `basePath` 옵션 필요.

## 🗃 데이터 수정하기

모든 단어 데이터는 `data/vocabulary.ts` 한 파일에 있습니다.

### 단어 추가/수정

`vocabulary` 배열에서 원하는 항목을 편집하거나 새 객체를 추가하세요:

```ts
{
  word: "Strangler fig",
  meaning: "교살자 무화과 패턴",
  category: "architecture",
  frequency: "low",
  description: "Martin Fowler가 명명. 레거시를 점진적으로 새 시스템으로 교체하는 패턴.",
}
```

- `word`: 영문 표제어
- `meaning`: 한국어 뜻 (짧을수록 좋음)
- `category`: `Category` 타입의 12개 slug 중 하나
- `frequency`: `high` | `mid` | `low`
- `description`: 옵셔널 — 유래·뉘앙스가 있는 단어만 채우세요

### 카테고리 추가/변경

`Category` 유니온 타입과 `categoryLabels`만 같이 갱신하면 TypeScript가 누락된 곳을 잡아줍니다. 필터 칩은 `Object.keys(categoryLabels)` 순서대로 렌더되므로 정렬도 여기서 결정됩니다.

### 빈도 라벨

빈도는 `Frequency` 타입(`high`/`mid`/`low`)과 `frequencyLabels`로 정의됩니다. 라벨 텍스트만 한국어로 바꾸려면 `frequencyLabels`만 수정하면 됩니다.

### 재배포

데이터가 빌드 타임에 번들로 들어가므로, 단어를 추가했다면 `git push` → Vercel 자동 재배포로 반영됩니다.

## 🎨 Design Notes

토스(Toss) 디자인 시스템에서 영감을 받은 정돈된 핀테크 톤.

- **타이포그래피**: 영문은 **Asta Sans** (Google Fonts, variable wght 300–800). 한글은 시스템 sans-serif로 자연스럽게 fallback (`Apple SD Gothic Neo` on macOS, `맑은 고딕` on Windows).
- **컬러**:
  - `bg` `#f9fafb` (페이지 배경) · `surface` `#ffffff` (카드)
  - `line` / `line-strong` — `#f2f4f6` / `#e5e8eb` 구분선
  - `ink-900` ~ `ink-100` 회색 위계
  - `brand-500` `#3182f6` — 토스블루 액센트 한 톤만 사용
- **모양**: 라운드 코너 (카드 `rounded-2xl` = 18px), 가는 보더, 그림자 최소화 (`shadow-card` 한 단계만).
- **칩 필터**: 가로 스크롤 + 좌우 끝단 페이드 그라데이션(`var(--bg)` → transparent)으로 "더 있다"는 신호.
- **무한 스크롤**: 30개씩 페이지네이션, sentinel + `IntersectionObserver`, 필터/검색 변경 시 자동 리셋.

## 📝 License

MIT.
