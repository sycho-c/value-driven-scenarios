import type { ReactNode } from 'react';
import type { CastMember, ChapterStateNode } from '@/cases/_types';
import { PhoneFrame } from '../phones/PhoneFrame';
import { PhoneScreenView } from '../phones/PhoneScreenView';
import { Workspace } from '../workspace/Workspace';
import { cn } from '@/lib/cn';
import styles from './StagePhoneWorkspace.module.css';

interface StagePhoneWorkspaceProps {
  state: ChapterStateNode;
  cast: CastMember[];
  actions?: ReactNode;
  phoneSide?: 'left' | 'right';
}

export function StagePhoneWorkspace({
  state,
  cast,
  actions,
  phoneSide = 'right',
}: StagePhoneWorkspaceProps) {
  const castById = Object.fromEntries(cast.map((c) => [c.id, c]));
  const phones = state.phones ?? {};
  const guestScreen = phones.guest;
  const guestMember = state.activeCastId ? castById[state.activeCastId] : null;

  const phoneColumn = (
    <div className={styles.phoneColumn}>
      <PhoneFrame compact label={guestMember?.label ?? '게스트'} badge="게스트">
        {guestScreen ? (
          <PhoneScreenView
            screen={guestScreen}
            castById={castById}
            ownerCastId={state.activeCastId}
          />
        ) : null}
      </PhoneFrame>
      {state.guide && (
        <div className={styles.guide}>
          <span className={styles.guideLabel}>이 화면에서</span>
          {state.guide}
        </div>
      )}
    </div>
  );

  const workspaceColumn = (
    <div className={styles.workspaceColumn}>
      {state.workspace && (
        <Workspace state={state.workspace} castById={castById} operatorLabel="BR Workspace 시점" />
      )}
      {actions && <div className={styles.actionsRow}>{actions}</div>}
    </div>
  );

  return (
    <div className={cn(styles.stage, phoneSide === 'left' && styles.phoneLeft)}>
      {phoneSide === 'left' ? (
        <>
          {phoneColumn}
          {workspaceColumn}
        </>
      ) : (
        <>
          {workspaceColumn}
          {phoneColumn}
        </>
      )}
    </div>
  );
}
