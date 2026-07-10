import type {
  Chapter,
  MfgOverseasState,
  MfgOvsChannelDef,
  MfgOvsPhoneItem,
  MfgOvsWsMessage,
  MfgValueStripDef,
} from '../../_types';

/**
 * 신 3-B. 산업 적용 — 해외 멀티 메신저 (수출 선적 실무).
 * US Buyer(WhatsApp)·华东化工(WeChat)을 하나의 워크스페이스로 통합.
 * 채널별 M365 MFA 인증 → PO·인코텀즈·부킹·서류세트·통관 실무 → 양방향 AI 번역.
 */

/* ── WhatsApp(US Buyer) 대본 ── */

const WA_KOR_REPLY1 = 'PO #US-2207 확인했습니다. CIF Chicago 조건, 단가 USD 1,180/MT입니다. 선적 창구는 7/20~7/22입니다.';

const WA_PHONE: MfgOvsPhoneItem[] = [
  { id: 'wp1', side: 'partner', text: 'Hi, regarding PO #US-2207 (Ethanol 200MT). Can you confirm the price terms and shipment window?', time: '10:12' },
  { id: 'wp2', side: 'me', text: 'Confirmed PO #US-2207. Terms: CIF Chicago, unit price USD 1,180/MT. Shipment window: Jul 20–22.', time: '10:15' },
  { id: 'wp3', side: 'partner', text: 'Great. Please proceed with booking. We will open the L/C at sight today.', time: '10:16' },
  { id: 'wp4', side: 'me', text: 'Booking confirmed. Carrier MAERSK, Booking No. MAEU-77120, ETD Jul 22 / ETA Aug 14.', time: '10:19' },
  { id: 'wp5', side: 'partner', text: 'Noted. Once loaded, send the full shipping document set for L/C negotiation.', time: '10:20' },
  { id: 'wp6', side: 'me', text: 'Shipment loaded. Full document set attached: B/L, Commercial Invoice, Packing List, C/O.', time: '10:24' },
  { id: 'wp7', side: 'me', file: { icon: '📄', name: 'Shipping_Docs_US-2207.zip' }, time: '10:24' },
  { id: 'wp8', side: 'partner', text: 'Received. Documents match the L/C terms. We will proceed with customs clearance. Thank you.', time: '10:26' },
];

