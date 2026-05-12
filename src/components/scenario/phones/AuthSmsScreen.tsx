import type { PhoneScreen } from '@/cases/_types';
import { cn } from '@/lib/cn';
import styles from './AuthSmsScreen.module.css';

interface AuthSmsMeta {
  phone?: string;
  code?: string;
  done?: boolean;
  organization?: string;
}

interface AuthSmsScreenProps {
  screen: PhoneScreen;
}

export function AuthSmsScreen({ screen }: AuthSmsScreenProps) {
  const meta = (screen.meta ?? {}) as AuthSmsMeta;
  const filledCode = (meta.code ?? '').padEnd(6, ' ').slice(0, 6);

  return (
    <div className={styles.screen}>
      <div className={styles.header}>
        <div className={styles.headerMain}>🔐 {screen.headerTitle ?? '본인 인증'}</div>
        {screen.headerSubtitle && (
          <div className={styles.headerSub}>{screen.headerSubtitle}</div>
        )}
      </div>
      <div className={styles.body}>
        <div className={styles.intro}>
          <div className={styles.introIcon}>📩</div>
          <div className={styles.introTitle}>SMS 인증 코드 입력</div>
          <p className={styles.introBody}>
            등록된 번호로 발송된 6자리 코드를 입력해 주세요.
          </p>
        </div>

        {meta.phone && (
          <div className={styles.phoneRow}>
            <span className={styles.phoneLabel}>본인 번호</span>
            <span className={styles.phoneValue}>{meta.phone}</span>
          </div>
        )}

        <div className={styles.codeBoxes}>
          {Array.from({ length: 6 }, (_, i) => {
            const ch = filledCode[i];
            const isFilled = ch && ch !== ' ';
            return (
              <div key={i} className={cn(styles.codeBox, isFilled && styles.filled)}>
                {isFilled ? ch : ''}
              </div>
            );
          })}
        </div>

        {meta.organization && (
          <div className={styles.directoryNote}>
            ✅ 기간계 조직도 연동 확인 — <strong>{meta.organization}</strong> 소속으로
            검증되어 채널 입장이 가능합니다.
          </div>
        )}

        <div className={cn(styles.cta, meta.done && styles.done)}>
          {meta.done ? '인증 완료 · 채널 입장 중…' : '인증하기'}
        </div>
      </div>
    </div>
  );
}
