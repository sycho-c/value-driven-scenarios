import type { Chapter } from '../../_types';

export const chapter04AutoAssign: Chapter = {
  id: 4,
  act: 3,
  title: '담당자는 기다리지 않아도 됩니다',
  subtitle: '비즈폼 접수 즉시 시스템이 담당 BR을 자동 배정하고 알림톡까지 발송',
  narration:
    '"누가 담당이지?"라는 질문이 사라집니다. 비즈폼 제출 즉시 라우팅 룰이 작동해 담당 BR이 결정되고 알림톡이 즉시 발송됩니다.',
  stage: 'phone-workspace',
  states: [
    {
      index: 0,
      activeCastId: 'kim-kyunghwa',
      guide: '시스템이 김경화 BR을 #9872 건 담당자로 자동 배정. 알림톡이 1초 내 발송.',
      phones: {
        guest: {
          type: 'wontalk-group',
          headerTitle: '지엔에이 영업팀',
          headerSubtitle: '참여자 11명',
          messages: [
            {
              id: 'sys-assigned',
              kind: 'system',
              text: '🎯 #9872 담당자 자동 배정 — 김경화 (금리·대출 담당)',
              meta: { tone: 'brand' },
            },
            {
              id: 'br-grab',
              kind: 'message',
              text: '강민호님, 방금 보내주신 건 제가 자동 배정받았어요. 바로 처리 시작할게요!',
              senderId: 'kim-kyunghwa',
              side: 'other',
              time: '오후 2:19',
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
              id: 'ws-rule',
              kind: 'system',
              text: '⚙️ 라우팅 룰 평가 — 자동차금융 · 신규접수 · 우선순위 high',
              meta: { tone: 'muted' },
            },
            {
              id: 'ws-assigned',
              kind: 'system',
              text: '🎯 #9872 자동 배정 → 김경화 (현재 처리 가능 건 2/8)',
              meta: { tone: 'brand' },
            },
            {
              id: 'ws-alimtalk',
              kind: 'system',
              text: '📲 김경화에게 알림톡 발송 완료 (700ms)',
              meta: { tone: 'good' },
            },
          ],
        },
        operatorPanel: [
          {
            id: 'p-rule',
            kind: 'auto-assign',
            title: '라우팅 룰 적용',
            body: '상품 카테고리(자동차금융) · 우선순위(high) · BR 현재 부하 기반 점수 계산',
            highlight: 'RULE · auto-loan-balance-v3',
            tone: 'brand',
          },
          {
            id: 'p-load',
            kind: 'auto-assign',
            title: '담당자 부하 균형',
            body: '김경화 2/8 · 이과장 6/8 · 박효성 4/8 → 김경화 최우선 후보',
            highlight: 'LOAD · KKH 25%',
            tone: 'good',
          },
          {
            id: 'p-sla',
            kind: 'new-task',
            title: '처리 SLA 자동 시작',
            body: '응답 SLA 30분 · 처리 SLA 4시간. 초과 시 자동 에스컬레이션',
            highlight: 'SLA · resp 30m / proc 4h',
            tone: 'warn',
          },
          {
            id: 'p-alimtalk',
            kind: 'audit-log',
            title: '알림톡 발송',
            body: '카카오 비즈메시지 — 김경화에게 #9872 배정 알림 전송 (700ms 도착)',
            highlight: 'NOTIF · DELIVERED',
            tone: 'muted',
          },
        ],
      },
      presets: [
        {
          id: 'guest-impressed',
          text: '오, 빠르네요! 예전엔 방에 올려도 누가 담당인지 몰라서 한참 기다렸는데.',
          kind: 'guest',
          nextStateIndex: 1,
        },
      ],
      memo: {
        title: 'STATE 0 — 1초 안에 끝나는 라우팅',
        meta: 'Cowork+ · 자동 배정 + 알림톡',
        situation:
          '비즈폼 제출 → 라우팅 룰 평가 → 담당자 자동 배정 → 알림톡 발송이 1초 내 종료.',
        interact: 'BR 김경화는 알림톡을 받고 바로 메시지. 게스트는 즉시 응답을 받음.',
        feel: [
          '"누가 담당이지?"가 사라짐',
          '운영자: BR 부하를 시스템이 자동 분배',
          '청중: 4,000명 채널에서도 매 건 즉시 배정',
        ],
        connect: ['Ch.5 — 게스트는 자기 건의 진행을 직접 조회 가능'],
      },
    },
    {
      index: 1,
      activeCastId: 'park-rep',
      guide: '챕터 마감 — 강민호가 즉각적인 응답에 놀라움.',
      phones: {
        guest: {
          type: 'wontalk-group',
          headerTitle: '지엔에이 영업팀',
          headerSubtitle: '참여자 11명',
          messages: [
            {
              id: 'br-grab2',
              kind: 'message',
              text: '강민호님, 방금 보내주신 건 제가 자동 배정받았어요. 바로 처리 시작할게요!',
              senderId: 'kim-kyunghwa',
              side: 'other',
              time: '오후 2:19',
            },
            {
              id: 'guest-reply',
              kind: 'message',
              text: '오, 빠르네요! 예전엔 방에 올려도 누가 담당인지 몰라서 한참 기다렸는데.',
              senderId: 'park-rep',
              side: 'mine',
              time: '오후 2:19',
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
              id: 'ws-stat',
              kind: 'system',
              text: '📊 #9872 응답 소요 1.4분 (목표 30분 대비 21배 빠름)',
              meta: { tone: 'good' },
            },
          ],
        },
        operatorPanel: [
          {
            id: 'p-impact',
            kind: 'new-task',
            title: '응답 효율',
            body: '#9872 응답 소요 1.4분 — 전 분기 평균 38분 대비 27배 단축',
            highlight: 'RESP · 1.4m / 38m',
            tone: 'good',
          },
        ],
      },
      presets: [],
      memo: {
        title: 'STATE 1 — 정량 가치 첫 등장',
        meta: 'Cowork+ · ROI 초고',
        situation:
          '단일 건의 응답 효율이 즉시 측정됨. 분기 평균과 자동 비교되어 ROI 자료로 적재.',
        interact: '운영자 콘솔에 정량 비교 카드가 자동 등장.',
        feel: [
          '청중: 비교 가능한 숫자가 나온다',
          '"이게 우리 회사 KPI에 어떻게 나타날까?"',
        ],
        connect: ['Ch.8 — 같은 메트릭이 대시보드의 BR별 비교로 확장'],
      },
    },
  ],
  onComplete: { nextChapter: 5, demoAutoAdvance: true },
};
