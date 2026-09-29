import { type ReactNode } from 'react';
import type { ChapterStateNode } from '@/cases/_types';
import { MfgArena } from './MfgArena';
import { MfgOverseas } from './MfgOverseas';
import { MfgDashboard } from './MfgDashboard';
import { MfgValueStrip } from './MfgValueStrip';
import { StepCaption } from './StepCaption';

interface Props {
  state: ChapterStateNode;
  actions?: ReactNode;
  autoplay?: boolean;
  /** 안내·테이크오버 오버레이가 떠 있음 — → 키를 러너에 양보한다 */
  overlay?: boolean;
  /** 버블을 순서대로 내보내는 중이거나 액션이 남아 있으면 true — 러너가 자동재생을 멈춘다 */
  onBusyChange?: (busy: boolean) => void;
}

/**
 * 제조/유통 공통 골격(cowork-manufacturing) 단일 디스패처 stage.
 * 노드에 들어있는 mfg* 필드를 보고 알맞은 화면(아레나/해외 멀티 메신저/대시보드)을 고르고,
 * 3대 요건 스트립(mfgValueStrip)을 무대 아래 상시 노출한다.
 * 진행은 화살표 키·상단 도트로만 — 하단 '다음 STATE' 액션 바는 렌더하지 않는다.
 */
export function StageManufacturing({ state, autoplay, overlay, onBusyChange }: Props) {
  const tail = state.mfgValueStrip ? <MfgValueStrip value={state.mfgValueStrip} /> : null;
  const caption = state.mfgCaption;

  let body: ReactNode;
  if (state.mfgArena) {
    body = <MfgArena state={state.mfgArena} actions={tail} autoplay={autoplay} overlay={overlay} onBusyChange={onBusyChange} caption={caption} />;
  } else if (state.mfgOverseas) {
    body = <MfgOverseas state={state.mfgOverseas} actions={tail} />;
  } else if (state.mfgDashboard) {
    body = (
      <>
        {caption && (
          <StepCaption
            title={caption.title ?? ''}
            text={caption.before}
            when={caption.when}
            jump={caption.jump}
            hint={state.memo?.interact}
          />
        )}
        <MfgDashboard state={state.mfgDashboard} actions={tail} />
      </>
    );
  } else {
    body = (
      <div style={{ padding: 24, color: 'var(--muted)', textAlign: 'center' }}>
        manufacturing 화면 데이터가 없습니다.
      </div>
    );
  }

  return <>{body}</>;
}
