import type { PhoneHeaderVariant } from '@/cases/_types';
import { cn } from '@/lib/cn';
import styles from './PhoneChannelHeader.module.css';

interface PhoneChannelHeaderProps {
  lane: string;
  product?: string;
  variant?: PhoneHeaderVariant;
}

export function PhoneChannelHeader({ lane, product, variant = 'kakao' }: PhoneChannelHeaderProps) {
  return (
    <div
      className={cn(
        styles.header,
        variant === 'kakao' && styles.headerKakao,
        variant === 'consult-yellow' && styles.headerConsult,
        variant === 'cowork-badge' && styles.headerCowork,
      )}
    >
      <div className={styles.lane}>
        <span>{lane}</span>
        {variant === 'cowork-badge' && <span className={styles.coworkBadge}>Cowork+</span>}
      </div>
      {product && <div className={styles.product}>{product}</div>}
    </div>
  );
}
