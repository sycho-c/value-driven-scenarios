import { Fragment, type ReactNode, useEffect, useState } from 'react';
import type {
  MfgDashboardState,
  MfgDashGauge,
  MfgDashHeatmap,
  MfgDashInsight,
  MfgDashKpi,
  MfgDashRing,
  MfgDashRoomBar,
} from '@/cases/_types';
import { cn } from '@/lib/cn';
import styles from './MfgDashboard.module.css';

interface Props {
  state: MfgDashboardState;
  actions?: ReactNode;
}

/* 참고 디자인(관리자_대시보드_4)의 고정 팔레트 */
const NAVY = '#12275C';
const PURPLE = '#5B3FE4';
const PURPLE_L = '#8B6BF0';
const AMBER = '#D98A00';
const RED = '#C8322F';
const POS = '#2E7D66';
const TRACK = '#EDEFF5';
const GRAY = '#B9C0DE';

/** 담당자 활동·편중 링 색 (외곽→안쪽) */
const SHARE_RING_COLORS = [AMBER, PURPLE, PURPLE_L, GRAY];
/** SLA 준수율 링 색 (외곽→안쪽) */
const SLA_RING_COLORS = [PURPLE, PURPLE_L, AMBER, RED];

/** *별표* 구간을 강조로 렌더 */
function emph(text: string) {
  return text.split('*').map((seg, i) => (i % 2 === 1 ? <b key={i}>{seg}</b> : <Fragment key={i}>{seg}</Fragment>));
}

function InsightCard({ insight, onCta }: { insight: MfgDashInsight; onCta?: () => void }) {
  return (
    <div className={styles.insight}>
      <div className={styles.insL}>{insight.label}</div>
      <div className={styles.insV}>
        {insight.value}
        {insight.valueSuffix && <small>{insight.valueSuffix}</small>}
      </div>
      <div className={styles.insSub}>{emph(insight.sub)}</div>
      {insight.ctaLabel && (
        <div className={styles.insCta}>
          <button type="button" className={styles.insBtn} onClick={onCta}>
            {insight.ctaLabel}
          </button>
        </div>
      )}
    </div>
  );
}

function KpiCard({ kpi }: { kpi: MfgDashKpi }) {
  return (
    <div className={styles.kpi}>
      <div className={styles.kpiL}>{kpi.label}</div>
      <div className={styles.kpiV}>{kpi.value}</div>
      <div className={styles.kpiSub}>
        {kpi.delta && (
          <span className={cn(styles.kpiDelta, kpi.delta.tone === 'good' ? styles.deltaPos : styles.deltaNeg)}>
            {kpi.delta.text}
          </span>
        )}
        <span>{kpi.sub}</span>
        <span className={cn(styles.tag, kpi.tag === 'fix' ? styles.tagFix : styles.tagEst)}>
          {kpi.tag === 'fix' ? '확정' : '추정'}
        </span>
      </div>
    </div>
  );
}

function SecTag({ kind, label, desc }: { kind: 'today' | 'period'; label: string; desc: string }) {
  return (
    <div className={styles.secTag}>
      <span className={cn(styles.secLabel, kind === 'today' ? styles.secToday : styles.secPeriod)}>{label}</span>
      <span className={styles.secDesc}>{desc}</span>
      <span className={styles.secLine} />
    </div>
  );
}

function CardHd({ title, aiTag, sub }: { title: string; aiTag?: string; sub: string }) {
  return (
    <>
      <div className={styles.cardT}>
        {title}
        {aiTag && <span className={styles.aiTag}>{aiTag}</span>}
      </div>
      <div className={styles.cardSub}>{sub}</div>
    </>
  );
}

