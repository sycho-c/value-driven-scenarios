import type { PhoneScreen, CastMember } from '@/cases/_types';
import { MessageList } from './MessageList';
import styles from './WontalkScreen.module.css';

interface WontalkScreenProps {
  screen: PhoneScreen;
  castById: Record<string, CastMember>;
  ownerCastId?: string;
}

export function WontalkScreen({ screen, castById, ownerCastId }: WontalkScreenProps) {
  return (
    <div className={styles.screen}>
      <div className={styles.header}>
        <div className={styles.iconBtn}>←</div>
        <div className={styles.title}>
          <span className={styles.titleMain}>{screen.headerTitle ?? 'Cowork+ 채널'}</span>
          {screen.headerSubtitle && (
            <span className={styles.titleSub}>{screen.headerSubtitle}</span>
          )}
        </div>
        <span className={styles.brand}>COWORK+</span>
      </div>
      <div className={styles.body}>
        <MessageList
          messages={screen.messages ?? []}
          castById={castById}
          ownerCastId={ownerCastId}
        />
      </div>
    </div>
  );
}
