import type { GuideTooltipDef } from '@/cases/_types';
import { cn } from '@/lib/cn';
import styles from './GuideTooltip.module.css';

interface GuideTooltipProps {
  tooltip: GuideTooltipDef;
  position: { top?: number; left?: number; right?: number; bottom?: number };
}

const arrowMap = {
  top: styles.arrowTop,
  bottom: styles.arrowBottom,
  left: styles.arrowLeft,
  right: styles.arrowRight,
} as const;

export function GuideTooltip({ tooltip, position }: GuideTooltipProps) {
  return (
    <div
      className={cn(styles.tooltip, tooltip.arrow ? arrowMap[tooltip.arrow] : undefined)}
      style={position}
    >
      <span>{tooltip.text}</span>
    </div>
  );
}
