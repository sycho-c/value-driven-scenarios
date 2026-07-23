import { motion } from 'framer-motion';
import type { RoiCardDef } from '@/cases/_types';
import { RoiCard } from '@/components/roi/RoiCard';
import styles from './RoiTeaserPanel.module.css';

const TEASER_ROI: RoiCardDef[] = [
  {
    id: 't1',
    label: '단톡방 개인정보 노출 차단율',
    caption: 'Cowork+ PII 룰 4종 작동',
    value: null,
    unit: '%',
    trend: 'up-good',
  },
  {
    id: 't2',
    label: '4,000명 알림톡 읽음률',
    caption: 'WON TALK · 우리금융캐피탈',
    value: 95.5,
    unit: '%',
    trend: 'up-good',
  },
  {
    id: 't3',
    label: '평균 응답시간 단축',
    caption: '자동 배정 + 셀프 조회',
    value: null,
    unit: '%',
    trend: 'down-good',
  },
  {
    id: 't4',
    label: '잘못된 파일 첨부 사전 차단율',
    caption: '파트너 협업 · 제조·유통',
    value: null,
    unit: '%',
    trend: 'up-good',
  },
];

export function RoiTeaserPanel() {
  return (
    <section className={styles.section} id="roi">
      <div className={styles.sectionLabel}>측정 가능한 가치</div>
      <h2 className={styles.headline}>
        <em>수치를 채울 준비가 되셨다면</em>, 함께 측정해 드립니다.
      </h2>
      <p className={styles.sub}>
        도입 후 6주 안에 다음 지표들이 정량화됩니다. 자리는 미리 잡혀 있고, 측정 기준은 도입사 협의 후 확정됩니다.
      </p>
      <div className={styles.grid}>
        {TEASER_ROI.map((def, i) => (
          <motion.div
            key={def.id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.4, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
          >
            <RoiCard def={def} />
          </motion.div>
        ))}
      </div>
      <div className={styles.footer}>
        <div className={styles.footerText}>
          <strong>측정 기준 확정 + 베이스라인 수집</strong>까지 평균 2주.
          PoC 첫 1주차부터 위 지표들을 함께 정의합니다.
        </div>
        <a
          href="https://www.spectra.co.kr"
          target="_blank"
          rel="noreferrer"
          className={styles.footerCta}
        >
          PoC 미팅 잡기 →
        </a>
      </div>
    </section>
  );
}
