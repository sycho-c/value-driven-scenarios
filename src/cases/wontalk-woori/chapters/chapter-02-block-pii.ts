import type { Chapter } from '../../_types';

export const chapter02BlockPii: Chapter = {
  id: 2,
  act: 3,
  title: '주민번호를 단체방에 치지 마세요',
  subtitle: '개인정보가 단톡방에 들어가는 그 순간, 시스템이 막는다',
  narration:
    '강민호는 평소처럼 단체방에 고객 정보를 적습니다. 주민번호 일곱 자리가 입력되는 순간, 시스템이 메시지를 자동 차단합니다. 김경화 BR이 비즈폼으로 안내합니다.',
  stage: 'phone-workspace',
  states: [
    {
      index: 0,
      activeCastId: 'park-rep',
      guide: '강민호가 단체방에 신규 건을 접수하려 합니다.',
      phones: {
        guest: {
          type: 'wontalk-group',
          headerTitle: '지엔에이 영업팀',
          headerSubtitle: '참여자 11명 · 9 읽음',
          messages: [
            {
              id: 'g-0',
              kind: 'message',
              text: '신규 대출 건 접수합니다. 고객 홍길동인데요.',
              senderId: 'park-rep',
              side: 'mine',
              time: '오후 2:14',
            },
          ],
        },
      },
      workspace: {
        mode: 'chat',
        chat: {
          title: '지엔에이 영업팀',
          participants: 11,
          messages: [
            {
              id: 'ws-g-0',
              kind: 'message',
              text: '신규 대출 건 접수합니다. 고객 홍길동인데요.',
              senderId: 'park-rep',
              time: '오후 2:14',
            },
          ],
        },
        operatorPanel: [
          {
            id: 'p-realtime',
            kind: 'audit-log',
            title: '실시간 모니터링',
            body: 'PII 패턴 감지 룰 4종 작동 중 — 주민번호, 카드번호, 계좌번호, 운전면허번호',
            highlight: 'RULES · 4 / 4 ACTIVE',
            tone: 'muted',
          },
          {
            id: 'p-todays',
            kind: 'new-task',
            title: '오늘의 채널 활동',
            body: '지엔에이 영업팀 · 신규 접수 12건 / 처리 완료 9건',
            meta: '2026.07.08 14:00 기준',
            tone: 'muted',
          },
        ],
      },
      presets: [
        {
          id: 'park-types-pii',
          text: '주민번호 뒷자리 1234567, 아이오닉6 3500만원 건 처리 부탁드립니다',
          kind: 'guest',
          nextStateIndex: 1,
        },
      ],
      memo: {
        title: 'STATE 0 — 익숙한 입력 습관',
        meta: '강민호 · 파트너 영업',
        situation:
          '강민호는 지난 회사에서도 단톡방에 고객 정보를 적던 사람이다. 새 채널이 오픈된 첫 주에도 같은 패턴이 그대로 따라온다.',
        interact: '단체방 입력 필드. 평소처럼 주민번호 뒷자리 + 차종 + 금액을 친다.',
        feel: [
          '"여기도 그냥 단톡방이지 뭐"',
          '입력 자체에 대한 거리감이 없다',
          '청중: 이게 지금 우리 단톡방에서 매일 일어나고 있다',
        ],
        connect: [
          '바로 다음 STATE에서 시스템 차단이 일어남 — "자동" 보안의 정의',
          '같은 사례 Act IV의 컴플라이언스 ROI와 연결',
        ],
      },
    },
    {
      index: 1,
      activeCastId: 'park-rep',
      guide: '시스템이 메시지를 자동 차단합니다.',
      phones: {
        guest: {
          type: 'wontalk-group',
          headerTitle: '지엔에이 영업팀',
          headerSubtitle: '참여자 11명',
          messages: [
            {
              id: 'g-0',
              kind: 'message',
              text: '신규 대출 건 접수합니다. 고객 홍길동인데요.',
              senderId: 'park-rep',
              side: 'mine',
              time: '오후 2:14',
            },
            {
              id: 'g-blocked',
              kind: 'message',
              text: '주민번호 뒷자리 1234567, 아이오닉6 3500만원 건 처리 부탁드립니다',
              senderId: 'park-rep',
              side: 'mine',
              time: '오후 2:15',
              isNew: true,
              meta: { danger: true, urgent: true },
            },
            {
              id: 'sys-block',
              kind: 'system',
              text: '🚫 메시지가 차단되었습니다 — 비즈폼으로 접수해 주세요',
              meta: { tone: 'danger' },
            },
          ],
        },
      },
      workspace: {
        mode: 'chat',
        chat: {
          title: '지엔에이 영업팀',
          participants: 11,
          messages: [
            {
              id: 'ws-g-0',
              kind: 'message',
              text: '신규 대출 건 접수합니다. 고객 홍길동인데요.',
              senderId: 'park-rep',
              time: '오후 2:14',
            },
            {
              id: 'ws-blocked',
              kind: 'system',
              text: '🚫 강민호 메시지 차단 — 주민번호 패턴 감지 (1234567)',
              meta: { tone: 'danger' },
            },
            {
              id: 'ws-audit',
              kind: 'system',
              text: '📝 감사 로그: 2026-07-08 14:15:02 / pii-rule-rrn-back7 / 강민호',
              meta: { tone: 'muted' },
            },
          ],
        },
        operatorPanel: [
          {
            id: 'p-block-event',
            kind: 'compliance',
            title: '메시지 차단 이벤트',
            body: '주민번호 뒷자리 7자리 패턴 감지 — 강민호 / 지엔에이 영업팀',
            highlight: 'RULE · pii-rrn-back7',
            meta: '2026-07-08 14:15:02 KST',
            tone: 'danger',
          },
          {
            id: 'p-audit-line',
            kind: 'audit-log',
            title: '감사 로그 자동 적재',
            body: '발신자 ID, 차단된 패턴, 채널 ID가 추적 가능한 형태로 기록됨',
            highlight: 'LOG-ID #AU-2026-07-08-04421',
            tone: 'muted',
          },
        ],
      },
      presets: [
        {
          id: 'br-guides-bizform',
          text: '강민호님, 개인정보는 비즈폼으로 접수해 주세요! 아래 비즈폼을 탭해서 작성해 주시면 바로 처리해 드릴게요 😊',
          kind: 'br',
          nextStateIndex: 2,
          trigger: 'send_bf_card',
        },
      ],
      memo: {
        title: 'STATE 1 — 시스템이 사람보다 먼저 막는다',
        meta: 'Cowork+ · 개인정보 자동 차단',
        situation:
          '주민번호 뒷자리 7자리 패턴을 정규식이 잡는다. 발신자에게 차단 사실을 즉시 알리고, 운영자 콘솔에 감사 로그가 자동 적재된다.',
        interact: '발신자는 차단 알림을, 운영자는 콘솔에서 감사 로그를 본다.',
        feel: [
          '발신자: "어? 안 보내지네"',
          '운영자: "내가 매일 모니터링하지 않아도 되는구나"',
          '청중: "사람이 실수해도 시스템이 막는다"',
        ],
        connect: [
          '다음 STATE에서 비즈폼이 대안으로 등장 — 막기만 하지 않고 길을 열어준다',
          '같은 사례 Act IV의 감사 로그 ROI와 연결',
        ],
      },
    },
    {
      index: 2,
      activeCastId: 'kim-kyunghwa',
      guide: 'BR이 비즈폼 카드를 전송합니다. 강민호가 그것을 탭하면 안전한 폼으로 전환.',
      phones: {
        guest: {
          type: 'wontalk-group',
          headerTitle: '지엔에이 영업팀',
          headerSubtitle: '참여자 11명',
          messages: [
            {
              id: 'g-0',
              kind: 'message',
              text: '신규 대출 건 접수합니다. 고객 홍길동인데요.',
              senderId: 'park-rep',
              side: 'mine',
              time: '오후 2:14',
            },
            {
              id: 'sys-block-2',
              kind: 'system',
              text: '🚫 이전 메시지가 차단되었습니다',
              meta: { tone: 'danger' },
            },
            {
              id: 'br-guide',
              kind: 'message',
              text: '강민호님, 개인정보는 비즈폼으로 접수해 주세요! 아래 비즈폼을 탭해서 작성해 주시면 바로 처리해 드릴게요 😊',
              senderId: 'kim-kyunghwa',
              side: 'other',
              time: '오후 2:15',
              isNew: true,
            },
            {
              id: 'bizform-card',
              kind: 'bizform-card',
              text: '신규 대출 접수 비즈폼',
              meta: {
                fields: ['고객명', '상품 선택', '연락처', '차종', '대출 금액'],
                cta: '비즈폼 작성',
              },
              isNew: true,
            },
          ],
        },
      },
      workspace: {
        mode: 'chat',
        chat: {
          title: '지엔에이 영업팀',
          participants: 11,
          messages: [
            {
              id: 'ws-g-0',
              kind: 'message',
              text: '신규 대출 건 접수합니다. 고객 홍길동인데요.',
              senderId: 'park-rep',
              time: '오후 2:14',
            },
            {
              id: 'ws-blocked-2',
              kind: 'system',
              text: '🚫 강민호 메시지 차단 — 주민번호 패턴',
              meta: { tone: 'danger' },
            },
            {
              id: 'ws-br-guide',
              kind: 'message',
              text: '강민호님, 개인정보는 비즈폼으로 접수해 주세요!',
              senderId: 'kim-kyunghwa',
              time: '오후 2:15',
            },
            {
              id: 'ws-bizform-sent',
              kind: 'system',
              text: '✅ 비즈폼 카드 전송 완료 · 강민호 수신',
              meta: { tone: 'good' },
            },
          ],
        },
        operatorPanel: [
          {
            id: 'p-bizform-template',
            kind: 'new-task',
            title: '비즈폼 템플릿: 신규 대출 접수',
            body: '필수 필드 5종 · 자동 입력 2종(고객명, 연락처) · PII 마스킹',
            highlight: 'TEMPLATE · BF-AUTO-LOAN-v3',
            tone: 'brand',
          },
          {
            id: 'p-bf-deliver',
            kind: 'audit-log',
            title: '비즈폼 전송 이력',
            body: 'BR 김경화 → 강민호 · 단톡방 in-line 전달 · 1회 클릭으로 폼 진입',
            meta: 'TTL · 24h · 클릭 추적 활성',
            tone: 'muted',
          },
        ],
      },
      presets: [
        {
          id: 'guest-accept',
          text: '아 그렇군요, 비즈폼으로 다시 접수할게요!',
          kind: 'guest',
          nextStateIndex: 3,
        },
      ],
      memo: {
        title: 'STATE 2 — 막기만 하지 않고 길을 연다',
        meta: 'Cowork+ · 비즈폼',
        situation:
          'BR이 비즈폼 카드를 메시지로 전송한다. 카드는 단톡방 안에서 클릭만으로 안전한 폼으로 전환된다.',
        interact: '발신자는 비즈폼 카드를 탭한다. 운영자 콘솔에는 전송·수신 로그가 남는다.',
        feel: [
          '"막기만 하는 게 아니라 대안을 주는구나"',
          'BR: "수동 안내문 복붙 안 해도 된다"',
        ],
        connect: ['Ch.3 — 비즈폼 제출 즉시 고유 추적 URL 생성 + CRM 자동 기록'],
      },
    },
    {
      index: 3,
      activeCastId: 'park-rep',
      guide: '챕터 마감 — 강민호가 비즈폼으로 진입.',
      phones: {
        guest: {
          type: 'bizform',
          headerTitle: '신규 대출 접수',
          headerSubtitle: '지엔에이 영업팀 → 우리금융캐피탈',
          meta: {
            fields: [
              { label: '고객명', value: '홍길동', auto: true },
              { label: '상품', value: '오토론 (선택)', auto: false },
              { label: '연락처', value: '010-****-1234', auto: true, masked: true },
              { label: '차종', value: '아이오닉 6', auto: false },
              { label: '대출 금액', value: '35,000,000원', auto: false },
            ],
          },
        },
      },
      workspace: {
        mode: 'chat',
        chat: {
          title: '지엔에이 영업팀',
          participants: 11,
          messages: [
            {
              id: 'ws-bizform-submitted',
              kind: 'system',
              text: '🎯 강민호 비즈폼 제출 — 추적 코드 #9872 발급, 김경화 자동 배정',
              meta: { tone: 'brand' },
            },
          ],
        },
        operatorPanel: [
          {
            id: 'p-track',
            kind: 'tracking-code',
            title: '추적 코드 발급',
            body: '제출 즉시 고유 URL이 생성되어 CRM에 연동됩니다.',
            highlight: 'wontalk.woorifcapital.com/msg/9872',
            tone: 'brand',
          },
          {
            id: 'p-assign',
            kind: 'auto-assign',
            title: '담당자 자동 배정',
            body: '김경화 (금리·대출 담당) · 처리 SLA 4시간 · 알림톡 1건 발송',
            highlight: 'ASSIGN · #9872 → 김경화',
            meta: '오후 2:18 · 평균 응답 1.4분',
            tone: 'good',
          },
          {
            id: 'p-task',
            kind: 'new-task',
            title: '신규 태스크 #9872',
            body: '홍길동 · 아이오닉 6 · 35,000,000원 · 오토론',
            meta: '상태 · 대기 → 처리중 (자동 전환됨)',
            tone: 'warn',
          },
          {
            id: 'p-crm',
            kind: 'audit-log',
            title: '기간계 CRM 자동 기록',
            body: '고객 기본정보·신청내역·접수 채널·담당자가 동시 적재됨',
            highlight: 'CRM · WFC-LOAN · 동기 완료',
            tone: 'muted',
          },
        ],
      },
      presets: [],
      memo: {
        title: 'STATE 3 — 안전한 입력 채널로의 착륙',
        meta: 'Cowork+ · 비즈폼 → CRM',
        situation:
          '비즈폼 폼이 강민호 폰에 열린다. 일부 필드는 기존 CRM 데이터로 자동 채워진다(고객명·연락처). 민감 필드는 마스킹.',
        interact: '발신자는 비즈폼 폼을 채워 제출. 운영자는 추적 코드와 자동 배정을 본다.',
        feel: ['"단톡방 그대로 안에 있는데 폼이 떴다"', '운영자: "내가 따로 옮길 필요가 없다"'],
        connect: ['Ch.3 — 제출과 동시에 #9872 추적 URL 생성 + 김경화에게 자동 배정'],
      },
    },
  ],
  onComplete: { nextChapter: 3, demoAutoAdvance: true },
};
