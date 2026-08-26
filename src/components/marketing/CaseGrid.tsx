import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CASES } from '@/content/brand';
import { caseRegistry } from '@/cases/_registry';
import styles from './CaseGrid.module.css';

export function CaseGrid() {
  const entries = Object.entries(CASES);

  return (
    <section className={styles.section} id="cases">
      <div className={styles.sectionLabel}>Cases</div>
      <h2 className={styles.headline}>
        <em>산업이 달라도 통증의 형태는 같습니다.</em>
        <br />
        하나의 Cowork+가 산업을 가리지 않고 해결합니다.
      </h2>
      <div className={styles.grid}>
        {entries.map(([id, c], i) => {
          const caseDef = caseRegistry[id];
          if (!caseDef) {
            return (
              <div key={id} className={styles.placeholder}>
                <span className={styles.placeholderTitle}>{c.customer}</span>
                <span>곧 공개</span>
              </div>
            );
          }
          return (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.42, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link to={`/case/${id}`} className={styles.card}>
                <div
                  className={styles.cardAccent}
                  style={{ background: caseDef.accentColor }}
                />
                <span className={styles.label} style={{ color: caseDef.accentColor }}>
                  {c.label}
                </span>
                <div className={styles.customer}>{c.customer}</div>
                <div className={styles.industry}>{c.industry}</div>
                <p className={styles.summary}>{caseDef.brandLine}</p>
                <div className={styles.chapters}>
                  {caseDef.chapters.map((ch) => (
                    <span key={ch.id} className={styles.chapterBadge}>
                      Ch.{ch.id}
                    </span>
                  ))}
                </div>
                <div
                  className={styles.footer}
                  style={{ background: caseDef.accentColor }}
                >
                  <span>시나리오 따라가기</span>
                  <span className={styles.arrow}>→</span>
                </div>
              </Link>
            </motion.div>
          );
        })}
        <div className={styles.placeholder}>
          <span className={styles.placeholderTitle}>+ 다음 사례</span>
          <span>곧 추가됩니다</span>
        </div>
      </div>
    </section>
  );
}
