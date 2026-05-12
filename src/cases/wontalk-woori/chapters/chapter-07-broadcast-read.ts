import type { Chapter } from '../../_types';

export const chapter07BroadcastRead: Chapter = {
  id: 7,
  act: 4,
  title: '4,000명 중 3,820명이 읽었습니다',
  subtitle: '알림톡 동시 발송 + 실시간 읽음 추적 + 미열람자 재알림',
  narration:
    '센터장이 금리 변경 공지를 등록합니다. 4,000명 파트너에게 동시에 알림톡이 발송되고, 누가 읽었는지 실시간으로 추적합니다.',
  stage: 'phone-workspace',
  states: [
    {
      index: 0,
      activeCastId: 'choi-cm',
      guide: '최센터장이 공지 등록. 4,000명 알림톡 동시 발송 준비.',
      phones: {
        guest: {
          type: 'wontalk-group',
          headerTitle: '에이원오토 영업팀',
          headerSubtitle: '참여자 11명',
          messages: [
            {
              id: 'sys-notice-coming',
              kind: 'system',
              text: '📢 센터장 공지 등록 중 — 4,000명 알림톡 발송 예정',
              meta: { tone: 'brand' },
            },
          ],
        },
      },
      workspace: {
        mode: 'chat',
        chat: {
          title: '전체 파트너 공지',
          participants: 4000,
          notice: {
            text: '7월 금리 변경 공지 — 전 파트너망 4,000명 동시 발송 준비 중',
          },
          messages: [
            {
              id: 'ws-prepare',
              kind: 'system',
              text: '⚙️ 알림톡 발송 큐 작성 — 대상 4,000명 / 채널 12개',
              meta: { tone: 'muted' },
            },
          ],
        },
        operatorPanel: [
          {
            id: 'p-segment',
            kind: 'new-task',
            title: '발송 세그먼트',
            body: '전 파트너망 · AG사 47개 · 영업 담당자 4,000명 · BR 12명 cc',
            highlight: 'AUDIENCE · 4,000',
            tone: 'brand',
          },
          {
            id: 'p-channel',
            kind: 'auto-assign',
            title: '발송 채널',
            body: '카카오 비즈메시지 알림톡 (1차) + Cowork+ in-app 푸시 (2차)',
            highlight: 'CHANNEL · alimtalk + push',
            tone: 'good',
          },
        ],
      },
      presets: [
        {
          id: 'admin-send',
          text: '금리 변경 공지 등록 → 4,000명 알림톡 동시 발송',
          kind: 'admin',
          nextStateIndex: 1,
        },
      ],
      memo: {
        title: 'STATE 0 — 4,000명 분기 빅뱅',
        meta: '최센터장 · 관리자 시점',
        situation:
          '분기마다 한 번 있는 금리 정책 변경. 누락 없이 전 파트너망에 즉시 전달되어야 한다.',
        interact: '관리자가 공지를 등록. 시스템이 발송 큐를 자동 생성.',
        feel: [
          '"한 번 발송 누락 = 분기 매출 직격"',
          '청중: 4,000명에게 동시 도달 가능한 채널은 사내에 거의 없다',
        ],
        connect: ['다음 STATE에서 실시간 읽음 추적이 시작됨'],
      },
    },
    {
      index: 1,
      activeCastId: 'park-rep',
      guide: '발송 완료. 강민호 폰에 알림톡 도착, 읽음 카운트 실시간 증가.',
      phones: {
        guest: {
          type: 'wontalk-group',
          headerTitle: '에이원오토 영업팀',
          headerSubtitle: '📢 분기 금리 변경 공지 (NEW)',
          messages: [
            {
              id: 'notice-msg',
              kind: 'message',
              text: '📢 [공지] 7월 금리 변경 — 자동차금융 기준금리 0.25%p 인하. 7/15부터 신규 접수 건 적용.',
              senderId: 'choi-cm',
              side: 'other',
              time: '오후 4:00',
              isNew: true,
              meta: { urgent: true },
            },
            {
              id: 'guest-read',
              kind: 'message',
              text: '확인했습니다 ✅',
              senderId: 'park-rep',
              side: 'mine',
              time: '오후 4:01',
              isNew: true,
            },
          ],
        },
      },
      workspace: {
        mode: 'chat',
        chat: {
          title: '전체 파트너 공지',
          participants: 4000,
          notice: {
            text: '7월 금리 변경 공지 — 발송 완료 · 실시간 읽음 추적 중',
            readCount: 3820,
            totalCount: 4000,
          },
          messages: [
            {
              id: 'ws-sent',
              kind: 'system',
              text: '✅ 알림톡 4,000명 동시 발송 완료 (소요 1.8초)',
              meta: { tone: 'good' },
            },
            {
              id: 'ws-counting',
              kind: 'system',
              text: '📈 실시간 읽음 카운트 — 1,240 → 2,810 → 3,640 → 3,820명',
              meta: { tone: 'brand' },
            },
          ],
        },
        operatorPanel: [
          {
            id: 'p-read',
            kind: 'tracking-code',
            title: '실시간 읽음률',
            body: '발송 후 8분 만에 95.5%(3,820명) 도달. 분기 평균 대비 +52%p.',
            highlight: '95.5% · 3,820 / 4,000',
            tone: 'good',
            meta: 'Cowork+ 사내 평균: 분기 전 43% → 현재 95.5%',
          },
          {
            id: 'p-unread',
            kind: 'compliance',
            title: '미열람 180명',
            body: 'AG사별·BR별로 분포 자동 분석. 24시간 후 자동 재알림 + 전화 콜백 예약.',
            highlight: 'UNREAD · 180 (4.5%)',
            tone: 'warn',
          },
          {
            id: 'p-impact',
            kind: 'new-task',
            title: '도달율 임팩트',
            body: '95.5% 도달 = 분기 매출 4,000건 중 평균 3,820건 즉시 반영 가능',
            highlight: '──억원 추정 영향',
            tone: 'brand',
            meta: '측정 기준 곧 공개',
          },
        ],
      },
      presets: [
        {
          id: 'admin-reach-unread',
          text: '미열람 180명 자동 재알림 예약',
          kind: 'admin',
          nextStateIndex: 2,
        },
      ],
      memo: {
        title: 'STATE 1 — 도달율이 수치로 보인다',
        meta: 'Cowork+ · 읽음 추적',
        situation:
          '4,000명 동시 발송 후 8분 만에 95.5% 도달. 누가 읽었고 누가 안 읽었는지 명확.',
        interact: '관리자는 콘솔의 95.5% 게이지를 본다. 게스트는 알림톡으로 즉시 인지.',
        feel: [
          '"본부장님께 숫자로 보고할 수 있다"',
          '청중: "분기 매출 직결 메시지의 도달율을 측정한다"',
        ],
        connect: ['Ch.8 — 같은 데이터가 AG/BR 성과 대시보드로 확장'],
      },
    },
    {
      index: 2,
      activeCastId: 'choi-cm',
      guide: '관리자가 미열람 180명에 대해 자동 재알림 + 콜백 예약. 챕터 마감.',
      phones: {
        guest: {
          type: 'wontalk-group',
          headerTitle: '에이원오토 영업팀',
          headerSubtitle: '참여자 11명',
          messages: [
            {
              id: 'notice-msg-pin',
              kind: 'message',
              text: '📢 [공지] 7월 금리 변경 — 자동차금융 기준금리 0.25%p 인하.',
              senderId: 'choi-cm',
              side: 'other',
              time: '오후 4:00',
              meta: { urgent: false },
            },
          ],
        },
      },
      workspace: {
        mode: 'chat',
        chat: {
          title: '전체 파트너 공지',
          participants: 4000,
          notice: {
            text: '7월 금리 변경 공지 — 미열람 180명 재알림 예약 완료',
            readCount: 3820,
            totalCount: 4000,
          },
          messages: [
            {
              id: 'ws-followup',
              kind: 'system',
              text: '🔁 미열람 180명 — 24시간 후 알림톡 재발송 + 콜백 큐 등록',
              meta: { tone: 'brand' },
            },
          ],
        },
        operatorPanel: [
          {
            id: 'p-followup',
            kind: 'auto-assign',
            title: '자동 후속 조치',
            body: '미열람자 → BR별로 콜백 큐 자동 분배 + 24h 후 재알림 트리거',
            highlight: 'FOLLOWUP · automated',
            tone: 'brand',
          },
          {
            id: 'p-saving',
            kind: 'new-task',
            title: '운영 시간 절감',
            body: '전화 일일이 돌리기 → 시스템 자동 처리로 BR 12명 × 2시간 절감',
            highlight: '──시간 절감 / 회차',
            tone: 'good',
            meta: '측정 기준 곧 공개',
          },
        ],
      },
      presets: [],
      memo: {
        title: 'STATE 2 — 도달 → 후속까지 자동',
        meta: 'Cowork+ · 폐쇄 루프',
        situation:
          '발송으로 끝나지 않고, 미열람자에게 자동으로 재알림과 콜백이 예약된다. 사람이 챙길 일이 없다.',
        interact: '관리자는 한 번의 클릭으로 후속 조치까지 위임.',
        feel: [
          '"빠뜨리는 사람이 없다는 확신"',
          '청중: "이게 바로 운영자에게 데이터를 돌려준다는 의미"',
        ],
        connect: ['Ch.8 — AG/BR 단위로 도달율·후속률 비교 분석'],
      },
    },
  ],
  onComplete: { nextChapter: 8, demoAutoAdvance: true },
};
