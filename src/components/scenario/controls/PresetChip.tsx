import type { PresetChip as PresetChipDef } from '@/cases/_types';
import { cn } from '@/lib/cn';
import styles from './PresetChip.module.css';

const ICONS: Record<PresetChipDef['kind'], string> = {
  guest: '💬',
  br: '🧑‍💼',
  admin: '🛡️',
  system: '⚙️',
  kakao: '💛',
};

interface PresetChipProps {
  chip: PresetChipDef;
  onClick: (chip: PresetChipDef) => void;
}

export function PresetChip({ chip, onClick }: PresetChipProps) {
  return (
    <button
      type="button"
      className={cn(styles.chip, styles[chip.kind])}
      disabled={chip.disabled}
      onClick={() => onClick(chip)}
    >
      <span className={styles.icon}>{ICONS[chip.kind]}</span>
      <span className={styles.text}>{chip.text}</span>
    </button>
  );
}
