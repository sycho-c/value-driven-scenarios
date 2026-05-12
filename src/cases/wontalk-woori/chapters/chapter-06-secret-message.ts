import type { Chapter } from '../../_types';

export const chapter06SecretMessage: Chapter = {
  id: 6,
  act: 3,
  title: '단체방 안에서, 아무도 모르게',
  subtitle: '민감 정보는 같은 방 안에서도 1:1로 — 비밀 메시지 + 종단간 암호화',
  narration:
    '수수료율, 우대 금리, 인센티브 같은 민감 정보를 단체방에서 공유할 수는 없습니다. Cowork+의 비밀 메시지는 같은 채널 안에서도 1:1로 암호화 전달됩니다.',
  stage: 'phone-workspace',
  states: [
    {
      index: 0,
      activeCastId: 'park-rep',
      guide: '강민호가 단체방에서 본인 우대 금리를 물어봅니다.',
      phones: {
        guest: {
          type: 'wontalk-group',
          headerTitle: '에이원오토 영업팀',
          headerSubtitle: '참여자 11명',
          messages: [
            {
              id: 'ask-rate',
              kind: 'message',
              text: '김경화님, 이번달 저한테만 적용되는 우대 금리가 있나요?',
              senderId: 'park-rep',
              side: 'mine',
              time: '오후 3:05',
              isNew: true,
            },
            {
              id: 'br-suggest',
              kind: 'message',
              text: '네! 단체방에서 말씀드리기 어려우니 비밀 메시지로 바로 보내드릴게요 😊',
              senderId: 'kim-kyunghwa',
              side: 'other',
              time: '오후 3:06',
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
              id: 'ws-sensitive',
              kind: 'system',
              text: '⚠️ 단체방 발화 분석 — 금리/수수료 관련 키워드 감지',
              meta: { tone: 'warn' },
            },
          ],
        },
        operatorPanel: [
          {
            id: 'p-policy',
            kind: 'compliance',
            title: '민감 정보 공유 정책',
            body: '금리·수수료·인센티브·계약 조건 — 단체방 공유 금지, 비밀 메시지 권고',
            highlight: 'POLICY · sensitive-v2',
            tone: 'warn',
          },
          {
            id: 'p-detect',
            kind: 'audit-log',
            title: '키워드 감지',
            body: '"우대 금리" 키워드 자동 감지 → BR에게 비밀 메시지 안내 권고',
            highlight: 'KEYWORD · 우대 금리',
            tone: 'muted',
          },
        ],
      },
      presets: [
        {
          id: 'br-send-secret',
          text: '비밀 메시지 전송 — 강민호님께만 [2.15% 분기 우대 금리] 안내',
          kind: 'br',
          nextStateIndex: 1,
        },
      ],
      memo: {
        title: 'STATE 0 — 민감 정보의 단톡방 노출 위험',
        meta: 'Cowork+ · 발화 분석',
        situation:
          '단체방에 11명이 있는 상황에서 우대 금리가 공유되면 다른 파트너의 형평성 이슈가 발생.',
        interact: '게스트는 평소처럼 물어보고, 시스템이 자동으로 BR에게 비밀 메시지 사용 권고.',
        feel: [
          '운영자: "BR이 까먹어도 시스템이 막아준다"',
          '청중: 컴플라이언스를 사람 의지에 맡기지 않는다',
        ],
        connect: ['Ch.2의 PII 차단과 같은 원리 — 정책의 코드화'],
      },
    },
    {
      index: 1,
      activeCastId: 'park-rep',
      guide: 'BR이 강민호에게만 비밀 메시지 발송. 단체방 안에 잠긴 버블이 등장.',
      phones: {
        guest: {
          type: 'wontalk-group',
          headerTitle: '에이원오토 영업팀',
          headerSubtitle: '참여자 11명',
          messages: [
            {
              id: 'br-suggest',
              kind: 'message',
              text: '단체방에서 말씀드리기 어려우니 비밀 메시지로 보내드렸어요 😊',
              senderId: 'kim-kyunghwa',
              side: 'other',
              time: '오후 3:06',
            },
            {
              id: 'secret-rate',
              kind: 'locked',
              text: '강민호님, 이번 분기 우대 수수료율 [2.15%] 특별 적용 안내드립니다. 7월 31일까지 신청 시 자동 반영됩니다.',
              senderId: 'kim-kyunghwa',
              time: '오후 3:07',
              isNew: true,
              meta: {
                recipientId: 'park-rep',
                recipientLabel: '강민호',
                defaultRevealed: false,
              },
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
              id: 'ws-secret-sent',
              kind: 'system',
              text: '🔒 비밀 메시지 발송 — 김경화 → 강민호 (e2e 암호화)',
              meta: { tone: 'brand' },
            },
            {
              id: 'ws-others',
              kind: 'system',
              text: '👁️ 다른 참여자 10명에게는 잠긴 버블로만 표시됨',
              meta: { tone: 'muted' },
            },
          ],
        },
        operatorPanel: [
          {
            id: 'p-e2e',
            kind: 'compliance',
            title: '종단간 암호화',
            body: '발신자 ↔ 수신자 직접 채널. 서버는 키 없이 암호문만 보관.',
            highlight: 'E2E · AES-256',
            tone: 'brand',
          },
          {
            id: 'p-audit',
            kind: 'audit-log',
            title: '비밀 메시지 감사 로그',
            body: '발신·수신·발송 시각만 기록. 본문은 키 없이 조회 불가.',
            highlight: 'LOG · meta-only',
            tone: 'good',
          },
          {
            id: 'p-others',
            kind: 'new-task',
            title: '다른 참여자 시점',
            body: '10명에게는 "🔒 비밀 메시지" 잠긴 버블만 표시. 본문 추정 불가.',
            highlight: 'OTHERS · 10 locked',
            tone: 'muted',
          },
        ],
      },
      presets: [
        {
          id: 'guest-tap',
          text: '비밀 메시지 탭하여 확인 (강민호 시점)',
          kind: 'guest',
          nextStateIndex: 2,
        },
      ],
      memo: {
        title: 'STATE 1 — 같은 방, 다른 시야',
        meta: 'Cowork+ · 비밀 메시지',
        situation:
          '발신자 → 수신자만 본문 해독 가능. 같은 단체방의 다른 10명은 "잠긴 버블"만 본다.',
        interact: 'BR은 비밀 메시지 발송. 게스트(강민호)는 자기 버블에 우대 금리 보임. 다른 파트너는 잠긴 상태.',
        feel: [
          '운영자: "관리자도 못 본다는 사실이 신뢰를 만든다"',
          '청중: "정보가 새지 않는다는 확신"',
        ],
        connect: ['Ch.2 PII 차단 + Ch.6 암호화 = 컴플라이언스 풀세트'],
      },
    },
    {
      index: 2,
      activeCastId: 'park-rep',
      guide: '강민호가 잠긴 버블을 탭하여 내용을 확인.',
      phones: {
        guest: {
          type: 'wontalk-group',
          headerTitle: '에이원오토 영업팀',
          headerSubtitle: '참여자 11명',
          messages: [
            {
              id: 'br-suggest',
              kind: 'message',
              text: '단체방에서 말씀드리기 어려우니 비밀 메시지로 보내드렸어요 😊',
              senderId: 'kim-kyunghwa',
              side: 'other',
              time: '오후 3:06',
            },
            {
              id: 'secret-rate',
              kind: 'locked',
              text: '강민호님, 이번 분기 우대 수수료율 [2.15%] 특별 적용 안내드립니다. 7월 31일까지 신청 시 자동 반영됩니다.',
              senderId: 'kim-kyunghwa',
              time: '오후 3:07',
              meta: {
                recipientId: 'park-rep',
                recipientLabel: '강민호',
                defaultRevealed: true,
              },
            },
            {
              id: 'guest-ok',
              kind: 'message',
              text: '확인했습니다, 감사합니다 🙏',
              senderId: 'park-rep',
              side: 'mine',
              time: '오후 3:08',
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
              id: 'ws-read',
              kind: 'system',
              text: '✅ 강민호 비밀 메시지 열람 확인 (메타데이터만 기록)',
              meta: { tone: 'good' },
            },
          ],
        },
        operatorPanel: [
          {
            id: 'p-trust',
            kind: 'compliance',
            title: '컴플라이언스 신뢰성',
            body: '단톡방 운영 = 빠르고 친숙함 / 비밀 메시지 = 안전함. 두 가지가 한 채널에 공존.',
            highlight: 'TRUST · same channel, dual mode',
            tone: 'brand',
          },
        ],
      },
      presets: [],
      memo: {
        title: 'STATE 2 — 같은 채널, 두 가지 모드',
        meta: 'Cowork+ · 통합 정체성',
        situation:
          '게스트는 단체방을 떠나지 않고 같은 채널 안에서 민감 정보를 받는다. 별도 1:1 채팅방을 만들지 않아도 됨.',
        interact: '잠긴 버블을 탭하여 본문 확인. UI는 단체방 그대로.',
        feel: [
          '"운영 편의성과 보안이 양립한다"',
          '청중: "별도 채널 만들 필요 없음"',
        ],
        connect: ['Ch.7 — 같은 채널에 4,000명 공지도 가능'],
      },
    },
  ],
  onComplete: { nextChapter: 7, demoAutoAdvance: true },
};
