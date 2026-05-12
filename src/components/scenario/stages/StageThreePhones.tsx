import type { ReactNode } from 'react';
import type { CastMember, ChapterStateNode } from '@/cases/_types';
import { PhoneFrame } from '../phones/PhoneFrame';
import { PhoneScreenView } from '../phones/PhoneScreenView';
import { cn } from '@/lib/cn';
import styles from './StageThreePhones.module.css';

interface StageThreePhonesProps {
  state: ChapterStateNode;
  cast: CastMember[];
  actions?: ReactNode;
}

const ROLE_LABEL: Record<string, string> = {
  guest: '거래처',
  br: '담당 BR',
  admin: '영업팀장',
  other: '관계자',
};

function computeActiveSet(state: ChapterStateNode): Set<string> {
  const active = new Set<string>();
  if (state.activeCastIds && state.activeCastIds.length > 0) {
    state.activeCastIds.forEach((id) => active.add(id));
    return active;
  }
  if (state.activeCastId) active.add(state.activeCastId);

  const entries = Object.entries(state.phones);
  const pairs: Array<[string, string]> = [];

  // Rule 1: 1:1 채팅 — 한쪽 폰의 메시지 senderId가 다른 폰 슬롯이면 페어
  for (const [slotId, screen] of entries) {
    if (screen.type !== 'kakao-1to1') continue;
    for (const msg of screen.messages ?? []) {
      const sender = msg.senderId;
      if (sender && sender !== slotId && state.phones[sender]) {
        pairs.push([slotId, sender]);
      }
    }
  }

  // Rule 2: 같은 단톡방을 보는 폰끼리 페어 (kakao-group / wontalk-group)
  const isGroupScreen = (t: string) => t === 'kakao-group' || t === 'wontalk-group';
  for (let i = 0; i < entries.length; i++) {
    for (let j = i + 1; j < entries.length; j++) {
      const [aId, aScreen] = entries[i];
      const [bId, bScreen] = entries[j];
      if (
        isGroupScreen(aScreen.type) &&
        isGroupScreen(bScreen.type) &&
        aScreen.headerTitle &&
        bScreen.headerTitle &&
        aScreen.headerTitle === bScreen.headerTitle
      ) {
        pairs.push([aId, bId]);
      }
    }
  }

  for (const [a, b] of pairs) {
    if (active.has(a)) active.add(b);
    if (active.has(b)) active.add(a);
  }
  return active;
}

export function StageThreePhones({ state, cast, actions }: StageThreePhonesProps) {
  const castById = Object.fromEntries(cast.map((c) => [c.id, c]));
  const slots = Object.entries(state.phones);
  const activeSet = computeActiveSet(state);

  return (
    <div className={styles.stage}>
      <div className={styles.phoneRow}>
        {slots.map(([slotId, screen]) => {
          const member = castById[slotId];
          const active = activeSet.has(slotId);
          return (
            <div
              key={slotId}
              className={cn(styles.phoneCell, active && styles.phoneCellActive)}
            >
              <div className={styles.phoneLabel}>
                <span className={styles.phoneRoleBadge}>
                  {member ? ROLE_LABEL[member.role] ?? '시점' : '시점'}
                </span>
                <span>{member?.label ?? slotId}</span>
              </div>
              <PhoneFrame compact inactive={!active}>
                <PhoneScreenView
                  screen={screen}
                  castById={castById}
                  ownerCastId={slotId}
                />
              </PhoneFrame>
            </div>
          );
        })}
      </div>
      {state.guide && (
        <aside className={styles.guide}>
          <span className={styles.guideLabel}>이 화면에서</span>
          <span>{state.guide}</span>
        </aside>
      )}
      {actions && <div className={styles.actionsWrap}>{actions}</div>}
    </div>
  );
}