const WA_WS: MfgOvsWsMessage[] = [
  {
    id: 'ww1',
    side: 'in',
    srcLabel: 'US Buyer · WhatsApp 인입',
    text: 'Hi, regarding PO #US-2207 (Ethanol 200MT). Can you confirm the price terms and shipment window?',
    transNote: 'AI 번역(한국어): 안녕하세요, PO #US-2207(에탄올 200MT) 관련입니다. 가격 조건과 선적 시기를 확인해 주시겠어요?',
    time: '10:12',
  },
  {
    id: 'ww2',
    side: 'out',
    srcLabel: '나회사 · AI 번역 영어',
    text: 'Confirmed PO #US-2207. Terms: CIF Chicago, unit price USD 1,180/MT. Shipment window: Jul 20–22.',
    transNote: `AI 번역 · 원문(한국어): ${WA_KOR_REPLY1}`,
    card: { title: '📋 조건 확정', rows: [['조건', 'CIF Chicago'], ['가격/일정', 'USD 1,180/MT · 200MT']] },
    metaText: '✓ WhatsApp 발신 · 감사 이력 기록',
  },
  {
    id: 'ww3',
    side: 'in',
    srcLabel: 'US Buyer · WhatsApp 인입',
    text: 'Great. Please proceed with booking. We will open the L/C at sight today.',
    transNote: 'AI 번역(한국어): 좋습니다. 부킹 진행해 주세요. 오늘 일람불 신용장(L/C at sight)을 개설하겠습니다.',
    time: '10:16',
  },
  {
    id: 'ww4',
    side: 'out',
    srcLabel: '나회사 · AI 번역 영어',
    text: 'Booking confirmed. Carrier MAERSK, Booking No. MAEU-77120, ETD Jul 22 / ETA Aug 14.',
    transNote: 'AI 번역 · 원문(한국어): 선사 부킹 완료했습니다. MAERSK, 부킹번호 MAEU-77120, ETD 7/22 / ETA 8/14입니다.',
    card: { title: '📋 조건 확정', rows: [['부킹', 'MAERSK · MAEU-77120'], ['일정', 'ETD 7/22 → ETA 8/14']] },
    metaText: '✓ WhatsApp 발신 · 감사 이력 기록',
  },
  {
    id: 'ww5',
    side: 'in',
    srcLabel: 'US Buyer · WhatsApp 인입',
    text: 'Noted. Once loaded, send the full shipping document set for L/C negotiation.',
    transNote: 'AI 번역(한국어): 확인했습니다. 선적 완료되면 L/C 매입용 선적 서류 일체를 보내주세요.',
    time: '10:20',
  },
  {
    id: 'ww6',
    side: 'out',
    srcLabel: '나회사 · AI 번역 영어',
    text: 'Shipment loaded. Full document set attached: B/L, Commercial Invoice, Packing List, C/O.',
    transNote: 'AI 번역 · 원문(한국어): 선적 완료되어 서류 세트 첨부드립니다. B/L·상업송장·포장명세서·원산지증명 포함입니다.',
    file: { icon: '📄', name: 'Shipping_Docs_US-2207.zip', sub: 'B/L·Invoice·P/L·C/O · 4 files · 1.8MB' },
    metaText: '✓ WhatsApp 발신 · 감사 이력 기록',
  },
  {
    id: 'ww7',
    side: 'in',
    srcLabel: 'US Buyer · WhatsApp 인입',
    text: 'Received. Documents match the L/C terms. We will proceed with customs clearance. Thank you.',
    transNote: 'AI 번역(한국어): 수령했습니다. 서류가 L/C 조건과 일치합니다. 통관 진행하겠습니다. 감사합니다.',
    time: '10:26',
  },
];

/* ── WeChat(华东化工) 대본 ── */

const WC_PHONE: MfgOvsPhoneItem[] = [
  { id: 'cp1', side: 'partner', text: '您好，关于乙醇订单（100MT）。请确认价格条款和装运时间。', time: '10:30' },
  { id: 'cp2', side: 'me', text: '订单已确认。条款：FOB 釜山，单价 USD 1,150/MT。装运预定 7/24。', time: '10:33' },
  { id: 'cp3', side: 'partner', text: '好的，请安排订舱。我们需要报关所需的全套单据。', time: '10:34' },
  { id: 'cp4', side: 'me', text: '报关单据已准备就绪。附上原产地证明、装箱单、商业发票。', time: '10:38' },
  { id: 'cp5', side: 'me', file: { icon: '📋', name: '报关单据_乙醇_0724.zip' }, time: '10:38' },
  { id: 'cp6', side: 'partner', text: '单据齐全，符合报关要求。我们将办理清关。谢谢。', time: '10:40' },
];

