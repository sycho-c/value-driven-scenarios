import { useEffect, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { COMPANY, PRODUCT } from '@/content/brand';
import { cn } from '@/lib/cn';
import styles from './ColdOpenHero.module.css';

const AUTO_INTERVAL_MS = 5800;

interface ChatMessage {
  kind: 'message' | 'system';
  text: string;
  mine?: boolean;
  danger?: boolean;
  time?: string;
}

interface HeroSlide {
  caseId: string;
  caseLabel: string;
  customer: string;
  industry: string;
  eyebrow: string;
  hook: ReactNode;
  sub: string;
  meaningLabel: string;
  meaning: string;
  chatLabel: string;
  chatHeader: {
    initial: string;
    color: string;
    name: string;
    sub: string;
  };
  messages: ChatMessage[];
  primaryCta: string;
}

const SLIDES: HeroSlide[] = [
  {
    caseId: 'cowork-hana',
    caseLabel: '1Q 설계 상담',
    customer: '하나손해보험',
    industry: '손해보험 · GA 채널',
    eyebrow: '1Q 설계 상담 · 하나손해보험',
    hook: (
      <>
        단톡으로 받은 가입 정보가 3일을 잡아먹고,
        <br />
        <em>고객은 다른 보험사로 갑니다.</em>
      </>
    ),
    sub: '보이지 않는 비용이 결국 GA 채널을 가져갑니다. 응답이 빠른 보험사가 이깁니다.',
    meaningLabel: '이 사례가 보여주는 것',
    meaning:
      '보이지 않는 비용 → 문서가 스스로 읽힌다 → GA 채널을 가져오는 무기. 7분 압축 영업 데모.',
    chatLabel: '실제 사례 · Ch.1 · 보이지 않는 비용',
    chatHeader: {
      initial: '박',
      color: '#1B4F72',
      name: '박민준 고객',
      sub: '하나손보 카톡 채널 · 가입 문의',
    },
    messages: [
      {
        kind: 'message',
        text: '안녕하세요, 운전자보험 가입 신청드릴게요. 신분증 사진 보내드립니다.',
        time: '월 14:02',
      },
      {
        kind: 'message',
        text: '3일 지났는데 연락이 없어서, 다른 보험사로 갔어요.',
        mine: true,
        danger: true,
        time: '목 09:18',
      },
    ],
    primaryCta: '보이지 않는 비용 보기 →',
  },
  {
    caseId: 'wontalk-woori',
    caseLabel: 'WON TALK',
    customer: '우리금융캐피탈',
    industry: '자동차금융 · AG 파트너망',
    eyebrow: 'WON TALK · 우리금융캐피탈',
    hook: (
      <>
        개인정보가 단톡방에 들어가는 순간,
        <br />
        <em>시스템이 먼저 막습니다.</em>
      </>
    ),
    sub: '사람이 실수해도, 시스템은 흔들리지 않습니다.',
    meaningLabel: '이 한 줄이 의미하는 것',
    meaning: '사람이 실수해도 시스템이 차단합니다. 컴플라이언스를 의지에 맡기지 않습니다.',
    chatLabel: '실제 사례 · 4,000명 AG 파트너 채널',
    chatHeader: {
      initial: '강',
      color: '#5B3FE4',
      name: '강민호 (에이원오토 AG 모집인)',
      sub: '에이원오토 영업팀 · 단톡방',
    },
    messages: [
      {
        kind: 'message',
        text: '주민번호 뒷자리 1234567, 아이오닉6 3500만원 건 처리 부탁드립니다',
        mine: true,
        danger: true,
        time: '오후 2:15',
      },
      {
        kind: 'system',
        text: '🚫 메시지가 차단되었습니다 — 비즈폼으로 접수해 주세요',
      },
    ],
    primaryCta: '개인정보 차단 보기 →',
  },
  {
    caseId: 'salesbridge-gaon',
    caseLabel: 'ONE TALK',
    customer: '가온전선',
    industry: '전선 · 소재 B2B',
    eyebrow: 'ONE TALK · 가온전선',
    hook: (
      <>
        단톡방 4개, Excel 단가표 4개,
        <br />
        <em>잘못 보낸 한 번이 단가를 노출합니다.</em>
      </>
    ),
    sub: '카카오톡 단톡방은 그대로 두고, 거버넌스와 가시성만 더합니다.',
    meaningLabel: '이 사례가 보여주는 것',
    meaning:
      '카오스 → 거버넌스 → 통제 확대 → 경영 자산화. 7 SCENE으로 풀어낸 가온전선 Cowork+ 도입 흐름.',
    chatLabel: '실제 사례 · SCENE 0 · 평범한 오전 9:14',
    chatHeader: {
      initial: '박',
      color: '#C9302C',
      name: '박대표 (미우케이블)',
      sub: '미우케이블 단톡방 · 단톡방 4개 중 1개',
    },
    messages: [
      {
        kind: 'message',
        text: 'CV-A001 견적 부탁드립니다',
        time: '어제 17:32',
      },
      {
        kind: 'message',
        text: '오늘 안에 회신 가능하실까요?',
        time: '오전 9:14',
      },
    ],
    primaryCta: '카오스 1분 보기 →',
  },
];

export function ColdOpenHero() {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => {
      setIdx((i) => (i + 1) % SLIDES.length);
    }, AUTO_INTERVAL_MS);
    return () => clearInterval(t);
  }, [paused]);

  const slide = SLIDES[idx];

  return (
    <section
      className={styles.hero}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className={styles.left}>
        <div className={styles.leftSlideArea}>
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={`left-${slide.caseId}`}
              className={cn(styles.slide, styles.slideAbs)}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className={styles.eyebrow}>
                {COMPANY} · {PRODUCT} — {slide.eyebrow}
              </span>
              <h1 className={styles.hook}>{slide.hook}</h1>
              <p className={styles.sub}>{slide.sub}</p>
              <div className={styles.ctas}>
                <Link to={`/case/${slide.caseId}`} className={styles.primaryBtn}>
                  {slide.primaryCta}
                </Link>
                <a href="#cases" className={styles.secondaryBtn}>
                  전체 사례
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 슬라이드와 독립된 사례 인디케이터 — 항상 표시 */}
        <div className={styles.indicator}>
          <div className={styles.indicatorLabel}>
            <span>{SLIDES.length}가지 도입 사례 · {idx + 1} / {SLIDES.length}</span>
            <span className={styles.pauseHint}>
              {paused ? '⏸ 일시정지' : '▶ 자동 재생 (호버 시 정지)'}
            </span>
          </div>
          <div className={styles.caseTabs} role="tablist" aria-label="사례 슬라이드">
            {SLIDES.map((s, i) => {
              const active = i === idx;
              return (
                <button
                  key={s.caseId}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  className={cn(
                    styles.caseTab,
                    active && styles.active,
                    active && paused && styles.paused,
                  )}
                  onClick={() => setIdx(i)}
                >
                  <div className={styles.caseTabHead}>
                    <span className={styles.caseTabLabel}>{s.caseLabel}</span>
                    <span className={styles.caseTabNum}>0{i + 1}</span>
                  </div>
                  <span className={styles.caseTabCustomer}>
                    {s.customer} · {s.industry}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className={styles.right}>
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={`right-${slide.caseId}`}
            className={styles.rightSlide}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={styles.chatStage}>
              <div className={styles.chatLabel}>
                <span className={styles.dot} />
                {slide.chatLabel}
              </div>
              <div className={styles.chatRoom}>
                <div className={styles.chatHeader}>
                  <div
                    className={styles.chatHeaderAvatar}
                    style={{ background: slide.chatHeader.color }}
                  >
                    {slide.chatHeader.initial}
                  </div>
                  <span className={styles.chatHeaderName}>{slide.chatHeader.name}</span>
                  <span className={styles.chatHeaderSub}>{slide.chatHeader.sub}</span>
                </div>
                {slide.messages.map((m, i) =>
                  m.kind === 'system' ? (
                    <motion.div
                      key={i}
                      className={styles.systemNote}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.32, delay: 0.5 + i * 0.18 }}
                    >
                      {m.text}
                    </motion.div>
                  ) : (
                    <motion.div
                      key={i}
                      className={cn(
                        styles.message,
                        m.mine && styles.mine,
                        m.danger && styles.danger,
                      )}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.36, delay: 0.3 + i * 0.18 }}
                    >
                      {m.text}
                      {m.time && <span className={styles.timestamp}> {m.time}</span>}
                    </motion.div>
                  ),
                )}
              </div>
              <motion.div
                className={styles.slogan}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.8 }}
              >
                <div className={styles.sloganLabel}>{slide.meaningLabel}</div>
                {slide.meaning}
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
