import type { Chapter } from '../../_types';

export const chapter03TrackingUrl: Chapter = {
  id: 3,
  act: 3,
  title: '3초 만에 추적 코드가 생겼습니다',
  subtitle: '제출 즉시 고유 URL이 생성되고 기간계 CRM에 자동 적재된다',
  narration:
    '강민호가 비즈폼을 제출하자마자 고유 추적 URL이 발급되고, 우리금융캐피탈 기간계 CRM에 자동 기록됩니다.',
  stage: 'phone-workspace',
  states: [
    {
      index: 0,
      activeCastId: 'park-rep',
      guide: '비즈폼 제출 직후 — 폰에 추적 URL 카드 도착.',
      phones: {
        guest: {
          type: 'wontalk-group',
          headerTitle: '에이원오토 영업팀',
          headerSubtitle: '참여자 11명',
          messages: [
            {
              id: 'sys-submitted',
              kind: 'system',
              text: '🎯 비즈폼 제출 완료 — 추적 코드 #9872 발급됨',
              meta: { tone: 'brand' },
            },
            {
              id: 'url-card-9872',
              kind: 'url-card',
              text: '신규 대출 접수 #9872',
              meta: {
                url: 'wontalk.woorifcapital.com/msg/9872',
                badge: 'CRM 자동 기록',
                metaText: '발급 시각 14:18:22 · 소요 2.7초',
              },
              isNew: true,
            },
          ],
        },
      },
      workspace: {
        mode: 'chat',
        chat: {
          title: '에이원오토 영업팀',
          participants: 11,
          messages: [
            {
              id: 'ws-submit',
              kind: 'system',
              text: '📥 강민호 비즈폼 #9872 접수 — 고유 URL 발급, CRM 동기 중',
              meta: { tone: 'brand' },
            },
            {
              id: 'ws-crm',
              kind: 'system',
              text: '✅ 기간계 CRM 적재 완료 (WFC-LOAN · sync 2.7s)',
              meta: { tone: 'good' },
            },
          ],
        },
        operatorPanel: [
          {
            id: 'p-url',
            kind: 'tracking-code',
            title: '고유 추적 URL',
            body: '제출 즉시 발급. 외부 공유·문자 전송·CRM 링크 모두 같은 URL.',
            highlight: 'wontalk.woorifcapital.com/msg/9872',
            tone: 'brand',
          },
          {
            id: 'p-crm-detail',
            kind: 'audit-log',
            title: 'CRM 적재 상세',
            body: '고객 기본정보·접수 채널·발신자·시각·첨부 — 동시 1회 적재',
            highlight: 'CRM · sync 2.7s',
            tone: 'good',
          },
          {
            id: 'p-saving',
            kind: 'compliance',
            title: '이중 입력 제로',
            body: '비즈폼 → CRM 자동 동기로 BR이 별도 시스템에 재입력할 필요 없음',
            highlight: 'MANUAL · 0건',
            tone: 'muted',
          },
        ],
      },
      presets: [
        {
          id: 'guest-amazed',
          text: '와, 제출하자마자 고유 URL이 생겼어요! 이게 CRM에 자동으로 기록되는 거죠?',
          kind: 'guest',
          nextStateIndex: 1,
        },
      ],
      memo: {
        title: 'STATE 0 — 3초 만의 자동화',
        meta: 'Cowork+ · 추적 URL + CRM 동기',
        situation:
          '비즈폼 제출 시 즉시 백그라운드에서 ① 추적 URL 발급 ② 기간계 CRM 자동 적재가 동시에 일어남.',
        interact: '게스트는 폰에서 URL 카드를 확인. 운영자는 CRM 적재 결과를 본다.',
        feel: [
          '"종이 결재라면 일주일 걸리던 게 3초"',
          '운영자: BR이 따로 옮길 필요 없어 휴먼 에러 0',
        ],
        connect: ['Ch.4 — 같은 추적 URL로 담당자 자동 배정 + 알림톡 발송'],
      },
    },
    {
      index: 1,
      activeCastId: 'kim-kyunghwa',
      guide: 'BR이 즉시 확인 메시지를 보냅니다.',
      phones: {
        guest: {
          type: 'wontalk-group',
          headerTitle: '에이원오토 영업팀',
          headerSubtitle: '참여자 11명',
          messages: [
            {
              id: 'url-card-9872',
              kind: 'url-card',
              text: '신규 대출 접수 #9872',
              meta: {
                url: 'wontalk.woorifcapital.com/msg/9872',
                badge: 'CRM 자동 기록',
                metaText: '발급 시각 14:18:22 · 소요 2.7초',
              },
            },
            {
              id: 'br-confirm',
              kind: 'message',
              text: '맞아요! 추적 코드는 BR/AG/고객 모두가 같은 URL로 진행 상황을 보실 수 있습니다 👍',
              senderId: 'kim-kyunghwa',
              side: 'other',
              time: '오후 2:18',
              isNew: true,
            },
          ],
        },
      },
      workspace: {
        mode: 'chat',
        chat: {
          title: '에이원오토 영업팀',
          participants: 11,
          messages: [
            {
              id: 'ws-br',
              kind: 'message',
              text: '맞아요! 추적 코드는 모두가 같은 URL로 봅니다.',
              senderId: 'kim-kyunghwa',
              time: '오후 2:18',
            },
          ],
        },
        operatorPanel: [
          {
            id: 'p-share',
            kind: 'tracking-code',
            title: 'URL 공유 권한',
            body: '발신자 + 담당 BR + 관리자가 같은 URL 접근 — 외부 전달 시 토큰 만료 7일',
            highlight: 'ACL · 3 roles',
            tone: 'brand',
          },
        ],
      },
      presets: [],
      memo: {
        title: 'STATE 1 — 같은 URL, 같은 진실',
        meta: 'Cowork+ · 단일 진실원',
        situation:
          'BR, 파트너, 관리자가 같은 URL로 같은 데이터를 본다. "어떻게 됐어요?"가 사라지는 메커니즘의 첫 단계.',
        interact: 'BR이 즉시 확인. 게스트는 URL을 자기 회사에 공유 가능.',
        feel: ['"엑셀 시트 복붙 시대 종료"', '청중: 단일 진실원(single source of truth)'],
        connect: ['Ch.5 — "내 대화 보기"가 이 URL을 기반으로 작동'],
      },
    },
  ],
  onComplete: { nextChapter: 4, demoAutoAdvance: true },
};
