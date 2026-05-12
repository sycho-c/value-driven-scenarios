import type { Chapter } from '../../_types';
import { SALESBRIDGE_SIDEBAR } from '../workspace-defaults';

// ONE TALK 도입 이후 같은 거래처가 같은 요청을 보낸다. 결과가 완전히 다르다.
// Stage B(phone-workspace)로 전환되는 첫 챕터. 거래처 폰 + 가온 BR Workspace.

export const chapter02OnetalkArrives: Chapter = {
  id: 2,
  act: 3,
  title: '같은 카톡, 다른 결과',
  subtitle: '팀장이 응답 지연을 먼저 보고, BR은 우선순위 알림으로 응답합니다',
  narration:
    'ONE TALK 도입 후, 박대표는 평소처럼 단톡방에 견적을 요청합니다. 이번엔 단톡방이 그저 채팅창이 아니라 회사 업무의 입구입니다. 라우팅 룰이 BR을 자동 배정하고 SLA를 시작하며, BR이 다른 거래처에 묶여 응답이 늦어지면 팀장 모니터링 큐에 먼저 알림이 뜹니다. 거래처가 답답해지기 전에 팀장이 우선순위를 정리합니다.',
  stage: 'phone-workspace',
  states: [
    // STATE 0 — 박대표가 견적 요청. 자동 배정 + SLA 카운트
    {
      index: 0,
      activeCastId: 'park-rep',
      guide:
        '박대표가 ONE TALK 채널(미우케이블 ↔ 가온)에 견적을 요청합니다. 라우팅 룰이 즉시 작동해 강승희 BR을 자동 배정하고 30분 SLA를 시작합니다.',
      phones: {
        guest: {
          type: 'wontalk-group',
          headerTitle: '미우케이블 ↔ 가온',
          headerSubtitle: '참여자 8명 · ONE TALK 채널',
          messages: [
            {
              id: 'g-quote',
              kind: 'message',
              text: '안녕하세요. 견적 부탁드립니다. CV전선 3.5sq 1,200m / 8월 분 PO 갱신 건이에요.',
              senderId: 'park-rep',
              side: 'mine',
              time: '오전 10:14',
            },
            {
              id: 'sys-assigned',
              kind: 'system',
              text: '🎯 강승희 BR 자동 배정 — CV전선·B2B 거래처 담당 · 응답 SLA 30분',
              meta: { tone: 'brand' },
            },
            {
              id: 'br-grab',
              kind: 'message',
              text: '박대표님, 견적 요청 잘 받았습니다. 30분 내 회신드리겠습니다 — 우선순위 알림 켜놨어요!',
              senderId: 'kang-bs',
              side: 'other',
              time: '오전 10:14',
              isNew: true,
            },
          ],
        },
      },
      workspace: {
        mode: 'chat',
        sidebar: SALESBRIDGE_SIDEBAR,
        chat: {
          title: '미우케이블 ↔ 가온',
          participants: 8,
          messages: [
            {
              id: 'ws-q',
              kind: 'message',
              text: 'CV전선 3.5sq 1,200m / 8월 분 PO 갱신 건 견적 부탁드립니다.',
              senderId: 'park-rep',
              time: '오전 10:14',
            },
            {
              id: 'ws-rule',
              kind: 'system',
              text: '⚙️ 라우팅 룰 평가 — 거래처: 미우케이블 / 카테고리: CV전선·B2B / 부하 균형 점수 계산',
              meta: { tone: 'muted' },
            },
            {
              id: 'ws-assigned',
              kind: 'system',
              text: '🎯 강승희 BR 자동 배정 (현재 부하 4/8) · 응답 SLA 30분 시작',
              meta: { tone: 'brand' },
            },
            {
              id: 'ws-priority',
              kind: 'system',
              text: '🔔 강승희 폰에 우선순위 알림 발송 완료 (800ms)',
              meta: { tone: 'good' },
            },
          ],
        },
        operatorPanel: [
          {
            id: 'p-rule',
            kind: 'auto-assign',
            title: '라우팅 룰 적용',
            body: '거래처 · 상품 카테고리 · BR 현재 부하 + 거래처 매핑 기반 점수',
            highlight: 'RULE · onetalk-b2b-route-v2',
            tone: 'brand',
          },
          {
            id: 'p-load',
            kind: 'auto-assign',
            title: 'BR 부하 균형',
            body: '강승희 4/8 · 김지훈 5/8 · 박정민 6/8 → 강승희 최우선 후보 (미우 매핑 기존 BR)',
            highlight: 'LOAD · KSH 50%',
            tone: 'good',
          },
          {
            id: 'p-sla',
            kind: 'new-task',
            title: '응답 SLA 카운트',
            body: '응답 SLA 30분 · 처리 SLA 4시간 시작. 초과 시 팀장 모니터링 큐로 자동 에스컬레이션',
            highlight: 'SLA · resp 30m / proc 4h',
            tone: 'warn',
          },
          {
            id: 'p-priority',
            kind: 'audit-log',
            title: '우선순위 알림 발송',
            body: '강승희에게 푸시 · ONE TALK 인박스 최상단 고정 · 응답 대기 표시',
            highlight: 'NOTIF · DELIVERED 800ms',
            tone: 'muted',
          },
        ],
      },
      presets: [
        {
          id: 's0-next',
          text: '박대표가 또 1:1 사이드 채널을 시도',
          kind: 'guest',
          nextStateIndex: 1,
        },
      ],
      memo: {
        title: 'STATE 0 — 응답이 시작되기 전에 시계가 먼저 돈다',
        meta: 'ONE TALK · 자동 배정 + SLA',
        situation:
          '견적 요청 1건이 도착한 순간 — 라우팅 룰 평가 → BR 매칭 → SLA 카운트 → 우선순위 알림이 1초 내 완결. 사람이 "누가 답할지" 결정할 필요가 없다.',
        interact: 'BR은 알림을 받고 즉시 응답. 거래처는 자기 요청이 회사에 떨어진 것을 확인.',
        feel: [
          '거래처: "이번엔 누구한테 가는지 보인다"',
          'BR: "내 화면에 우선순위가 줄 서 있으니 결정이 빠르다"',
          '청중: "이게 회사가 채널을 갖는다는 의미"',
        ],
        connect: [
          '다음 STATE — 응답 지연 임박 → 팀장 모니터링 큐 → 우선순위 부스트',
          'Ch.3 (Act IV) — 이 모든 SLA 데이터가 분기 보고로 자동 적재',
        ],
      },
    },
    // STATE 1 — 응답 지연 → 팀장 모니터링 큐 + 우선순위 부스트
    {
      index: 1,
      activeCastId: 'lee-team',
      guide:
        '강승희가 다른 거래처 응대에 묶여 14분 대기. SLA 임박 알림이 이팀장 모니터링 큐에 먼저 뜨고, 이팀장이 강승희 폰에 우선순위 부스트를 발동합니다.',
      phones: {
        guest: {
          type: 'wontalk-group',
          headerTitle: '미우케이블 ↔ 가온',
          headerSubtitle: '참여자 8명 · ONE TALK 채널',
          messages: [
            {
              id: 'g-q',
              kind: 'message',
              text: 'CV전선 3.5sq 1,200m / 8월 분 PO 갱신 건 견적 부탁드립니다.',
              senderId: 'park-rep',
              side: 'mine',
              time: '오전 10:14',
            },
            {
              id: 'br-grab-2',
              kind: 'message',
              text: '박대표님, 견적 요청 잘 받았습니다. 30분 내 회신드리겠습니다.',
              senderId: 'kang-bs',
              side: 'other',
              time: '오전 10:14',
            },
            {
              id: 'sys-wait',
              kind: 'system',
              text: '⏱ 응답 대기 14분 · SLA 16분 남음',
              meta: { tone: 'warn' },
            },
            {
              id: 'sys-boost',
              kind: 'system',
              text: '🔔 요청하신 내용에 대해서 곧 회신할 예정입니다. 잠시만 기다려 주세요.',
              meta: { tone: 'brand' },
            },
          ],
        },
      },
      workspace: {
        mode: 'chat',
        sidebar: SALESBRIDGE_SIDEBAR,
        chat: {
          title: '미우케이블 ↔ 가온',
          participants: 8,
          notice: {
            text: '할일 알림 · 지연 임박 (강승희 다른 거래처 응대 중)',
            readCount: 4,
            totalCount: 8,
          },
          messages: [
            {
              id: 'ws-watch',
              kind: 'system',
              text: '👀 이팀장이 모니터링 큐에서 "미우케이블 응답 14분 지연" 카드를 확인',
              meta: { tone: 'muted' },
            },
            {
              id: 'ws-boost',
              kind: 'system',
              text: '🔝 이팀장 → 강승희에게 우선순위 부스트 발동 (큐 최상단 고정 + 진동 알림)',
              meta: { tone: 'brand' },
            },
            {
              id: 'ws-team-nudge',
              kind: 'message',
              text: '강승희님, 미우 박대표 견적 건 우선 처리해 주세요. 다른 건은 잠시 미뤄도 됩니다.',
              senderId: 'lee-team',
              time: '오전 10:28',
              isNew: true,
            },
            {
              id: 'ws-br-reply',
              kind: 'message',
              text: '네 팀장님, 바로 회신드리겠습니다.',
              senderId: 'kang-bs',
              time: '오전 10:29',
              isNew: true,
            },
          ],
        },
        operatorPanel: [
          {
            id: 'p-watch',
            kind: 'compliance',
            title: '응답 지연 임박 감지',
            body: 'BR 강승희가 다른 거래처 응대로 14분 대기. SLA 30분 중 절반 경과 시점에 팀장 모니터링 큐로 자동 카드 적재.',
            highlight: 'EVENT · sla-warn-50',
            meta: '2025-09-22 10:28:11 KST',
            tone: 'warn',
          },
          {
            id: 'p-boost',
            kind: 'auto-assign',
            title: '팀장 우선순위 부스트',
            body: '강승희 응답 큐의 미우케이블 건을 최상단 고정 + 진동 알림. 거래처에도 부스트 안내 카드 자동 전송.',
            highlight: 'BOOST · #MW-2025-09-22-014',
            tone: 'brand',
          },
          {
            id: 'p-monitor',
            kind: 'audit-log',
            title: '팀장 모니터링 큐',
            body: '이팀장은 모든 거래처-BR 응답 흐름을 한 화면에서 관찰. 늦어지기 전에 먼저 움직일 수 있다.',
            highlight: 'TEAM-QUEUE · realtime',
            tone: 'good',
          },
        ],
      },
      presets: [
        {
          id: 's1-next',
          text: '강승희가 우선순위 부스트 후 즉시 회신',
          kind: 'br',
          nextStateIndex: 2,
        },
      ],
      memo: {
        title: 'STATE 1 — 팀장이 먼저 보고, 시스템이 우선순위로 정리',
        meta: 'ONE TALK · 가시성 + 우선순위 부스트',
        situation:
          '거래처가 답답해지기 전에 회사가 먼저 움직인다. 응답 SLA의 절반이 지나면 팀장 모니터링 큐에 자동 카드 → 팀장이 BR에게 우선순위 부스트 → BR은 어떤 일부터 처리해야 할지 더 이상 혼자 결정하지 않는다.',
        interact: '거래처는 "곧 회신될 거라는" 부스트 안내 카드. 팀장은 한 줄 nudge. BR은 큐 최상단 알림.',
        feel: [
          '팀장: "내 시야에 모든 응답 흐름이 있다"',
          'BR: "어떤 거래처부터 답해야 하는지 시스템이 정리해 준다"',
          '거래처: "내가 재촉하기 전에 회사가 먼저 움직였다"',
        ],
        connect: [
          'Ch.3 (Act IV) — 분기 SLA 준수율 + 팀장 nudge 통계가 본부장 보고로',
          '거래처 평균 응답시간 -85% / 팀장 직접 컴플레인 0건',
        ],
      },
    },
    // STATE 2 — 강승희 즉시 응답. 같은 화면 안에서 견적 회신
    {
      index: 2,
      activeCastId: 'kang-bs',
      guide:
        '강승희가 우선순위 부스트 알림 후 18분 만에 견적 회신. SLA 12분 여유. 거래처는 사이드 채널이 필요 없었다고 느낌.',
      phones: {
        guest: {
          type: 'wontalk-group',
          headerTitle: '미우케이블 ↔ 가온',
          headerSubtitle: '참여자 8명 · ONE TALK 채널',
          messages: [
            {
              id: 'g-q-3',
              kind: 'message',
              text: 'CV전선 3.5sq 1,200m / 8월 분 PO 갱신 건 견적 부탁드립니다.',
              senderId: 'park-rep',
              side: 'mine',
              time: '오전 10:14',
            },
            {
              id: 'br-reply',
              kind: 'message',
              text:
                '박대표님 견적 회신드립니다. CV전선 3.5sq 1,200m 단가 ₩4,830/m · 8월 동일 단가 적용. 견적서 PDF 첨부 + 자동 PO 폼 카드 함께 보냈어요.',
              senderId: 'kang-bs',
              side: 'other',
              time: '오전 10:32',
              isNew: true,
            },
            {
              id: 'card-pdf',
              kind: 'url-card',
              text: '견적서 #ONE-0922-MW-014.pdf',
              meta: {
                preview: '미우케이블 / 2025년 9월 22일 / 회신자 강승희 BR',
                cta: '바로 열기',
              },
              isNew: true,
            },
            {
              id: 'g-reply',
              kind: 'message',
              text: '오 빠르네요. 단톡방 안에서 이렇게 정리되니까 따로 찾아갈 일이 없네요.',
              senderId: 'park-rep',
              side: 'mine',
              time: '오전 10:34',
              isNew: true,
            },
          ],
        },
      },
      workspace: {
        mode: 'chat',
        sidebar: SALESBRIDGE_SIDEBAR,
        chat: {
          title: '미우케이블 ↔ 가온',
          participants: 8,
          messages: [
            {
              id: 'ws-resolve',
              kind: 'system',
              text: '✅ 미우케이블 #014 응답 완료 — 소요 18분 (SLA 30분 대비 12분 여유)',
              meta: { tone: 'good' },
            },
            {
              id: 'ws-trace',
              kind: 'system',
              text: '🔗 견적서 추적 URL 발급 — onetalk.gaoncable.kr/q/0922-mw-014 · CRM 연동 완료',
              meta: { tone: 'brand' },
            },
            {
              id: 'ws-no-escalation',
              kind: 'system',
              text: '🟢 팀장 모니터링 큐 자동 해제 · 컴플레인 미발생',
              meta: { tone: 'good' },
            },
          ],
        },
        operatorPanel: [
          {
            id: 'p-time',
            kind: 'new-task',
            title: '응답 효율',
            body: '#014 응답 소요 18분 — 전 분기 평균 응답 4.2시간 대비 14배 단축',
            highlight: 'RESP · 18m / 4.2h',
            tone: 'good',
          },
          {
            id: 'p-track',
            kind: 'tracking-code',
            title: '견적 추적 URL',
            body: '거래처가 PDF를 열람한 시각·다운로드·재요청까지 자동 추적',
            highlight: 'onetalk.gaoncable.kr/q/0922-mw-014',
            tone: 'brand',
          },
          {
            id: 'p-crm',
            kind: 'audit-log',
            title: 'CRM 자동 적재',
            body: '거래처·BR·견적가·요청 시각·응답 시각·SLA 마진이 한 행으로 ERP에 동기',
            highlight: 'ERP · GAON-SALES · 동기 완료',
            tone: 'muted',
          },
          {
            id: 'p-prevent',
            kind: 'compliance',
            title: '팀장 가시성 + 우선순위 운영',
            body: '이번 분기 팀장 nudge 89건 / SLA 50% 도달 자동 알림 412건 / 팀장 직접 컴플레인 0건',
            highlight: 'OPS · 89 nudges / 0 complaint',
            tone: 'good',
          },
        ],
      },
      presets: [],
      memo: {
        title: 'STATE 2 — 다른 채널로 갈 필요가 없다',
        meta: 'ONE TALK · 회사 채널이 더 빠를 때',
        situation:
          '같은 거래처, 같은 요청, 같은 BR. 결과는 컴플레인 0건 · 응답 18분 · 자동 적재. 사람이 잘해서가 아니라 채널이 다르기 때문.',
        interact: '거래처는 같은 단톡방 안에서 견적 PDF + 추적 URL을 받는다. 사이드 채널을 시도할 동기 자체가 사라진다.',
        feel: [
          '거래처: "이 길이 더 편하다"',
          'BR: "내 보고서가 자동으로 만들어진다"',
          '회사: "팀장에게 컴플레인이 오지 않는 분기"',
        ],
        connect: [
          'Ch.3 (Act IV) — 이 모든 데이터가 본부장 보고 자료로 자동 집계',
          '거래처 평균 응답시간 -38% / 사이드 채널 시도 흡수 -67%',
        ],
      },
    },
  ],
  onComplete: { nextChapter: 3, demoAutoAdvance: true },
};
