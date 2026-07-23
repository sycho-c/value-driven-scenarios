import { Link } from 'react-router-dom';
import { PRODUCT } from '@/content/brand';
import styles from './CtaSection.module.css';

export function CtaSection() {
  return (
    <>
      <section className={styles.section} id="cta">
        <div className={styles.wrap}>
          <div>
            <div className={styles.label}>다음 미팅을 잡을 때</div>
            <h2 className={styles.headline}>
              임원이 본 직후, "PoC 미팅 잡자"가 나오게 만듭니다.
            </h2>
            <p className={styles.sub}>
              사례 시나리오를 직접 클릭해 보세요. 도입 후 6주 안에 정량 자료가
              본부장 보고 페이지가 됩니다.
            </p>
          </div>
          <div className={styles.actions}>
            <a
              href="https://www.spectra.co.kr"
              target="_blank"
              rel="noreferrer"
              className={styles.primaryBtn}
            >
              PoC 도입 문의하기 →
            </a>
            <Link to="/case/wontalk-woori" className={styles.secondaryBtn}>
              WON TALK 사례 보기
            </Link>
            <Link to="/case/cowork-manufacturing" className={styles.secondaryBtn}>
              제조·유통 사례 보기
            </Link>
            <span className={styles.hint}>약 6분 · 키보드 ESC로 언제든 종료</span>
          </div>
        </div>
      </section>
      <footer className={styles.footer}>
        © {new Date().getFullYear()} {PRODUCT}는 실제 도입 사례에 기반한
        시나리오로 소개됩니다.
      </footer>
    </>
  );
}
