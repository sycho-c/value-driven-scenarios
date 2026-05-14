import type { ReactNode } from 'react';
import type { CastMember, ChapterStateNode, PhoneScreen } from '@/cases/_types';
import { PhoneFrame } from '../phones/PhoneFrame';
import { PhoneScreenView } from '../phones/PhoneScreenView';
import { PhoneStatusFrame } from '../phones/PhoneStatusFrame';
import { PhoneChannelHeader } from '../phones/PhoneChannelHeader';
import { ResultCardGallery } from './ResultCardGallery';
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

  const phones = state.phones ?? {};
  const entries = Object.entries(phones);
  const pairs: Array<[string, string]> = [];

  for (const [slotId, screen] of entries) {
    if (screen.type !== 'kakao-1to1') continue;
    for (const msg of screen.messages ?? []) {
      const sender = msg.senderId;
      if (sender && sender !== slotId && phones[sender]) {
        pairs.push([slotId, sender]);
      }
    }
  }

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

function isChannelSlot(slotId: string, screen: PhoneScreen): boolean {
  return !!screen.channelLabel || slotId.startsWith('lane-');
}

export function StageThreePhones({ state, cast, actions }: StageThreePhonesProps) {
  const castById = Object.fromEntries(cast.map((c) => [c.id, c]));
  const slots = Object.entries(state.phones ?? {});
  const activeSet = computeActiveSet(state);
  const useWhiteBg = slots.some(([slotId, screen]) => isChannelSlot(slotId, screen));

  // Gallery mode replaces phones entirely.
  if (state.galleryCards && state.galleryCards.length > 0) {
    return (
      <div className={styles.stage}>
        <div className={styles.phoneRow} style={{ width: '100%' }}>
          <ResultCardGallery cards={state.galleryCards} footer={state.galleryFooter} />
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

  return (
    <div className={styles.stage}>
      <div className={cn(styles.phoneRow, useWhiteBg && styles.stageWhiteBg)}>
        {slots.map(([slotId, screen]) => {
          const isChannel = isChannelSlot(slotId, screen);
          const member = castById[slotId];
          const active = activeSet.has(slotId) || isChannel;

          const labelNode = isChannel ? (
            <div className={styles.channelLabel}>
              <span className={styles.channelTitle}>{screen.channelLabel}</span>
              {screen.channelProduct && (
                <span className={styles.channelProduct}>{screen.channelProduct}</span>
              )}
            </div>
          ) : (
            <div className={styles.phoneLabel}>
              <span className={styles.phoneRoleBadge}>
                {member ? ROLE_LABEL[member.role] ?? '시점' : '시점'}
              </span>
              <span>{member?.label ?? slotId}</span>
            </div>
          );

          const phoneHeaderTitle = screen.headerTitle ?? screen.channelLabel;
          const phoneHeaderSub = screen.headerSubtitle ?? screen.channelProduct;
          const phoneBody = (
            <PhoneFrame compact inactive={!active}>
              {phoneHeaderTitle && screen.headerVariant && (
                <PhoneChannelHeader
                  lane={phoneHeaderTitle}
                  product={phoneHeaderSub}
                  variant={screen.headerVariant}
                />
              )}
              <PhoneScreenView screen={screen} castById={castById} ownerCastId={slotId} />
            </PhoneFrame>
          );

          const frameTone = state.phoneFrame?.tone;

          return (
            <div
              key={slotId}
              className={cn(styles.phoneCell, active && styles.phoneCellActive)}
            >
              {labelNode}
              {isChannel && frameTone ? (
                <PhoneStatusFrame tone={frameTone} topBanner={state.phoneFrame?.topBanner}>
                  {phoneBody}
                </PhoneStatusFrame>
              ) : (
                phoneBody
              )}
              {screen.resultBadge && (
                <span className={cn(styles.resultBadge, styles[screen.resultBadge.tone])}>
                  {screen.resultBadge.text}
                </span>
              )}
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
