import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';
import styles from './MessageContextMenu.module.css';

export interface ContextMenuItem {
  id: string;
  label: string;
  icon: string;
  disabled?: boolean;
}

interface MessageContextMenuProps {
  items: ContextMenuItem[];
}

export function MessageContextMenu({ items }: MessageContextMenuProps) {
  return (
    <motion.div
      className={styles.menu}
      initial={{ opacity: 0, y: 8, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
    >
      {items.map((item, idx) => (
        <div key={item.id}>
          <div className={cn(styles.item, item.disabled && styles.disabled)}>
            <span className={styles.icon}>{item.icon}</span>
            <span>{item.label}</span>
          </div>
          {idx < items.length - 1 && <div className={styles.divider} />}
        </div>
      ))}
    </motion.div>
  );
}
