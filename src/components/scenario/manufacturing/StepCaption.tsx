import styles from './StepCaption.module.css';

interface Props {
  title: string;
  text: string;
  when?: string;
  jump?: string;
  /** 지금 할 일 — 진행 상태에 따라 바뀐다 */
  hint?: string;
  /** 버튼을 눌러야 할 때 강조 */
  cue?: boolean;
}

/**
 * 무대 위 단계 안내 줄 — 이 STATE에서 무슨 일이 일어나는지(상황)와 지금 할 일을 상시 보여준다.
 * 연출 메모는 접혀 있어 관객이 보지 못하므로, 흐름을 따라가는 데 필요한 한 줄은 여기 둔다.
 */
export function StepCaption({ title, text, when, jump, hint, cue }: Props) {
  return (
    <div className={styles.bar}>
      <div className={styles.main}>
        <div className={styles.head}>
          <span className={styles.title}>{title}</span>
          {when && <span className={styles.when}>🗓 {when}</span>}
          {jump && <span className={styles.jump}>⏩ {jump}</span>}
        </div>
        <div className={styles.text}>{text}</div>
      </div>
      {hint && <div className={cue ? `${styles.hint} ${styles.cue}` : styles.hint}>{hint}</div>}
    </div>
  );
}
