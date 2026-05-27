import { motion } from 'framer-motion';
import { PRODUCT, TAGLINE } from '@/content/brand';
import { cn } from '@/lib/cn';
import styles from './SolutionStrip.module.css';

const ACTS = [
  {
    num: 'ACT I',
    label: '균열 (Crack)',
    body: '평소 흐름에서 신호가 새기 시작합니다. 답이 늦는 메시지 한 통.',
    tone: 'problem' as const,
  },
  {
    num: 'ACT II',
    label: '붕괴 (Collapse)',
    body: '같은 패턴이 반복되며 시스템 한계가 드러나고, 사이드 채널로 이탈합니다.',
    tone: 'problem' as const,
  },
  {
    num: 'ACT III',
    label: '등장 (Reveal)',
    body: `같은 상황에 ${PRODUCT}가 등장합니다 — 같은 인물, 같은 요청, 다른 결과.`,
    tone: 'solution' as const,
  },
  {
    num: 'ACT IV',
    label: '정착 (Settle)',
    body: '운영자가 데이터로 통제합니다. 대시보드 · 읽음 추적 · 인센티브 근거.',
    tone: 'outcome' as const,
  },
];

export function SolutionStrip() {
  return (
    <section className={styles.section} id="solution">
      <div className={styles.sectionLabel}>해결의 형태</div>
      <h2 className={styles.headline}>
        <em>{PRODUCT}</em> — {TAGLINE}.
      </h2>
      <p className={styles.sub}>
        산업과 맥락에 따라 'WON TALK', 'ONE TALK'이라는 사례명으로 도입되었습니다.
        모든 사례는 같은 4막 구조를 따라갑니다 — 균열 → 붕괴 → 등장 → 정착.
      </p>
      <div className={styles.flow}>
        {ACTS.map((act, i) => (
          <motion.div
            key={act.num}
            className={cn(styles.act, styles[act.tone])}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.42, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className={styles.actNum}>{act.num}</span>
            <h3 className={styles.actTitle}>{act.label}</h3>
            <p className={styles.actBody}>{act.body}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