const WC_WS: MfgOvsWsMessage[] = [
  {
    id: 'cw1',
    side: 'in',
    srcLabel: '华东化工 · WeChat 인입',
    text: '您好，关于乙醇订单（100MT）。请确认价格条款和装运时间。',
    transNote: 'AI 번역(한국어): 안녕하세요, 에탄올 주문(100MT) 관련입니다. 가격 조건과 선적 시기를 확인 부탁드립니다.',
    time: '10:30',
  },
  {
    id: 'cw2',
    side: 'out',
    srcLabel: '나회사 · AI 번역 중국어',
    text: '订单已确认。条款：FOB 釜山，单价 USD 1,150/MT。装运预定 7/24。',
    transNote: 'AI 번역 · 원문(한국어): 주문 확인했습니다. FOB 부산 조건, 단가 USD 1,150/MT입니다. 선적은 7/24 예정입니다.',
    card: { title: '📋 조건 확정', rows: [['조건', 'FOB 釜山'], ['가격/일정', 'USD 1,150/MT · 100MT']] },
    metaText: '✓ WeChat 발신 · 감사 이력 기록',
  },
  {
    id: 'cw3',
    side: 'in',
    srcLabel: '华东化工 · WeChat 인입',
    text: '好的，请安排订舱。我们需要报关所需的全套单据。',
    transNote: 'AI 번역(한국어): 좋습니다, 부킹 진행해 주세요. 통관에 필요한 서류 일체가 필요합니다.',
    time: '10:34',
  },
  {
    id: 'cw4',
    side: 'out',
    srcLabel: '나회사 · AI 번역 중국어',
    text: '报关单据已准备就绪。附上原产地证明、装箱单、商业发票。',
    transNote: 'AI 번역 · 원문(한국어): 통관 서류 준비 완료했습니다. 원산지증명·패킹리스트·상업송장 첨부드립니다.',
    file: { icon: '📋', name: '报关单据_乙醇_0724.zip', sub: 'C/O·装箱单·发票 · 3 files · 1.2MB' },
    metaText: '✓ WeChat 발신 · 감사 이력 기록',
  },
  {
    id: 'cw5',
    side: 'in',
    srcLabel: '华东化工 · WeChat 인입',
    text: '单据齐全，符合报关要求。我们将办理清关。谢谢。',
    transNote: 'AI 번역(한국어): 서류가 완비되어 통관 요건에 부합합니다. 청관 진행하겠습니다. 감사합니다.',
    time: '10:40',
  },
];

/* ── 채널·상태 빌더 ── */

function waChannel(opts: { phoneCount: number; auth?: boolean }): MfgOvsChannelDef {
  return {
    id: 'wa',
    tabLabel: 'US Buyer',
    tabSub: 'WhatsApp · 영어',
    tabIcon: '🟢',
    tabIconBg: '#25D366',
    partnerLabel: 'US Buyer · Chicago',
    messengerTag: 'WhatsApp',
    theme: 'wa',
    phoneHeader: 'Cowork+ Channel',
    phoneScreen: opts.auth ? 'auth' : 'chat',
    phoneItems: WA_PHONE.slice(0, opts.phoneCount).map((it, i) => ({
      ...it,
      isNew: i === opts.phoneCount - 1,
    })),
    auth: opts.auth
      ? {
          title: 'Approve sign-in request',
          app: 'Cowork+ · WhatsApp channel access',
          num: '47',
          hint: 'Enter the number shown in your workspace',
          no: 'Deny',
          yes: 'Approve',
        }
      : undefined,
  };
}

function wcChannel(opts: { phoneCount: number; auth?: boolean }): MfgOvsChannelDef {
  return {
    id: 'wc',
    tabLabel: '华东化工',
    tabSub: 'WeChat · 중국어',
    tabIcon: '💬',
    tabIconBg: '#07C160',
    partnerLabel: '华东化工 · Shanghai',
    messengerTag: 'WeChat',
    theme: 'wc',
    phoneHeader: 'Cowork+ 频道',
    phoneScreen: opts.auth ? 'auth' : 'chat',
    phoneItems: WC_PHONE.slice(0, opts.phoneCount).map((it, i) => ({
      ...it,
      isNew: i === opts.phoneCount - 1,
    })),
    auth: opts.auth
      ? {
          title: '批准登录请求',
          app: 'Cowork+ · WeChat 频道访问',
          num: '82',
          hint: '请输入工作区中显示的数字',
          no: '拒绝',
          yes: '批准',
        }
      : undefined,
  };
}

const BASE = {
  banner: '🌐 해외 멀티 메신저 · 수출 선적 실무 · 거래처마다 다른 메신저 + AI 번역으로 언어 장벽 없이 통합',
  headerTitle: '해외 통합 채널 · 수출 선적',
  headerSub: '2개 메신저 · 1개 워크스페이스 · 채널별 M365 인증',
} as const;

function stateOf(partial: Partial<MfgOverseasState>): MfgOverseasState {
  return {
    ...BASE,
    channels: [waChannel({ phoneCount: 1 }), wcChannel({ phoneCount: 1 })],
    wsView: 'select',
    ...partial,
  };
}

