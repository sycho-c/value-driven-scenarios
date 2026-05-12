import type { PhoneScreen } from '@/cases/_types';
import styles from './FriendsSearchScreen.module.css';

interface FriendsSearchMeta {
  query?: string;
  target?: {
    initial: string;
    color: string;
    name: string;
    sub: string;
  };
  bridgeNote?: string;
}

interface FriendsSearchScreenProps {
  screen: PhoneScreen;
}

export function FriendsSearchScreen({ screen }: FriendsSearchScreenProps) {
  const meta = (screen.meta ?? {}) as FriendsSearchMeta;
  const target = meta.target;

  return (
    <div className={styles.screen}>
      <div className={styles.header}>
        <span className={styles.headerMain}>친구 검색</span>
        <span className={styles.appMark}>외부 메신저</span>
      </div>
      <div className={styles.searchBox}>
        <span className={styles.searchIcon}>🔍</span>
        <span className={styles.searchQuery}>{meta.query ?? '이름·전화·이메일'}</span>
        <span className={styles.searchClear}>×</span>
      </div>
      <div className={styles.sectionLabel}>검색 결과</div>
      {target && (
        <div className={styles.result}>
          <div className={styles.avatar} style={{ background: target.color }}>
            {target.initial}
          </div>
          <div className={styles.resultBody}>
            <div className={styles.resultName}>{target.name}</div>
            <div className={styles.resultSub}>{target.sub}</div>
          </div>
          <span className={styles.startBtn}>1:1 채팅</span>
        </div>
      )}
      {meta.bridgeNote && (
        <div className={styles.bridgeNote}>
          ⚠️ <strong>비공식 사이드 채널 발생 위험</strong> — {meta.bridgeNote}
        </div>
      )}
    </div>
  );
}
