import { motion } from 'framer-motion';
import styles from './ProblemCards.module.css';

const PROBLEMS = [
  {
    num: '01',
    title: '카톡으로 받은 가입 정보가 3일을 잡아먹습니다',
    body: '고객이 카톡 채널로 보낸 신분증·서류는 설계사가 다시 시스템에 옮겨 적어야 합니다. 한 건당 평균 3일이 걸리는 사이, 응답이 빠른 다른 보험사가 GA 채널을 가져갑니다 — 보이지 않는 비용이 매출이 됩니다.',
    quote: '"3일 지났는데 연락이 없어서, 다른 보험사로 갔어요."',
  },
  {
    num: '02',
    title: '4,000명 단톡방에 주민번호가 흘러다닙니다',
    body: 'AG 파트너 단톡방에서 모집인이 고객 주민번호와 차량번호를 평문으로 보냅니다. 사람이 조심하라고 외쳐도, 4,000명의 손가락 중 한 번이면 끝입니다 — 컴플라이언스를 의지에 맡길 수는 없습니다.',
    quote: '"주민번호 뒷자리 1234567, 처리 부탁드립니다."',
  },
  {
    num: '03',
    title: '비슷한 파일 4개, 잘못 보낸 한 번이 단가를 노출합니다',
    body: '단톡방마다 거래처별 견적서가 쌓이고, 폴더에는 비슷한 이름의 파일이 4개씩 떠 있습니다. 손이 잠깐 미끄러지면 대동 단가가 미우 단톡방으로 들어갑니다 — 카카오톡에는 막아줄 장치가 없습니다.',
    quote: '"잠깐, 그 파일 누구한테 보낸 거예요?"',
  },
];

export function ProblemCards() {
  return (
    <section className={styles.section} id="problem">
      <div className={styles.sectionLabel}>왜 지금인가</div>
      <h2 className={styles.sectionTitle}>
        카톡으로 영업하는 회사라면 익숙한 세 장면
      </h2>
      <div className={styles.grid}>
        {PROBLEMS.map((p, i) => (
          <motion.article
            key={p.num}
            className={styles.card}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.45, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className={styles.cardNum}>SCENE {p.num}</span>
            <h3 className={styles.cardTitle}>{p.title}</h3>
            <p className={styles.cardBody}>{p.body}</p>
            <p className={styles.cardQuote}>{p.quote}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
