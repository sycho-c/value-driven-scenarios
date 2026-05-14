import { motion } from 'framer-motion';
import type { GalleryCardDef } from '@/cases/_types';
import { cn } from '@/lib/cn';
import styles from './ResultCardGallery.module.css';

interface ResultCardGalleryProps {
  cards: GalleryCardDef[];
  footer?: string;
}

const TAG_LABEL: Record<NonNullable<GalleryCardDef['tone']>, string> = {
  self: '자체 도구',
  kakao: '카카오 협업',
  progress: '진행 중',
};

export function ResultCardGallery({ cards, footer }: ResultCardGalleryProps) {
  return (
    <div className={styles.gallery}>
      <div className={styles.grid}>
        {cards.map((card, idx) => (
          <motion.div
            key={card.id}
            className={cn(styles.card, card.pulse && styles.pulse)}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.08, duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={styles.iconRow}>
              <span className={styles.icon}>{card.icon}</span>
              <span className={cn(styles.tag, styles[card.tone ?? 'self'])}>
                {card.tag || TAG_LABEL[card.tone ?? 'self']}
              </span>
            </div>
            <div className={styles.title}>{card.title}</div>
            <div className={styles.limit}>✗ {card.limit}</div>
            <div className={styles.solution}>✨ {card.solution}</div>
          </motion.div>
        ))}
      </div>
      {footer && <div className={styles.footer}>{footer}</div>}
    </div>
  );
}
