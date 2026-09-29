import type { MfgArenaState, MfgKakaoItem, MfgPhoneDef, MfgWsMessage } from '@/cases/_types';

/**
 * STATE 안에서 새로 등장하는 줄(isNew)을 "박자(beat)" 단위로 순서를 매긴다.
 * 한 박자에 버블 하나 — 같은 메시지가 두 폰에 동시에 보이면(보낸 쪽·받은 쪽) 한 박자로 묶는다.
 *
 * 순서: 줄의 순서용 시각(at, 없으면 time)을 HH:MM 으로 읽어 오름차순.
 * 시각이 없는 줄은 같은 목록의 앞 줄 시각을 물려받고(없으면 뒤 줄), 목록 전체에 시각이 없으면 맨 뒤.
 * 같은 시각이면 워크스페이스(관리자 행동)가 먼저, 그다음 폰 왼쪽→오른쪽 · 목록 안 순서를 따른다.
 */

export interface Beat {
  sig: string;
  /** 도착 전 "입력 중…" 을 띄울 폰 id (상대가 보내는 메시지일 때) */
  typingPhones: string[];
  /** 이 박자가 나타나는 화면 — 폰 id 또는 'ws' */
  places: string[];
  label: string;
}

/** 탭이 있는 폰은 처음 선택된 탭 내용을 덮어 본다 */
export function phoneView(phone: MfgPhoneDef, tabId = phone.activeTab): MfgPhoneDef {
  const tab = phone.tabs?.find((t) => t.id === tabId);
  return tab ? { ...phone, ...tab.phone } : phone;
}

export function kakaoSig(phoneId: string, item: MfgKakaoItem): string {
  return item.kind === 'message' || item.kind === 'file'
    ? `m|${item.senderId}|${item.text}`
    : `p|${phoneId}|${item.id}`;
}

export function wsSig(msg: MfgWsMessage): string {
  return `w|${msg.id}`;
}

function minutes(t?: string): number | undefined {
  const m = t?.match(/(\d{1,2}):(\d{2})\s*$/);
  return m ? Number(m[1]) * 60 + Number(m[2]) : undefined;
}

interface Entry {
  sig: string;
  at?: number;
  list: number;
  pos: number;
  typingPhone?: string;
  place: string;
  label: string;
}

function assignTimes(entries: Entry[]): void {
  // 시각 없는 줄: 앞 줄 시각 → 없으면 뒤 줄 시각
  let prev: number | undefined;
  for (const e of entries) {
    if (e.at === undefined) e.at = prev;
    else prev = e.at;
  }
  let next: number | undefined;
  for (let i = entries.length - 1; i >= 0; i -= 1) {
    const e = entries[i];
    if (e.at === undefined) e.at = next;
    else next = e.at;
  }
}

export function buildBeats(state: MfgArenaState, skip: Set<string> = new Set()): Beat[] {
  const all: Entry[] = [];
  state.phones.forEach((raw, list) => {
    const phone = phoneView(raw);
    const entries: Entry[] = [];
    (phone.items ?? []).forEach((item, pos) => {
      if (!item.isNew) return;
      const sig = kakaoSig(raw.id, item);
      const incoming = item.kind === 'message' && !!item.senderId && item.senderId !== phone.ownerId;
      entries.push({
        sig,
        at: minutes(item.at ?? item.time),
        list,
        pos,
        typingPhone: incoming ? raw.id : undefined,
        place: raw.id,
        label: `${raw.id}: ${item.text ?? item.id}`,
      });
    });
    assignTimes(entries);
    all.push(...entries);
  });
  const wsEntries: Entry[] = [];
  (state.workspace?.messages ?? []).forEach((msg, pos) => {
    if (!msg.isNew) return;
    wsEntries.push({
      sig: wsSig(msg),
      at: minutes(msg.at ?? msg.time),
      list: -1,
      pos,
      place: 'ws',
      label: `ws: ${msg.text ?? msg.id}`,
    });
  });
  assignTimes(wsEntries);
  all.push(...wsEntries);

  all.sort(
    (a, b) =>
      (a.at ?? Number.POSITIVE_INFINITY) - (b.at ?? Number.POSITIVE_INFINITY) || a.list - b.list || a.pos - b.pos,
  );

  const beats: Beat[] = [];
  const bySig = new Map<string, Beat>();
  for (const e of all) {
    if (skip.has(e.sig)) continue;
    const existing = bySig.get(e.sig);
    if (existing) {
      if (e.typingPhone) existing.typingPhones.push(e.typingPhone);
      if (!existing.places.includes(e.place)) existing.places.push(e.place);
      continue;
    }
    const beat: Beat = {
      sig: e.sig,
      typingPhones: e.typingPhone ? [e.typingPhone] : [],
      places: [e.place],
      label: e.label,
    };
    bySig.set(e.sig, beat);
    beats.push(beat);
  }
  return beats;
}
