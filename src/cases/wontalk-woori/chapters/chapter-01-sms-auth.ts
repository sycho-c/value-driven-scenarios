import type { Chapter } from '../../_types';

export const chapter01SmsAuth: Chapter = {
  id: 1,
  act: 3,
  title: '아무나 못 들어옵니다',
  subtitle: '링크만 있던 시절은 끝났다 — 연락처 인증 + 기간계 조직도 연동',
  narration:
    '강민호는 이직 후 기존 단톡방 링크로 접속을 시도하지만 거절됩니다. BR이 안전한 본인 인증 + 조직도 연동 절차를 안내합니다.',
  stage: 'phone-workspace',
  states: [
    {
      index: 0,
      activeCastId: 'park-rep',
      guide: '강민호 모집인이 기존 방식대로 김경화 BR에게 카톡으로 연락합니다.',
      phones: {
        guest: {
          type: 'kakao-1to1',
          headerTitle: '김경화 (BR)',
          headerSubtitle: '카카오톡 · 1:1 대화',
          messages: [
            { id: 'd', kind: 'date', text: '2026년 7월 8일' },
            {
              id: 'k-1',
              kind: 'message',
              text: '김경화님, 기존 카카오 오픈톡방으로 요청할 수 없는건가요?',
              senderId: 'park-rep',
              side: 'mine',
              time: '오후 1:58',
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
              id: 'ws-pre',
              kind: 'system',
              text: '🛡️ 채널 입장은 연락처 인증 + 기간계 조직도 검증 이후에만 허용됩니다.',
              meta: { tone: 'brand' },
            },
          ],
        },
        operatorPanel: [
          {
            id: 'p-access',
            kind: 'compliance',
            title: '접근 제어 정책',
            body: '링크 기반 누구나 입장 → 본인 인증 + 조직도 검증으로 전면 전환',
            highlight: 'POLICY · access-v2 · 2026.04 시행',
            tone: 'brand',
          },
          {
            id: 'p-invite',
            kind: 'new-task',
            title: '미인증 게스트 접속 시도',
            body: '강민호 · 에이원오토 영업팀 채널 · 인증 미완료 상태',
            meta: '2026-07-08 13:58',
            tone: 'warn',
          },
        ],
      },
      presets: [
        {
          id: 'br-guides-auth',
          text: '강민호님! 예전 오픈채팅은 링크만 있으면 누구나 들어왔는데, 지금은 기간계 조직도 연동으로 바뀌었어요. 제가 WON TALK 초대 링크 발송해 드릴게요!',
          kind: 'br',
          nextStateIndex: 1,
        },
      ],
      memo: {
        title: 'STATE 0 — 익숙한 패턴이 막힌다',
        meta: '강민호 · 신규 이직자',
        situation:
          '강민호는 어제까지 같은 카톡 단톡방 링크로 들어가던 사람. 새 채널은 같은 방식이 통하지 않는다.',
        interact: '카카오톡 1:1에서 BR에게 "접속이 안 된다"고 카톡.',
        feel: [
          '"왜 안 들어가지?"',
          '청중: 링크만으로 입장 가능한 시대는 끝났다',
        ],
        connect: ['다음 STATE에서 연락처 인증 + 조직도 연동 절차가 등장'],
      },
    },
    {
      index: 1,
      activeCastId: 'park-rep',
      guide: 'BR이 인증 안내, 강민호 폰에 연락처 인증 코드 도착.',
      phones: {
        guest: {
          type: 'auth-sms',
          headerTitle: 'Cowork+ 채널 입장 인증',
          headerSubtitle: '에이원오토 영업팀 (우리금융캐피탈)',
          meta: {
            phone: '010-****-3829',
            code: '482',
            organization: '에이원오토 · 영업3팀',
          },
        },
      },
      workspace: {
        mode: 'chat',
        chat: {
          title: '에이원오토 영업팀',
          participants: 11,
          messages: [
            {
              id: 'ws-invite',
              kind: 'system',
              text: '📨 강민호에게 인증 메시지 발송됨 (010-****-3829)',
              meta: { tone: 'brand' },
            },
            {
              id: 'ws-dir',
              kind: 'system',
              text: '🔎 기간계 조직도 조회 중 — 에이원오토 · 영업3팀 매칭 시도',
              meta: { tone: 'muted' },
            },
          ],
        },
        operatorPanel: [
          {
            id: 'p-sms',
            kind: 'compliance',
            title: '본인 인증',
            body: '연락처 6자리 코드 발송 · 발송 후 5분 내 입력 필요',
            highlight: 'OTP · 5min TTL',
            tone: 'brand',
          },
          {
            id: 'p-dir',
            kind: 'audit-log',
            title: '기간계 조직도 동기',
            body: '우리금융캐피탈 IDM 연동 — 강민호 → 에이원오토 영업3팀 매칭 확인',
            highlight: 'IDM · LOOKUP OK',
            tone: 'good',
          },
        ],
      },
      presets: [
        {
          id: 'guest-enter-code',
          text: '인증 코드 482910 입력 완료',
          kind: 'guest',
          nextStateIndex: 2,
        },
      ],
      memo: {
        title: 'STATE 1 — 두 단계 검증',
        meta: 'Cowork+ · 본인 인증 + 조직도 연동',
        situation:
          '연락처 인증 후 자동으로 기간계 IDM(우리금융캐피탈) 조직도 조회. 사용자의 회사·팀 정보가 검증되어야 채널 입장이 허용된다.',
        interact: '게스트는 코드 입력. 운영자는 IDM 조회 결과를 본다.',
        feel: [
          '"내가 누군지 시스템이 안다"',
          '운영자: 새 멤버 추가에 사람 손이 안 든다',
        ],
        connect: ['Ch.2 — PII 자동 차단도 이 인증된 신분 기반으로 작동'],
      },
    },
    {
      index: 2,
      activeCastId: 'park-rep',
      guide: '인증 완료, 강민호가 그룹 채널에 입장합니다.',
      phones: {
        guest: {
          type: 'wontalk-group',
          headerTitle: '에이원오토 영업팀',
          headerSubtitle: '참여자 11명 → 12명',
          messages: [
            {
              id: 'sys-joined',
              kind: 'system',
              text: '✅ 강민호 (에이원오토 영업3팀) 채널 입장',
              meta: { tone: 'good' },
            },
            {
              id: 'br-welcome',
              kind: 'message',
              text: '강민호님 환영합니다! 신규 건은 비즈폼으로 접수해 주시면 자동 배정됩니다 🙌',
              senderId: 'kim-kyunghwa',
              side: 'other',
              time: '오후 2:02',
              isNew: true,
            },
          ],
        },
      },
      workspace: {
        mode: 'chat',
        chat: {
          title: '에이원오토 영업팀',
          participants: 12,
          messages: [
            {
              id: 'ws-joined',
              kind: 'system',
              text: '✅ 강민호 (에이원오토 영업3팀) 채널 입장 — 권한: 게스트(파트너)',
              meta: { tone: 'good' },
            },
          ],
        },
        operatorPanel: [
          {
            id: 'p-role',
            kind: 'auto-assign',
            title: '권한 자동 부여',
            body: '에이원오토 영업3팀 → 게스트(파트너) 권한 매핑 · 비즈폼/내 대화 보기 사용 가능',
            highlight: 'ROLE · partner-guest',
            tone: 'good',
          },
          {
            id: 'p-audit-join',
            kind: 'audit-log',
            title: '입장 감사 로그',
            body: '발신자 · 매칭 조직 · 인증 시각 · 권한이 동시 기록됨',
            highlight: 'LOG-ID #AU-2026-07-08-04382',
            tone: 'muted',
          },
        ],
      },
      presets: [],
      memo: {
        title: 'STATE 2 — 인증된 신분으로 등장',
        meta: 'Cowork+ · 권한 매핑',
        situation:
          '인증 완료 → 조직도 매핑 → 권한 부여 → 채널 입장. 모든 단계가 자동, 모든 단계가 감사 로그로 남는다.',
        interact: '게스트는 그냥 채팅을 시작한다. 백그라운드는 시스템이 다 처리.',
        feel: [
          '"별도 절차 없이 들어왔다"',
          '운영자: 새 파트너 사 합류도 셀프 서비스',
          '청중: 4,000명 파트너망이 이렇게 운영된다',
        ],
        connect: [
          'Ch.2 — 인증된 신분이라 PII 차단 룰의 발신자 추적이 정확',
          'Ch.4 — 동일 신분 기반으로 자동 배정',
        ],
      },
    },
  ],
  onComplete: { nextChapter: 2, demoAutoAdvance: true },
};
