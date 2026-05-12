import { motion } from 'framer-motion';
import styles from './ProblemCards.module.css';

const PROBLEMS = [
  {
    num: '01',
    title: '수십 개 카톡방, 누가 챙기는지 흐릿합니다',
    body: '고객·협력사마다 1:1 카톡방을 따로 만들다 보면 담당자 한 명 폰에 수십 개가 쌓입니다. 어제 누구한테 답했는지, 오늘은 누구부터 챙겨야 하는지 매번 다시 스크롤합니다.',
    quote: '"이 건 누가 답하기로 했죠?"',
  },
  {
    num: '02',
    title: '고객이 팀장에게 직접 카톡합니다',
    body: '답이 늦어진다 싶으면 고객은 명함으로 받은 팀장 카톡으로 직행합니다. 회사는 이 흐름을 모르고, 책임 소재는 사후에야 정리됩니다.',
    quote: '"팀장님, 죄송한데 직접 연락드려요."',
  },
  {
    num: '03',
    title: '담당자가 퇴사하면 카톡방도 같이 사라집니다',
    body: '고객 정보와 대화 이력이 개인 폰에 남아 회사 자산이 되지 못합니다. 새 담당자가 인수받는 건 카톡 캡처 한 무더기뿐입니다.',
    quote: '"전임자 카톡을 못 보면 처음부터 다시…"',
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
