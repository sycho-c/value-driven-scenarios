import { motion } from 'framer-motion';
import styles from './ProblemCards.module.css';

const PROBLEMS = [
  {
    num: '01',
    title: '카톡으로 받은 가입 정보가 3일을 잡아먹습니다',
    body: '카톡으로 받은 서류를 사람이 다시 시스템에 옮겨 적는 사이, 응답 빠른 경쟁사가 GA 채널을 가져갑니다.',
    quote: '"3일 지났는데 연락이 없어서, 다른 보험사로 갔어요."',
  },
  {
    num: '02',
    title: '4,000명 단톡방에 주민번호가 흘러다닙니다',
    body: '4,000명 파트너 단톡방에 주민번호가 평문으로 오갑니다. 컴플라이언스를 개인의 주의력에 맡길 수는 없습니다.',
    quote: '"주민번호 뒷자리 1234567, 처리 부탁드립니다."',
  },
  {
    num: '03',
    title: '비슷한 파일 4개, 잘못 보낸 한 번이 단가를 노출합니다',
    body: '거래처별 단가표가 단톡방마다 쌓이고, 잘못 보낸 한 번이 다른 거래처에 단가를 노출합니다. 카톡엔 막아줄 장치가 없습니다.',
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
