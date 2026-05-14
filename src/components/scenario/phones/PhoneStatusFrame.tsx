import type { ReactNode } from 'react';
import type { PhoneFrameTone } from '@/cases/_types';
import { cn } from '@/lib/cn';
import styles from './PhoneStatusFrame.module.css';

interface PhoneStatusFrameProps {
  tone: PhoneFrameTone;
  topBanner?: string;
  children: ReactNode;
}

export function PhoneStatusFrame({ tone, topBanner, children }: PhoneStatusFrameProps) {
  return (
    <div className={cn(styles.frame, styles[tone])}>
      {topBanner && <div className={cn(styles.banner, styles[tone])}>{topBanner}</div>}
      {children}
    </div>
  );
}
