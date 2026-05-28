# 개발 영단어 · Dev Voca

> PR, 코드리뷰, 슬랙, CLI에서 마주치는 개발자 영어 단어장.

**478개**의 단어를 **12개 카테고리** × **3단계 노출 빈도**(자주 / 가끔 / 드물게)로 검색·필터링할 수 있는 정적 웹앱입니다. 배경이 있는 단어(`bug`가 왜 bug가 되었는지 등)는 짧은 설명이 함께 제공됩니다.

## 카테고리

- **CLI 상태** — Claude Code 등 AI CLI에서 보이는 로딩 표현 (`Warping`, `Ruminating`…)
- **에러 / 로그** — `Heisenbug`, `Race condition`, `Stale closure`…
- **코드 리뷰** — `Nit`, `LGTM`, `Bikeshedding`…
- **Git / 협업** — `Squash`, `Cherry-pick`, `Bisect`…
- **아키텍처** — `Coupling`, `Strangler fig`, `Leaky abstraction`…
- **프론트엔드** — `Hydrate`, `Jank`, `Tearing`, `RSC`…
- **빌드 / 번들** — `Tree-shaking`, `Phantom dependency`…
- **성능** — `Bottleneck`, `Cold start`, `Backpressure`…
- **테스트** — `Flaky`, `Smoke test`, `Happy path`…
- **배포 / 인프라** — `Canary`, `Blameless`, `Postmortem`…
- **프로세스** — `Standup`, `Yak shaving`, `Scope creep`…
- **은어 / 슬랭** — `Foo/Bar/Baz`, `Cargo cult`, `Bikeshed`…

## 디자인

토스 스타일의 정돈된 핀테크 톤을 차용했습니다.

- **폰트**: Pretendard Variable
- **컬러**: 회색 배경(#f9fafb) + 흰 카드 + 토스블루(#3182f6) 액센트
- **레이아웃**: 가로 스크롤 칩 필터, 둥근 카드(18px radius), 우측 정렬 배지
- **여백/타이포**: -0.02em 자간, 13~22px 위계, 부드러운 hover

## 기술 스택

- **Next.js 14** (App Router, 정적 prerender)
- **TypeScript**
- **Tailwind CSS** (Toss-tuned design tokens)
- **Pretendard Variable** (CDN)

> TanStack Query는 데이터가 정적이라 사용하지 않았습니다. 추후 서버에서 단어를 받아오게 확장한다면 추가하기 좋습니다.

## 실행

```bash
npm install
npm run dev    # http://localhost:3000
```

## 빌드

```bash
npm run build
npm start
```

## 단어 추가 / 수정

`data/vocabulary.ts` 에서 배열만 수정하면 됩니다.

```ts
{
  word: "Strangler fig",
  meaning: "교살자 무화과 패턴",
  category: "architecture",
  frequency: "low",
  description: "Martin Fowler가 명명. 레거시를 점진적으로 새 시스템으로 교체하는 패턴.",
}
```

`description`은 옵셔널입니다 — 배경/유래가 있을 때만 채우세요.

## 디자인 토큰

`tailwind.config.js` 에서 한 곳으로 모아두었습니다. 액센트 컬러를 바꾸고 싶으면 `brand.500` 값을 조정하세요.

| 토큰                   | 값                             |
| ---------------------- | ------------------------------ |
| `bg`                   | `#f9fafb` (페이지 배경)        |
| `surface`              | `#ffffff` (카드)               |
| `line` / `line-strong` | `#f2f4f6` / `#e5e8eb` (구분선) |
| `ink-900` ~ `ink-100`  | 9 단계 회색 위계               |
| `brand-500`            | `#3182f6` (토스블루)           |