const WA_MARKED = (n: number) =>
  WA_WS.slice(0, n).map((m, i) => ({ ...m, isNew: i === n - 1 }));

const VALUE: MfgValueStripDef = {
  sell: '멀티 메신저(WhatsApp·WeChat) 통합 + 양방향 AI 번역으로 언어 장벽 제거.',
  pain: '해외: 거래처마다 다른 메신저로 파편화 · 언어 장벽 · 무역 서류 통제 불가',
  roi: '해외 무역 서류 전량 감사 이력 기록 [추정] · 채널별 M365 인증 통제',
};

export const chapter04IndustryOverseas: Chapter = {
  id: 4,
  act: 4,
  title: '산업 적용 · 해외 — 멀티 메신저 (수출)',
  subtitle: '산업별 확장 (교체 슬롯) · WhatsApp·WeChat 통합 + 채널별 M365 인증 + 양방향 AI 번역',
  narration:
    '해외 수출 거래처면 멀티 메신저 슬롯을 얹습니다. US Buyer는 WhatsApp, 华东化工은 WeChat — 거래처마다 다른 메신저를 하나의 워크스페이스로 통합합니다. 담당자가 영어·중국어를 못 해도 됩니다. 한국어로 입력하면 AI가 번역해 보내고, 상대의 영어·중국어도 한국어로 읽힙니다. 오가는 무역 서류는 전량 회사에 기록됩니다.',
  stage: 'manufacturing',
  states: [
    {
      index: 0,
      mfgValueStrip: VALUE,
      pauseAfterMs: 5000,
      guide:
        '위 두 채널(US Buyer/华东化工)은 서로 다른 메신저를 씁니다. 채널을 선택하면 담당자 인증 후 대화가 열립니다.',
      mfgOverseas: stateOf({}),
      memo: {
        title: '무대 — 해외 멀티 메신저',
        meta: '신 3 · 해외 슬롯',
        situation: '거래처마다 다른 메신저(WhatsApp·WeChat)로 파편화된 수출 실무를 하나의 워크스페이스로 통합한다.',
        interact: '다음 → US Buyer 채널 선택',
        feel: ['메신저가 달라도 화면은 하나'],
        connect: ['→ 채널별 M365 인증'],
      },
    },
    {
      index: 1,
      mfgValueStrip: VALUE,
      pauseAfterMs: 4500,
      mfgOverseas: stateOf({
        activeChannelId: 'wa',
        wsView: 'mfa-intro',
        mfa: { channelName: 'US Buyer · Chicago', messenger: 'WhatsApp' },
      }),
      memo: {
        title: 'STATE 3 — M365 보안 인증',
        meta: '신 3 · 해외',
        situation: 'US Buyer 채널을 여니 M365 인증을 요구한다. 해외 무역 채널은 접근 통제 대상이다.',
        interact: '다음 → 인증 요청 발송',
        feel: ['민감 채널은 본인 확인부터'],
        connect: ['→ Authenticator 푸시'],
      },
    },
    {
      index: 2,
      mfgValueStrip: VALUE,
      pauseAfterMs: 5000,
      mfgOverseas: stateOf({
        activeChannelId: 'wa',
        wsView: 'mfa-wait',
        mfa: { channelName: 'US Buyer · Chicago', messenger: 'WhatsApp', num: '47' },
        channels: [waChannel({ phoneCount: 1, auth: true }), wcChannel({ phoneCount: 1 })],
      }),
      memo: {
        title: 'Authenticator 승인 (영어)',
        meta: '신 3 · 해외',
        situation: '담당자 폰에 Authenticator 푸시(영어)가 도착한다. 워크스페이스 번호(47)와 맞춰 승인한다. 이 인증은 이 채널 전용.',
        interact: '다음 → 승인',
        feel: ['채널별 개별 인증'],
        connect: ['→ MIP 문서보호'],
      },
    },
    {
      index: 3,
      mfgValueStrip: VALUE,
      pauseAfterMs: 4000,
      mfgOverseas: stateOf({
        activeChannelId: 'wa',
        wsView: 'mfa-ok',
        mfa: { channelName: 'US Buyer · Chicago', messenger: 'WhatsApp' },
      }),
      memo: {
        title: '인증 통과',
        meta: '신 3 · 해외',
        situation: 'M365 MFA 인증 통과 · MIP 문서보호 적용 · WhatsApp 채널 열람 허가.',
        interact: '다음 → 수출 실무 시작',
        feel: ['통제 아래 열리는 대화'],
        connect: ['→ PO 확인'],
      },
    },
    {
      index: 4,
      mfgValueStrip: VALUE,
      pauseAfterMs: 5000,
      mfgOverseas: stateOf({
        activeChannelId: 'wa',
        wsView: 'chat',
        wsMessages: WA_MARKED(1),
        transBar: { placeholder: '한국어로 입력 → 영어 번역 전송 · 인코텀즈·가격 조건 확인', state: 'idle' },
      }),
      memo: {
        title: 'PO 인입 — 원문 아래 한국어',
        meta: '신 3 · 해외',
        situation: 'US Buyer의 PO #US-2207 문의가 인입된다. 영어 원문 아래 AI 한국어 번역이 자동으로 붙는다.',
        interact: '다음 → AI 번역 응대',
        feel: ['영어를 몰라도 읽힌다'],
        connect: ['→ 한국어 입력 → 영어 전송'],
      },
    },
    {
      index: 5,
      mfgValueStrip: VALUE,
      pauseAfterMs: 5000,
      mfgOverseas: stateOf({
        activeChannelId: 'wa',
        wsView: 'chat',
        wsMessages: WA_MARKED(1),
        transBar: { typed: WA_KOR_REPLY1, state: 'typing' },
      }),
      memo: {
        title: 'STATE 4 — 양방향 AI 번역 (입력)',
        meta: '신 3 · 해외',
        situation: '담당자가 한국어로 입력한다. "PO #US-2207 확인했습니다. CIF Chicago 조건…"',
        interact: '다음 → 번역 전송',
        feel: ['한국어로 수출 실무를 본다'],
        connect: ['→ 영어 번역 발신'],
      },
    },
    {
      index: 6,
      mfgValueStrip: VALUE,
      pauseAfterMs: 5000,
      mfgOverseas: stateOf({
        activeChannelId: 'wa',
        wsView: 'chat',
        wsMessages: WA_MARKED(2),
        channels: [waChannel({ phoneCount: 2 }), wcChannel({ phoneCount: 1 })],
        transBar: { placeholder: '한국어로 입력 → 영어 번역 전송', state: 'idle' },
      }),
      memo: {
        title: 'CIF·단가 확정 — 영어로 전송',
        meta: '신 3 · 해외',
        situation: '한국어 입력이 영어로 번역되어 US Buyer 폰에 전송됐다. 조건 확정 카드와 함께 감사 이력으로 기록된다.',
        interact: '다음 → L/C 개설 회신',
        feel: ['✓ WhatsApp 발신 · 감사 이력 기록'],
        connect: ['→ 부킹 요청'],
      },
    },
    {
      index: 7,
      mfgValueStrip: VALUE,
      pauseAfterMs: 4500,
      mfgOverseas: stateOf({
        activeChannelId: 'wa',
        wsView: 'chat',
        wsMessages: WA_MARKED(3),
        channels: [waChannel({ phoneCount: 3 }), wcChannel({ phoneCount: 1 })],
        transBar: { placeholder: '한국어로 입력 → 영어 번역 전송 · 선적 부킹 진행', state: 'idle' },
      }),
      memo: {
        title: 'L/C at sight — 부킹 요청',
        meta: '신 3 · 해외',
        situation: 'US Buyer가 부킹 진행을 요청하고 일람불 신용장 개설을 알린다.',
        interact: '다음 → 부킹 완료 회신',
        feel: ['무역 조건이 채널에 남는다'],
        connect: ['→ MAERSK 부킹'],
      },
    },
    {
      index: 8,
      mfgValueStrip: VALUE,
      pauseAfterMs: 5000,
      mfgOverseas: stateOf({
        activeChannelId: 'wa',
        wsView: 'chat',
        wsMessages: WA_MARKED(5),
        channels: [waChannel({ phoneCount: 5 }), wcChannel({ phoneCount: 1 })],
        transBar: { placeholder: '한국어로 입력 → 영어 번역 전송 · 선적 서류 세트 발송', state: 'idle' },
      }),
      memo: {
        title: '부킹 확정 → 서류 요청',
        meta: '신 3 · 해외',
        situation: 'MAERSK 부킹(MAEU-77120, ETD 7/22/ETA 8/14)이 확정되고, L/C 매입용 선적 서류 일체가 요청된다.',
        interact: '다음 → 서류 세트 발송',
        feel: ['부킹 번호·일정이 카드로 고정'],
        connect: ['→ B/L·송장·C/O'],
      },
    },
    {
      index: 9,
      mfgValueStrip: VALUE,
      pauseAfterMs: 5500,
      mfgOverseas: stateOf({
        activeChannelId: 'wa',
        wsView: 'chat',
        wsMessages: WA_MARKED(7),
        channels: [waChannel({ phoneCount: 8 }), wcChannel({ phoneCount: 1 })],
        doneNote:
          '✓ US Buyer 수출 완결 — PO 확인 → CIF·L/C 조건 → 선적 부킹 → 서류세트 발송 → 통관까지, 양방향 AI 번역으로 언어 장벽 없이 · 전량 감사 이력',
      }),
      memo: {
        title: 'US Buyer 완결 — 통관까지',
        meta: '신 3 · 해외',
        situation: '서류 세트(B/L·Invoice·P/L·C/O)가 발송되고, L/C 조건 일치 확인 후 통관이 진행된다.',
        interact: '다음 → 华东化工(WeChat) 채널',
        feel: ['무역 서류 전량 감사 이력 [추정]'],
        connect: ['→ 중국어 채널도 같은 방식'],
      },
    },
    {
      index: 10,
      mfgValueStrip: VALUE,
      pauseAfterMs: 5000,
      mfgOverseas: stateOf({
        activeChannelId: 'wc',
        wsView: 'mfa-wait',
        mfa: { channelName: '华东化工 · Shanghai', messenger: 'WeChat', num: '82' },
        channels: [waChannel({ phoneCount: 8 }), wcChannel({ phoneCount: 1, auth: true })],
      }),
      memo: {
        title: '华东化工 채널 — 중국어 Authenticator',
        meta: '신 3 · 해외',
        situation: 'WeChat 채널을 열면 다시 채널별 M365 인증. 이번엔 Authenticator 푸시가 중국어(批准登录请求)로 도착한다.',
        interact: '다음 → 승인 후 수출 실무',
        feel: ['채널별 · 언어별 인증'],
        connect: ['→ FOB 부산 실무'],
      },
    },
    {
      index: 11,
      mfgValueStrip: VALUE,
      pauseAfterMs: 6000,
      mfgOverseas: stateOf({
        activeChannelId: 'wc',
        wsView: 'chat',
        wsMessages: WC_WS.map((m, i) => ({ ...m, isNew: i >= WC_WS.length - 2 })),
        channels: [waChannel({ phoneCount: 8 }), wcChannel({ phoneCount: 6 })],
        doneNote:
          '✓ 华东化工 수출 완결 — FOB·가격 확인 → 통관 서류세트 발송 → 청관까지, 양방향 AI 번역으로 언어 장벽 없이 · 전량 감사 이력',
      }),
      memo: {
        title: '중국어 채널 완결 — 같은 골격',
        meta: '신 3 · 해외 · ROI',
        situation:
          'FOB 부산·단가 확인 → 통관 서류세트(原产地证明·装箱单·发票) 발송 → 청관까지. 한국어 입력이 중국어로 번역 전송되고 전 과정이 감사 이력으로 남는다.',
        interact: '다음 → (신 4 관리자 대시보드로)',
        feel: ['"제품 하나로 산업을 바꿔가며 대응합니다"'],
        connect: ['→ 신 4: 자산화의 결실'],
      },
    },
  ],
  onComplete: { nextChapter: 5 },
};
