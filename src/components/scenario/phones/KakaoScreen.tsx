import type { PhoneScreen, CastMember } from '@/cases/_types';
import { MessageList } from './MessageList';
import { PushNotificationStack } from '../chat/PushNotificationStack';
import styles from './KakaoScreen.module.css';

interface KakaoScreenProps {
  screen: PhoneScreen;
  castById: Record<string, CastMember>;
  ownerCastId?: string;
}

export function KakaoScreen({ screen, castById, ownerCastId }: KakaoScreenProps) {
  return (
    <div className={styles.screen}>
      <div className={styles.header}>
        <div className={styles.iconBtn}>‹</div>
        <div className={styles.title}>
          <span className={styles.titleMain}>{screen.headerTitle ?? '대화'}</span>
          {screen.headerSubtitle && (
            <span className={styles.titleSub}>{screen.headerSubtitle}</span>
          )}
        </div>
        <span className={styles.appMark}>외부 메신저</span>
      </div>
      {screen.pushNotifications && screen.pushNotifications.length > 0 && (
        <PushNotificationStack notifications={screen.pushNotifications} />
      )}
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
