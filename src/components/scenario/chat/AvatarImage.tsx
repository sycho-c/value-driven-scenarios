import { cn } from '@/lib/cn';
import type { CastMember } from '@/cases/_types';
import { MonogramCard } from './MonogramCard';
import styles from './AvatarImage.module.css';

interface AvatarImageProps {
  sender?: CastMember | null;
  /** Direct override (used for sender-only entities that aren't full cast members). */
  src?: string;
  initial?: string;
  color?: string;
  org?: string;
  size?: number;
  variant?: 'default' | 'compact' | 'large';
  className?: string;
}

export function AvatarImage({
  sender,
  src,
  initial,
  color,
  org,
  size = 36,
  variant = 'default',
  className,
}: AvatarImageProps) {
  const resolvedSrc = src ?? sender?.avatarSrc;
  const resolvedInitial = initial ?? sender?.initial ?? '?';
  const resolvedColor = color ?? sender?.color ?? '#5B3FE4';
  const resolvedOrg = org ?? sender?.org;

  if (resolvedSrc) {
    return (
      <span
        className={cn(styles.imageAvatar, className)}
        style={{ width: size, height: size }}
      >
        <img src={resolvedSrc} alt={sender?.label ?? resolvedInitial} />
      </span>
    );
  }

  if (resolvedOrg) {
    return (
      <MonogramCard
        initial={resolvedInitial}
        color={resolvedColor}
        org={resolvedOrg}
        size={size}
        variant={variant}
        className={className}
      />
    );
  }

  return (
    <span
      className={cn(styles.fallback, className)}
      style={{
        width: size,
        height: size,
        background: resolvedColor,
        fontSize: Math.round(size * 0.42),
      }}
    >
      {resolvedInitial}
    </span>
  );
}
