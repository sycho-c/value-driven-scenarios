import { type ReactNode, useEffect, useState } from 'react';
import type { MfgDashAccount, MfgDashboardState } from '@/cases/_types';
import { cn } from '@/lib/cn';
import styles from './MfgDashboard.module.css';

interface Props {
  state: MfgDashboardState;
  actions?: ReactNode;
}

function AccountBar({ account, open, onToggle }: {
  account: MfgDashAccount;
  open: boolean;
  onToggle: () => void;
}) {
  const drillable = !!account.members?.length;
  return (
    <div className={styles.acctWrap}>
      <div className={styles.barRow}>
        <div
          className={cn(styles.barName, drillable && styles.click)}
          onClick={drillable ? onToggle : undefined}
        >
          {drillable ? (open ? '▾ ' : '▸ ') : ''}
          {account.name}
        </div>
        <div
          className={cn(styles.barTrack, drillable && styles.click)}
          onClick={drillable ? onToggle : undefined}
        >
          <div
            className={styles.barFill}
            style={{
              width: `${account.pct}%`,
              background: `linear-gradient(90deg, ${account.color}aa, ${account.color})`,
            }}
          >
            {account.pct}%
          </div>
        </div>
      </div>
      {drillable && (
        <div className={cn(styles.drill, open && styles.open)}>
          {open && account.members && (
            <div className={styles.drillInner}>
              <div className={styles.drillKpis}>
                <div className={styles.drillKpi}>
                  <div className={styles.drillKpiV}>{account.msg}</div>
                  <div className={styles.drillKpiL}>총 대화</div>
                </div>
                <div className={styles.drillKpi}>
                  <div className={styles.drillKpiV}>{account.files}</div>
                  <div className={styles.drillKpiL}>총 파일</div>
                </div>
                {account.members.map((m) => (
                  <div key={m.name} className={styles.drillKpi}>
                    <div className={styles.drillKpiV}>{m.files}</div>
                    <div className={styles.drillKpiL}>{m.name} 파일</div>
                  </div>
                ))}
              </div>
              <div className={styles.drillLabel}>담당자별 대화량</div>
              {account.members.map((m) => (
                <div key={m.name} className={styles.barRow}>
                  <div className={styles.barName} style={{ width: 96 }}>
                    {m.name}
                  </div>
                  <div className={styles.barTrack} style={{ height: 16 }}>
                    <div
                      className={styles.barFill}
                      style={{
                        width: `${Math.round((m.msg / (account.msg || 1)) * 100)}%`,
                        background: `linear-gradient(90deg, ${account.color}aa, ${account.color})`,
                      }}
                    >
                      {m.msg}건
                    </div>
                  </div>
                </div>
              ))}
              <div className={styles.drillNote}>
                ※ 최근 문서 — {account.members.map((m) => `${m.name}: ${m.lastDoc}`).join(' · ')}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function MfgDashboard({ state, actions }: Props) {
  const [openAccounts, setOpenAccounts] = useState<Set<string>>(
    () => new Set(state.openAccount ? [state.openAccount] : []),
  );

  useEffect(() => {
    setOpenAccounts(new Set(state.openAccount ? [state.openAccount] : []));
  }, [state.openAccount]);

  const toggleAccount = (name: string) => {
    setOpenAccounts((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  };

  return (
    <div>
      <div className={styles.stage}>
        <div className={styles.hdr}>
          <div className={styles.hdrTitle}>📊 {state.headerTitle}</div>
          <div className={styles.hdrBadge}>👔 이윤 관리자 · 대시보드 권한</div>
        </div>

        <div className={styles.tabs}>
          <button type="button" className={cn(styles.tab, state.tab === 'gen' && styles.on)}>
            📈 운영 지표
          </button>
          <button type="button" className={cn(styles.tab, state.tab === 'ai' && styles.on)}>
            🤖 {state.aiTabLabel ?? 'AI 운영지표'}
            {state.aiTabSlotTag && <span className={styles.slotTag}>{state.aiTabSlotTag}</span>}
          </button>
        </div>

        <div className={styles.body}>
          {state.tab === 'gen' ? (
            <>
              <div className={styles.kpis}>
                {state.kpis.map((kpi) => (
                  <div key={kpi.label} className={styles.kpi}>
                    <div
                      className={cn(
                        styles.kpiV,
                        kpi.tone === 'good' && styles.good,
                        kpi.tone === 'muted' && styles.mutedV,
                      )}
                    >
                      {kpi.value}
                    </div>
                    <div className={styles.kpiL}>
                      {kpi.label}
                      {kpi.tag && (
                        <span className={cn(styles.kpiTag, kpi.tagTone === 'est' && styles.est)}>
                          {kpi.tag}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {state.risk && (
                <div className={styles.riskPanel}>
                  <div className={styles.riskHd}>🔒 {state.risk.title}</div>
                  <div className={styles.riskSub}>{state.risk.sub}</div>
                  <div>
                    <div className={cn(styles.riskRow, styles.head)}>
                      <div>문서</div>
                      <div>공유처</div>
                      <div>수신자</div>
                      <div>등급</div>
                    </div>
                    {state.risk.rows.map((row) => (
                      <div key={row.doc} className={styles.riskRow}>
                        <div className={styles.riskDoc}>
                          <span
                            className={cn(styles.rlvl, row.level === 'hi' ? styles.rlvlHi : styles.rlvlMd)}
                          />
                          {row.doc}
                        </div>
                        <div>{row.org}</div>
                        <div>{row.person}</div>
                        <div>
                          <span className={cn(styles.riskBadge, styles[row.level])}>{row.badge}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  {state.risk.note && <div className={styles.riskNote}>{state.risk.note}</div>}
                </div>
              )}

              {state.fileTypes && (
                <>
                  <div className={styles.sec}>📁 파일 유형별 공유 건수</div>
                  <div className={styles.typeGrid}>
                    {state.fileTypes.map((t) => (
                      <div key={t.name} className={styles.typeChip}>
                        <div
                          className={styles.typeIco}
                          style={{ background: t.iconBg, color: t.iconColor }}
                        >
                          {t.icon}
                        </div>
                        <div className={styles.typeN}>{t.name}</div>
                        <div className={styles.typeC}>{t.count}</div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {state.versions && (
                <>
                  <div className={styles.sec}>
                    🔁 {state.versions.title}
                    {state.versions.sub && <span className={styles.secSub}>— {state.versions.sub}</span>}
                  </div>
                  <div className={styles.panel}>
                    {state.versions.rows.map((row) => (
                      <div key={row.name} className={styles.verRow}>
                        <div className={styles.verIco}>{row.icon}</div>
                        <div className={styles.verInfo}>
                          <div className={styles.verN}>{row.name}</div>
                          <div className={styles.verSub}>{row.sub}</div>
                        </div>
                        <div className={styles.verCount}>
                          <span className={cn(styles.verBadge, row.hot && styles.hot)}>{row.badge}</span>
                          <span className={styles.verLatest}>{row.latest}</span>
                        </div>
                      </div>
                    ))}
                    {state.versions.note && <div className={styles.riskNote}>{state.versions.note}</div>}
                  </div>
                </>
              )}

              {state.ranking && (
                <>
                  <div className={styles.sec}>
                    🏆 {state.ranking.title}
                    {state.ranking.sub && <span className={styles.secSub}>— {state.ranking.sub}</span>}
                  </div>
                  <div className={styles.panel}>
                    {state.ranking.rows.map((row) => (
                      <div key={row.no} className={styles.rankRow}>
                        <div className={cn(styles.rankNo, row.no === 1 && styles.top)}>{row.no}</div>
                        <div className={styles.rankName}>{row.name}</div>
                        <div className={styles.rankStats}>
                          <div className={styles.rankStat}>
                            <div className={styles.rankStatV}>{row.msg}</div>
                            <div className={styles.rankStatL}>대화</div>
                          </div>
                          <div className={styles.rankStat}>
                            <div className={styles.rankStatV}>{row.files}</div>
                            <div className={styles.rankStatL}>파일</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {state.accounts && (
                <>
                  <div className={styles.sec}>
                    🏢 {state.accounts.title}
                    {state.accounts.sub && <span className={styles.secSub}>— {state.accounts.sub}</span>}
                  </div>
                  <div>
                    {state.accounts.rows.map((account) => (
                      <AccountBar
                        key={account.name}
                        account={account}
                        open={openAccounts.has(account.name)}
                        onToggle={() => toggleAccount(account.name)}
                      />
                    ))}
                  </div>
                  {state.accounts.note && <div className={styles.note}>{state.accounts.note}</div>}
                </>
              )}
            </>
          ) : (
            <>
              {state.aiSlot && (
                <div className={styles.aiSlot}>
                  <div className={styles.aiSlotHd}>🤖 {state.aiSlot.title}</div>
                  <div className={styles.aiSlotSub}>{state.aiSlot.sub}</div>
                </div>
              )}
              {(state.aiCards ?? []).map((card) => (
                <div key={card.title} className={styles.aiCard}>
                  <div className={styles.aiCardT}>
                    {card.icon} {card.title}
                    {card.tag && <span className={styles.aiTag}>{card.tag}</span>}
                  </div>
                  <div className={styles.aiCardD}>{card.desc}</div>
                </div>
              ))}
              {state.aiNote && <div className={styles.note}>{state.aiNote}</div>}
            </>
          )}
        </div>
      </div>
      {actions}
    </div>
  );
}
