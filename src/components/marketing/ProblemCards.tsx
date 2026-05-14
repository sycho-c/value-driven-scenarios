import { motion } from 'framer-motion';
import styles from './ProblemCards.module.css';

const PROBLEMS = [
  {
    num: '01',
    title: '비슷한 파일 4개, 잘못 보낸 한 번이 단가를 노출합니다',
    body: '단톡방마다 거래처별 견적서가 쌓이고, 폴더에는 비슷한 이름의 파일이 4개씩 떠 있습니다. 손이 잠깐 미끄러지면 대동 단가가 미우 단톡방으로 들어갑니다 — 카카오톡에는 막아줄 장치가 없습니다.',
    quote: '"잠깐, 그 파일 누구한테 보낸 거예요?"',
  },
  {
    num: '02',
    title: '같은 단체방인데, iPhone 사용자만 파일을 못 받습니다',
    body: '카카오 상담톡·단체방은 외부 앱 공유에 한계가 있어, 외근 중인 iPhone 사용자는 같은 방의 파일을 그대로 열지 못합니다. 단톡방은 살아있는데, 사람마다 사용 환경이 달라 운영이 끊깁니다.',
    quote: '"팀장님, 현장인데 단체방 견적서가 안 열려요."',
  },
  {
    num: '03',
    title: '운영이 끝난 뒤에야 무슨 일이 있었는지 압니다',
    body: '거래처 단톡방은 개인 폰에 남아 회사 자산이 되지 못합니다. 어느 거래처에 단가가 흔들리고 있는지, 어떤 사원이 위험한 응대를 했는지 — 사고가 나야 비로소 정리됩니다.',
    quote: '"이번 분기, 우리가 뭘 놓쳤는지 누가 답할 수 있죠?"',
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