/** 히트맵 — 보라(자산량)/레드(위반) 팔레트 + 선택적 tail 열 */
function Heatmap({ heat }: { heat: MfgDashHeatmap }) {
  const shade = (v: number) => {
    if (v === 0) return '#F4F5F9';
    const t = v / heat.max;
    return heat.palette === 'red'
      ? `rgba(200, 50, 47, ${(0.14 + t * 0.76).toFixed(2)})`
      : `rgba(91, 63, 228, ${(0.12 + t * 0.78).toFixed(2)})`;
  };
  const txtCol = (v: number) => (v / heat.max > 0.55 ? '#fff' : '#141A2E');
  return (
    <table className={styles.heat}>
      <thead>
        <tr>
          <th />
          {heat.cols.map((c) => (
            <th key={c} className={styles.heatColH}>{c}</th>
          ))}
          {heat.tailHeader && <th className={cn(styles.heatColH, styles.heatTailH)}>{heat.tailHeader}</th>}
        </tr>
      </thead>
      <tbody>
        {heat.rows.map((row) => (
          <tr key={row.label}>
            <td className={styles.heatRowH}>
              {row.label}
              {row.sub && <div className={styles.heatRowSub}>{row.sub}</div>}
            </td>
            {row.cells.map((v, ci) => (
              <td
                key={ci}
                className={styles.heatCell}
                style={{ background: shade(v), color: txtCol(v), fontWeight: v > 0 ? 800 : 400 }}
              >
                {v || ''}
              </td>
            ))}
            {heat.tailHeader && (
              <td
                className={cn(
                  styles.heatTail,
                  row.tailTone === 'red' && styles.tailRed,
                  row.tailTone === 'amber' && styles.tailAmber,
                )}
              >
                {row.tail}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/** 라운드 세로 막대 (연결성) */
function RoomBars({ bars }: { bars: MfgDashRoomBar[] }) {
  const W = 460;
  const H = 210;
  const padB = 42;
  const padT = 16;
  const max = Math.max(...bars.map((b) => b.value), 1) * 1.06;
  const bw = (W - 26) / bars.length;
  const toneCol = (t: MfgDashRoomBar['tone']) => (t === 'hi' ? PURPLE : t === 'mid' ? PURPLE_L : AMBER);
  return (
    <div className={styles.chartCenter}>
      <svg viewBox={`0 0 ${W} ${H}`} className={styles.roomSvg}>
        {bars.map((b, i) => {
          const bwid = Math.min(30, bw * 0.5);
          const bx = 10 + i * bw + (bw - bwid) / 2;
          const bh = Math.max(((H - padB - padT) * b.value) / max, bwid);
          const by = H - padB - bh;
          const rad = bwid / 2;
          const cx = 10 + i * bw + bw / 2;
          return (
            <g key={b.label}>
              <rect x={bx} y={padT} width={bwid} height={H - padB - padT} rx={rad} fill={TRACK} />
              <rect x={bx} y={by} width={bwid} height={bh} rx={rad} fill={toneCol(b.tone)} />
              <text x={cx} y={by - 7} fontSize={11} fontWeight={800} fill="#141A2E" textAnchor="middle">
                {b.value}
              </text>
              <text x={cx} y={H - padB + 16} fontSize={9} fill="#6B7391" textAnchor="middle">
                {b.label.length > 5 ? b.label.slice(0, 5) : b.label}
              </text>
              <text x={cx} y={H - padB + 29} fontSize={8} fill={toneCol(b.tone)} fontWeight={800} textAnchor="middle">
                {b.state}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/** 동심원 링 + 범례 */
function Rings({ rings, colors, center }: { rings: MfgDashRing[]; colors: string[]; center?: { v: string; l: string } }) {
  const cx = 95;
  const cy = 95;
  const radii = [80, 63, 46, 29];
  const thick = 13;
  return (
    <div className={styles.concWrap}>
      <svg width={190} height={190}>
        {rings.map((r, i) => {
          const R = radii[i] ?? 20;
          const circ = 2 * Math.PI * R;
          return (
            <g key={r.label}>
              <circle cx={cx} cy={cy} r={R} fill="none" stroke={TRACK} strokeWidth={thick} />
              <circle
                cx={cx}
                cy={cy}
                r={R}
                fill="none"
                stroke={colors[i]}
                strokeWidth={thick}
                strokeLinecap="round"
                strokeDasharray={`${((circ * r.pct) / 100).toFixed(1)} ${circ.toFixed(1)}`}
                transform={`rotate(-90 ${cx} ${cy})`}
              />
            </g>
          );
        })}
        {center && (
          <>
            <text x={cx} y={cy - 4} fontSize={22} fontWeight={800} fill={NAVY} textAnchor="middle">{center.v}</text>
            <text x={cx} y={cy + 14} fontSize={9} fill="#6B7391" textAnchor="middle">{center.l}</text>
          </>
        )}
      </svg>
      <div className={styles.concLegend}>
        {rings.map((r, i) => (
          <div key={r.label} className={styles.concLi}>
            <span>
              <span className={styles.concDot} style={{ background: colors[i] }} />
              <b>{r.label}</b>
              {r.sub && <span className={styles.concSub}> {r.sub}</span>}
            </span>
            <span className={styles.concPct} style={{ color: colors[i] }}>{r.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/** 일별 라운드 막대 (14일 메시지량) */
function DailyBars({ values, max }: { values: number[]; max: number }) {
  const W = 1240;
  const H = 200;
  const padL = 42;
  const padB = 28;
  const padT = 14;
  const bw = (W - padL - 16) / values.length;
  const y = (v: number) => H - padB - (v / max) * (H - padB - padT);
  const gridVals = [0, max / 2, max];
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={styles.wideSvg}>
      {gridVals.map((g) => (
        <g key={g}>
          <line x1={padL} y1={y(g)} x2={W - 8} y2={y(g)} stroke={TRACK} />
          <text x={padL - 6} y={y(g) + 3} fontSize={8} fill="#9AA1B8" textAnchor="end">{g}</text>
        </g>
      ))}
      {values.map((v, i) => {
        const bwid = Math.min(26, bw * 0.5);
        const bx = padL + i * bw + (bw - bwid) / 2;
        const bh = Math.max(H - padB - y(v), bwid);
        const by = H - padB - bh;
        const rad = bwid / 2;
        const today = i === values.length - 1;
        const d = values.length - 1 - i;
        return (
          <g key={i}>
            <rect x={bx} y={padT} width={bwid} height={H - padB - padT} rx={rad} fill="#F1F2F8" />
            <rect x={bx} y={by} width={bwid} height={bh} rx={rad} fill={today ? PURPLE : GRAY} />
            <text x={padL + i * bw + bw / 2} y={H - 10} fontSize={8} fill="#9AA1B8" textAnchor="middle">
              D-{d}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/** 일별 SLA 라인 차트 (목표선 포함) */
function DailyLine({ values, min, max, target, targetLabel }: {
  values: number[]; min: number; max: number; target: number; targetLabel: string;
}) {
  const W = 1240;
  const H = 200;
  const padL = 42;
  const padB = 28;
  const padT = 16;
  const bw = (W - padL - 16) / values.length;
  const x = (i: number) => padL + bw * i + bw / 2;
  const y = (v: number) => H - padB - ((v - min) / (max - min)) * (H - padB - padT);
  const path = values.map((v, i) => `${i === 0 ? 'M' : 'L'}${x(i)} ${y(v)}`).join(' ');
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={styles.wideSvg}>
      {[min, 70, 90, max].map((g) => (
        <g key={g}>
          <line x1={padL} y1={y(g)} x2={W - 8} y2={y(g)} stroke={TRACK} />
          <text x={padL - 6} y={y(g) + 3} fontSize={8} fill="#9AA1B8" textAnchor="end">{g}%</text>
        </g>
      ))}
      <line x1={padL} y1={y(target)} x2={W - 8} y2={y(target)} stroke={PURPLE} strokeWidth={1} strokeDasharray="4 3" />
      <text x={W - 10} y={y(target) - 4} fontSize={8} fill={PURPLE} textAnchor="end">{targetLabel}</text>
      <path d={path} fill="none" stroke={PURPLE} strokeWidth={2} />
      {values.map((v, i) => (
        <circle key={i} cx={x(i)} cy={y(v)} r={4} fill={v < target - 5 ? AMBER : PURPLE} />
      ))}
      {values.map((_, i) => (
        <text key={i} x={x(i)} y={H - 9} fontSize={8} fill="#9AA1B8" textAnchor="middle">
          D-{values.length - 1 - i}
        </text>
      ))}
    </svg>
  );
}

/** 반원 게이지 (조직별 SLA) */
function Gauge({ gauge }: { gauge: MfgDashGauge }) {
  const W = 230;
  const H = 150;
  const cx = 115;
  const cy = 132;
  const R = 88;
  const thick = 20;
  const col = gauge.tone === 'amber' ? AMBER : PURPLE;
  const ang = Math.PI * (1 - gauge.pct / 100);
  const px = cx + Math.cos(ang) * R;
  const py = cy - Math.sin(ang) * R;
  return (
    <div className={styles.gaugeWrap}>
      <svg width={W} height={H}>
        <path d={`M${cx - R} ${cy} A${R} ${R} 0 0 1 ${cx + R} ${cy}`} fill="none" stroke={TRACK} strokeWidth={thick} strokeLinecap="round" />
        <path d={`M${cx - R} ${cy} A${R} ${R} 0 0 1 ${px} ${py}`} fill="none" stroke={col} strokeWidth={thick} strokeLinecap="round" />
        <text x={cx} y={cy - 30} fontSize={28} fontWeight={800} fill={NAVY} textAnchor="middle">{gauge.pct}%</text>
        <text x={cx} y={cy - 8} fontSize={11} fill="#6B7391" textAnchor="middle">{gauge.label}</text>
      </svg>
    </div>
  );
}

export function MfgDashboard({ state, actions }: Props) {
  const [tab, setTab] = useState<'gen' | 'ai'>(state.tab);
  const [openHist, setOpenHist] = useState<string | null>(state.openFile ?? null);
  const [period, setPeriod] = useState(0);
  const [reportOpen, setReportOpen] = useState(false);

  useEffect(() => {
    setTab(state.tab);
    setOpenHist(state.openFile ?? null);
    setReportOpen(false);
  }, [state.tab, state.openFile]);

  const { gen, ai } = state;
  const activePeriod = ai.track.periods[period] ?? ai.track.periods[0];
  const trackTotal = activePeriod.done + activePeriod.doing + activePeriod.open;
  const donePct = Math.round((activePeriod.done / Math.max(trackTotal, 1)) * 100);
  const statusPill: Record<string, string> = { 해결: styles.pillPos, 조치중: styles.pillAmber, 미해결: styles.pillRed };

  return (
    <div>
      <div className={styles.stage}>
        <div className={styles.top}>
          <div className={styles.topTitle}>
            {state.title}
            <span>{state.subtitle}</span>
          </div>
          <div className={styles.tabs}>
            <button type="button" className={cn(styles.tab, tab === 'gen' && styles.on)} onClick={() => setTab('gen')}>
              운영 지표
            </button>
            <button type="button" className={cn(styles.tab, tab === 'ai' && styles.on)} onClick={() => setTab('ai')}>
              AI 운영지표 · NOA
            </button>
          </div>
        </div>

        <div className={styles.body}>
          {tab === 'gen' ? (
            <>
              <div className={styles.toprow}>
                <InsightCard insight={gen.insight} onCta={() => setTab('ai')} />
                <div className={styles.kpis}>
                  {gen.kpis.map((kpi) => (
                    <KpiCard key={kpi.label} kpi={kpi} />
                  ))}
                </div>
              </div>

              <SecTag kind="today" label="당일 현황" desc="현재 시점 스냅샷" />

              <div className={styles.card}>
                <CardHd title="문서 자산성" sub={gen.docHeatmap.sub} />
                <div className={styles.row2b}>
                  <div>
                    <div className={styles.subH}>거래처 × 문서 유형 (셀 농도 = 건수)</div>
                    <Heatmap heat={gen.docHeatmap.heat} />
                  </div>
                  <div>
                    <div className={styles.subH}>
                      파일 히스토리 추적 <span className={styles.subHFaint}>· 문서 선택 시 이력 전개</span>
                    </div>
                    {gen.fileHist.map((f) => {
                      const open = openHist === f.name;
                      return (
                        <div key={f.name} className={cn(styles.histRow, open && styles.histOpen)}>
                          <div className={styles.histHd} onClick={() => setOpenHist(open ? null : f.name)}>
                            <div className={styles.histInfo}>
                              <div className={styles.histN}>{f.name}</div>
                              <div className={styles.histM}>{f.meta}</div>
                            </div>
                            <span className={styles.histArrow}>▶</span>
                          </div>
                          <div className={styles.histTl}>
                            {f.timeline.map((t) => (
                              <div key={t.ev + t.meta} className={styles.tlItem}>
                                <span className={styles.tlIc} />
                                <div>
                                  <div className={styles.tlEv}>{t.ev}</div>
                                  <div className={styles.tlMeta}>{t.meta}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className={styles.row2}>
                <div className={styles.card}>
                  <CardHd title="연결성" sub={gen.rooms.sub} />
                  <RoomBars bars={gen.rooms.bars} />
                  {gen.rooms.note && <div className={styles.chartCap}>{gen.rooms.note}</div>}
                </div>
                <div className={styles.card}>
                  <CardHd title="담당자 활동·편중" sub={gen.agents.sub} />
                  <Rings rings={gen.agents.rings} colors={SHARE_RING_COLORS} />
                </div>
              </div>

              <div className={styles.card}>
                <CardHd title="리스크 파일 감사 이력" sub={gen.audit.sub} />
                <table className={styles.tbl}>
                  <thead>
                    <tr><th>파일</th><th>유형</th><th>수신</th><th>수신처</th></tr>
                  </thead>
                  <tbody>
                    {gen.audit.rows.map((r) => (
                      <tr key={r.file}>
                        <td><b>{r.file}</b></td>
                        <td><span className={cn(styles.pill, styles.pillNavy)}>{r.type}</span></td>
                        <td>{r.recv}</td>
                        <td>{r.count}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <SecTag kind="period" label="기간 추이" desc="일별 흐름" />

              <div className={styles.card}>
                <CardHd title="일별 메시지량" sub={gen.dailyBars.sub} />
                <DailyBars values={gen.dailyBars.values} max={gen.dailyBars.max} />
              </div>
            </>
          ) : (
            <>
              <div className={styles.toprow}>
                <InsightCard insight={ai.insight} onCta={() => setReportOpen(true)} />
                <div className={styles.kpis}>
                  {ai.kpis.map((kpi) => (
                    <KpiCard key={kpi.label} kpi={kpi} />
                  ))}
                </div>
              </div>

              <SecTag kind="today" label="당일 현황" desc="현재 시점 리스크·품질" />

              <div className={styles.card}>
                <CardHd title="리스크 판정" aiTag="SLA" sub={ai.slaRisk.sub} />
                <Heatmap heat={ai.slaRisk.heat} />
              </div>

              <div className={styles.card}>
                <CardHd title="서비스 품질" aiTag="SLA" sub={ai.quality.sub} />
                <div className={styles.row2b}>
                  <div>
                    <div className={styles.subH}>조직별 SLA 준수율</div>
                    <div className={styles.gaugeRow}>
                      {ai.quality.gauges.map((g) => (
                        <Gauge key={g.label} gauge={g} />
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className={styles.subH}>담당자별 SLA 준수율</div>
                    <Rings rings={ai.quality.rings} colors={SLA_RING_COLORS} />
                  </div>
                </div>
              </div>

              <SecTag kind="period" label="기간 추이" desc="일별·기간별 흐름" />

              <div className={styles.card}>
                <CardHd title="일별 SLA 준수율" sub={ai.dailyLine.sub} />
                <DailyLine {...ai.dailyLine} />
              </div>

              <div className={styles.card}>
                <CardHd title="조치 트래킹" aiTag="기간" sub={ai.track.sub} />
                <div className={styles.periodBtns}>
                  {ai.track.periods.map((p, i) => (
                    <button
                      key={p.key}
                      type="button"
                      className={cn(styles.periodBtn, period === i && styles.on)}
                      onClick={() => setPeriod(i)}
                    >
                      {p.key === '월' ? '지난달·이번달' : p.key}
                    </button>
                  ))}
                </div>
                <div className={styles.row2b}>
                  <div>
                    <div className={styles.trackTop}>
                      <span className={styles.subH}>{activePeriod.label}</span>
                      <span className={styles.trackPct}>
                        {donePct}%<span>조치 완료</span>
                      </span>
                    </div>
                    <div className={styles.splitBar}>
                      {activePeriod.done > 0 && (
                        <div style={{ width: `${(activePeriod.done / trackTotal) * 100}%`, background: POS }} />
                      )}
                      {activePeriod.doing > 0 && (
                        <div style={{ width: `${(activePeriod.doing / trackTotal) * 100}%`, background: AMBER }} />
                      )}
                      {activePeriod.open > 0 && (
                        <div style={{ width: `${(activePeriod.open / trackTotal) * 100}%`, background: RED }} />
                      )}
                    </div>
                    <div className={styles.splitLegend}>
                      <span><span className={styles.concDot} style={{ background: POS }} />해결 <b>{activePeriod.done}</b></span>
                      <span><span className={styles.concDot} style={{ background: AMBER }} />조치중 <b>{activePeriod.doing}</b></span>
                      <span><span className={styles.concDot} style={{ background: RED }} />미해결 <b>{activePeriod.open}</b></span>
                    </div>
                  </div>
                  <div>
                    {activePeriod.items.map((it) => (
                      <div key={it.name} className={styles.trackItem}>
                        <b>{it.name}</b>
                        <span className={styles.trackRight}>
                          <span className={styles.trackDelta}>
                            {it.before} → <b style={{ color: it.after < it.before ? POS : RED }}>{it.after}</b>
                          </span>
                          <span className={cn(styles.pill, statusPill[it.status])}>{it.status}</span>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className={styles.brief}>
                <div>
                  <div className={styles.briefT}>{ai.brief.title}</div>
                  <div className={styles.briefS}>{ai.brief.sub}</div>
                </div>
                <div className={styles.briefBtns}>
                  {ai.brief.secondaryLabel && (
                    <button type="button" className={cn(styles.bbtn, styles.bbtnX)}>{ai.brief.secondaryLabel}</button>
                  )}
                  <button type="button" className={cn(styles.bbtn, styles.bbtnP)} onClick={() => setReportOpen(true)}>
                    {ai.brief.primaryLabel}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        <div className={styles.footnote}>{tab === 'gen' ? gen.footnote : ai.footnote}</div>

        {reportOpen && (
          <div className={styles.ovl} onClick={() => setReportOpen(false)}>
            <div className={styles.report} onClick={(e) => e.stopPropagation()}>
              <div className={styles.rpHd}>
                <div className={styles.rpT}>{ai.brief.reportTitle}</div>
                <div className={styles.rpS}>{ai.brief.reportSub}</div>
                <button type="button" className={styles.rpX} onClick={() => setReportOpen(false)} aria-label="닫기">
                  ✕
                </button>
              </div>
              <div className={styles.rpBody}>
                {ai.brief.reportSections.map((sec) => (
                  <div key={sec.title} className={styles.rpSec}>
                    <div className={styles.rpSt}>{sec.title}</div>
                    {sec.lines.map((line) => (
                      <div key={line} className={styles.rpLine}>{line}</div>
                    ))}
                  </div>
                ))}
                <div className={styles.rpFoot}>{ai.brief.reportFoot}</div>
              </div>
            </div>
          </div>
        )}
      </div>
      {actions}
    </div>
  );
}
