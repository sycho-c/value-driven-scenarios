export const COMPANY = 'DWorks';
export const PRODUCT = 'Cowork+';

export const TAGLINE = '흩어진 채널을 하나로 묶고, 운영자에게 데이터를 돌려준다';
export const TAGLINE_LONG = '카톡으로 일어나는 일을, 회사가 보게 만듭니다.';

export const HERO_HOOK = '거래처가 팀장에게 직접 카톡하는 순간, 영업은 이미 끝났습니다.';
export const HERO_HOOK_QUOTE = '팀장님, 죄송한데 직접 연락드려요.';

export const CASES = {
  'cowork-hana': {
    label: '1Q 설계 상담',
    customer: '하나손해보험',
    industry: '손해보험 · GA 채널',
    summary: '보이지 않는 비용 → 문서가 스스로 읽힌다 → 보이지 않던 현장이 데이터가 된다',
    accentColor: '#1B4F72',
  },
  'wontalk-woori': {
    label: 'WON TALK',
    customer: '우리금융캐피탈',
    industry: '자동차금융',
    summary: '4,000명 AG 파트너망의 통제력',
    accentColor: '#1A1040',
  },
  'salesbridge-gaon': {
    label: 'ONE TALK',
    customer: '가온전선',
    industry: '전선 · 소재 B2B',
    summary: '카오스 → 거버넌스 → 통제 확대 → 경영 자산화 (7 SCENE)',
    accentColor: '#1B4F72',
  },
} as const;

export type CaseId = keyof typeof CASES;

export const CASE_IDS = Object.keys(CASES) as CaseId[];
