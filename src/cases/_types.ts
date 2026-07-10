export type CastRole = 'guest' | 'br' | 'admin' | 'other';

export interface CastMember {
  id: string;
  initial: string;
  color: string;
  role: CastRole;
  label: string;
  avatarSrc?: string;
  shortLabel?: string;
  org?: string;
}

export type ChatBubbleSide = 'mine' | 'other' | 'system';

export type ChatLineKind =
  | 'message'
  | 'system'
  | 'date'
  | 'separator'
  | 'url-card'
  | 'bizform-card'
  | 'locked'
  | 'notice'
  | 'typing';

export type EntranceMotion = 'fade' | 'slide-side' | 'pop';

export interface ChatLine {
  id?: string;
  kind: ChatLineKind;
  text?: string;
  senderId?: string;
  side?: ChatBubbleSide;
  time?: string;
  isNew?: boolean;
  meta?: Record<string, unknown>;
  revealDelayMs?: number;
  typingFor?: number;
  entranceMotion?: EntranceMotion;
  persist?: boolean;
  pulseOnReveal?: boolean;
}

export interface PushNotification {
  id: string;
  room: string;
  sender?: string;
  preview: string;
  unread?: number;
  urgent?: boolean;
  revealDelayMs?: number;
}

export type PhoneScreenType =
  | 'kakao-1to1'
  | 'kakao-group'
  | 'wontalk-group'
  | 'friends-search'
  | 'bizform'
  | 'tasks'
  | 'secret-input'
  | 'auth-sms'
  | 'channel-message'
  | 'share-sheet'
  | 'context-menu'
  | 'lock-screen'
  | 'private-app';

export type PhoneHeaderVariant = 'kakao' | 'consult-yellow' | 'cowork-badge';
export type ChannelResultTone = 'good' | 'warn' | 'danger' | 'brand';

export interface PhoneScreen {
  type: PhoneScreenType;
  headerTitle?: string;
  headerSubtitle?: string;
  pushNotifications?: PushNotification[];
  messages?: ChatLine[];
  meta?: Record<string, unknown>;
  channelLabel?: string;
  channelProduct?: string;
  resultBadge?: { tone: ChannelResultTone; text: string };
  headerVariant?: PhoneHeaderVariant;
}

export type ChipKind = 'guest' | 'br' | 'admin' | 'system' | 'kakao';

export interface PresetChip {
  id: string;
  text: string;
  kind: ChipKind;
  nextStateIndex?: number;
  trigger?: string;
  disabled?: boolean;
}

export type WorkspaceMode = 'chat' | 'dashboard' | 'tasks' | 'console';

export type OperatorPanelKind =
  | 'auto-assign'
  | 'tracking-code'
  | 'new-task'
  | 'audit-log'
  | 'compliance';

export interface OperatorPanelCard {
  id: string;
  kind: OperatorPanelKind;
  title: string;
  body: string;
  meta?: string;
  tone?: 'good' | 'brand' | 'warn' | 'danger' | 'muted';
  highlight?: string;
}

export interface WorkspaceState {
  mode: WorkspaceMode;
  sidebar?: {
    activeRoom: string;
    rooms: Array<{ id: string; label: string; unread?: number }>;
  };
  chat?: {
    title: string;
    participants: number;
    messages: ChatLine[];
    notice?: { text: string; readCount?: number; totalCount?: number };
  };
  dashboard?: DashboardState;
  console?: WonTalkConsoleState;
  operatorPanel?: OperatorPanelCard[];
}

export interface WonTalkConsoleState {
  activeTab: 'ag' | 'br';
  /** Drilldown panel: AG ID to auto-expand */
  expandedAgId?: string;
  /** Modal overlay id to show (msg/time/sla/sec/file/ag/br/<brId>) */
  openModalId?: string;
  /** Optional override for date range label in topbar */
  dateRangeLabel?: string;
  /** Optional badge in topbar title (e.g. AG별/BR별) */
  topbarTag?: string;
}

export interface DashboardSummaryCard {
  label: string;
  value: string;
  sub?: string;
  trend?: 'up' | 'down' | 'neutral';
}

export interface DashboardRow {
  id: string;
  name: string;
  sub?: string;
  value: number;
  unit?: string;
  percent: number;
  color: string;
}

export interface DashboardState {
  activeTab: 'ag' | 'br';
  tabs: Array<{ id: 'ag' | 'br'; label: string }>;
  summary: DashboardSummaryCard[];
  rows: DashboardRow[];
  rowsTitle: string;
  rowsMeta?: string;
}

export interface MemoSection {
  title: string;
  meta?: string;
  situation: string;
  interact: string;
  feel: string[];
  connect: string[];
}

export type RevealRhythm = 'snappy' | 'natural' | 'cinematic';

export type MomentKind =
  | 'price-flash'
  | 'auto-mapping'
  | 'file-blocked'
  | 'delivery-status'
  | 'auto-viz'
  | 'typing-error'
  | 'flying-particles'
  | 'dashboard-countup'
  | 'drilldown-popup';

export interface MomentDef {
  kind: MomentKind;
  payload?: Record<string, unknown>;
}

export type TakeoverTone = 'danger' | 'warn' | 'brand' | 'good';

export interface TakeoverDef {
  tone: TakeoverTone;
  eyebrow: string;
  headline: string;
  sub?: string;
  ctaLabel?: string;
}

export type PhoneFrameTone = 'neutral' | 'warn' | 'error' | 'success';

export interface PhoneFrameDef {
  tone: PhoneFrameTone;
  topBanner?: string;
}

export interface GalleryCardDef {
  id: string;
  icon: string;
  title: string;
  limit: string;
  solution: string;
  tag: string;
  tone?: 'self' | 'kakao' | 'progress';
  pulse?: boolean;
}

// ───────────────────────── SK렌터카 (rentacar · Cowork+) ─────────────────────────

export type RcChannel = 'phone' | 'kakao' | 'sms';

/** Ch.0 / Ch.3 — SK렌터카 Cowork+ 관리자 대시보드 */
export type RcKpiTone = 'ok' | 'warn' | 'danger';
export interface RcKpiCard {
  label: string;
  value: string;
  sub: string;
  tone: RcKpiTone;
}
export interface RcDonutSeg {
  label: string;
  percent: number;
  color: string;
}
export interface RcBarRow {
  label: string;
  percent: number;
  valueText: string;
  tone: 'brand' | 'warn' | 'danger' | 'muted' | 'good';
}
export interface RcLinePoint {
  label: string;
  valueText: string;
  /** 0~1 height ratio */
  ratio: number;
}
export interface RcRiskCard {
  value: string;
  desc: string;
  tone: 'hot' | 'warm' | 'ok';
  drillLabel?: string;
}
export interface RcHandoffRow {
  name: string;
  clients: string;
  date: string;
  status: 'done' | 'progress' | 'pending';
}
export type RcDashTabId = 'talk' | 'asset' | 'revenue' | 'risk';
export interface RentacarDashboardState {
  title: string;
  meta: string;
  realtimeLabel?: string;
  /** Ch.3 S3 — 'SK렌터카' 라벨을 '[귀사명]' 으로 전환 */
  companyPlaceholder?: string;
  kpis: RcKpiCard[];
  activeTab: RcDashTabId;
  tabs: Array<{ id: RcDashTabId; label: string }>;
  /** talk 탭 */
  donut?: { total: string; segs: RcDonutSeg[] };
  zeroContact?: { value: string; sub: string; bars: RcBarRow[]; note?: string };
  /** asset 탭 */
  assetGap?: {
    donePercent: number;
    doneLabel: string;
    gapLabel: string;
    note?: string;
    causeTitle?: string;
    causes?: RcBarRow[];
    actionNote?: string;
    highlight?: boolean;
  };
  /** revenue 탭 */
  convTitle?: string;
  convBars?: RcBarRow[];
  convNote?: string;
  convLine?: { points: RcLinePoint[]; note?: string };
  coachingNote?: string;
  /** risk 탭 */
  risks?: RcRiskCard[];
  handoffTitle?: string;
  handoff?: RcHandoffRow[];
  handoffNote?: string;
}

/** Ch.2 S2~S4 — STT 통화 split */
export interface SttScriptLine {
  atMs: number;
  text: string;
}
export interface SttMappingTag {
  atMs: number;
  label: string;
}
export interface RcCossStep {
  id: string;
  label: string;
}
export interface RentacarSttState {
  callerName: string;
  callerPhone: string;
  agentLabel: string;
  customerLabel: string;
  autoEndMs: number;
  script: SttScriptLine[];
  highlights: string[];
  mappingTags: SttMappingTag[];
  cossSteps: RcCossStep[];
  cossSummary: string;
  startLabel?: string;
}

/** Ch.2 S1 — 채널 통합 타임라인 (Before/After) */
export interface RcTimelineDetailLine {
  side: 'in' | 'out' | 'stt';
  text: string;
}
export interface RcTimelineEntry {
  channel: RcChannel;
  title: string;
  preview: string;
  date: string;
  detailLines?: RcTimelineDetailLine[];
}
export interface RcTimelineSilo {
  channel: RcChannel;
  title: string;
  body: string[];
  dark?: boolean;
}
export interface RentacarTimelineState {
  mode: 'before' | 'after';
  desc?: string;
  customerName: string;
  customerPhone: string;
  customerMeta?: string;
  stats?: Array<{ value: string; label: string; good?: boolean }>;
  silos?: RcTimelineSilo[];
  beforeNote?: string;
  entries?: RcTimelineEntry[];
}

/** Ch.1 S2 — 퇴사 시뮬레이션 (Before/After) */
export interface RcHistItem {
  channel: RcChannel;
  title: string;
  detail: string;
  date: string;
}
export interface RentacarAttritionState {
  mode: 'before' | 'after';
  desc?: string;
  customerName: string;
  customerPhone: string;
  deactName: string;
  deactClients: string;
  deactDate: string;
  histItems: RcHistItem[];
  cossTags: string[];
  bubble: string;
  reaction: string;
}

/** Ch.1 S0/S1/S3 — 단일 패널 화면 */
export interface RcQuestionChoice {
  id: string;
  label: string;
  hint?: string;
}
export interface RcRiskSummaryItem {
  icon: string;
  title: string;
  value: string;
  desc: string;
  tone: 'danger' | 'warn' | 'brand';
}
export interface RentacarPanelState {
  view: 'question' | 'empty-coss' | 'risk-summary';
  /** question */
  question?: string;
  questionSub?: string;
  choices?: RcQuestionChoice[];
  /** empty-coss */
  cossTitle?: string;
  cossMeta?: string;
  cossHint?: string;
  searchName?: string;
  /** risk-summary */
  riskTitle?: string;
  riskItems?: RcRiskSummaryItem[];
  riskRootCause?: string;
}

export interface ChapterStateNode {
  index: number;
  activeCastId?: string;
  activeCastIds?: string[];
  phones?: Record<string, PhoneScreen>;
  workspace?: WorkspaceState;
  desktop?: DesktopState;
  salesbridge?: SalesBridgeState;
  mobilePcSplit?: MobilePCSplitState;
  execDashboardFull?: ExecDashboardFullState;
  rentacarDashboard?: RentacarDashboardState;
  rentacarStt?: RentacarSttState;
  rentacarTimeline?: RentacarTimelineState;
  rentacarAttrition?: RentacarAttritionState;
  rentacarPanel?: RentacarPanelState;
  mfgArena?: MfgArenaState;
  mfgOverseas?: MfgOverseasState;
  mfgDashboard?: MfgDashboardState;
  mfgValueStrip?: MfgValueStripDef;
  guide?: string;
  memo?: MemoSection;
  presets?: PresetChip[];
  advanceOn?: AdvanceTrigger[];
  guideTooltip?: GuideTooltipDef;
  pauseAfterMs?: number;
  revealRhythm?: RevealRhythm;
  takeover?: TakeoverDef;
  moment?: MomentDef;
  phoneFrame?: PhoneFrameDef;
  galleryCards?: GalleryCardDef[];
  galleryFooter?: string;
}

export interface AdvanceTrigger {
  target: string;
  nextStateIndex: number;
}

export interface GuideTooltipDef {
  target: string;
  arrow?: 'top' | 'bottom' | 'left' | 'right';
  offsetX?: number;
  offsetY?: number;
  text: string;
}

export type DesktopMessageKind =
  | 'message'
  | 'date'
  | 'system'
  | 'deleted'
  | 'file'
  | 'file-captured'
  | 'image-capture';

export interface DesktopMessage {
  id?: string;
  kind: DesktopMessageKind;
  text?: string;
  sender?: string;
  senderColor?: string;
  isMine?: boolean;
  time?: string;
  readBy?: string;
  fileName?: string;
  fileSize?: string;
  fileNote?: string;
  fileType?: 'xls' | 'png' | 'pdf' | 'doc';
  clickableFileId?: string;
  revealDelayMs?: number;
  typingFor?: number;
  entranceMotion?: EntranceMotion;
  persist?: boolean;
  pulseOnReveal?: boolean;
  senderAvatarSrc?: string;
  senderCastId?: string;
  imageCaption?: string;
  imageLines?: string[];
  imageHighlight?: { text: string; tone: 'danger' | 'brand' };
}

export type KakaoWindowVariant = 'normal' | 'urgent';

export interface KakaoPCWindowState {
  id: string;
  title: string;
  participants?: string;
  participantsCount?: number;
  variant?: KakaoWindowVariant;
  visible?: boolean;
  position: { top: number; left: number; zIndex?: number };
  messages: DesktopMessage[];
  preset?: { text: string; nextStateIndex: number };
}

export interface ExcelRow {
  id?: string;
  label: string;
  cells: Array<{ text: string; bold?: boolean; price?: boolean }>;
  tone?: 'miu' | 'daedong' | 'plain';
  highlight?: boolean;
}

export interface QuotePopupState {
  visible: boolean;
  title: string;
  subtitle: string;
  rows: Array<{ code: string; name: string; price: string; quantity: string; danger?: boolean }>;
  note?: string;
}

export interface ExcelWindowState {
  fileName: string;
  cellRef: string;
  formula: string;
  headerTitle: string;
  rows: ExcelRow[];
  quotePopup?: QuotePopupState;
}

export interface ChatListItem {
  id: string;
  name: string;
  preview: string;
  time: string;
  badge?: number;
  avatar: 'daedong' | 'miu' | 'rims' | 'keumho' | 'kang' | 'park' | 'boss';
  icon: string;
  active?: boolean;
  pulse?: boolean;
}

export interface PCToast {
  id: string;
  from: string;
  room: string;
  text: string;
  variant?: 'normal' | 'urgent' | 'boss';
  pulse?: boolean;
}

export interface TaskbarApp {
  id: string;
  icon: string;
  label: string;
  active?: boolean;
}

export interface DesktopState {
  clockTime: string;
  clockDate: string;
  excel: ExcelWindowState;
  kakaoWindows: KakaoPCWindowState[];
  chatList: ChatListItem[];
  toasts: PCToast[];
  activeWindowId?: string;
  taskbarApps: TaskbarApp[];
}

export interface PartnerListItem {
  id: string;
  label: string;
  sub?: string;
  badge?: number;
  pulse?: boolean;
  status?: 'live' | 'normal' | 'muted';
}

export type SalesBridgeMainKind =
  | 'empty'
  | 'live-counter'
  | 'chat'
  | 'noa-admin'
  | 'exec-dashboard';

export interface NoaHeatmapCell {
  partnerId: string;
  riskId: string;
  value: number;
  tone: 'lv1' | 'lv2' | 'lv3' | 'lv4' | 'lv5';
  pulse?: boolean;
}

export interface NoaConversationCardDef {
  partnerLabel: string;
  convId: string;
  summary: string;
  coreInsight: string;
  riskCause: string;
  actionTitle: string;
  actionDesc: string;
  actionCtaLabel: string;
  actionApplied?: boolean;
}

export interface NoaTreemapItem {
  id: string;
  label: string;
  value: number;
  tone: 'lv3' | 'lv4' | 'lv5';
}

export interface NoaTop5Item {
  rank: number;
  label: string;
  delta: string;
  highlight?: boolean;
}

export interface NoaAdminPanel {
  title: string;
  subtitle?: string;
  partners: Array<{ id: string; label: string }>;
  risks: Array<{ id: string; label: string }>;
  cells: NoaHeatmapCell[];
  treemap: NoaTreemapItem[];
  top5: NoaTop5Item[];
  conversationCard?: NoaConversationCardDef;
  conversationCardVisible?: boolean;
  successToast?: string;
}

export interface RadarAxis {
  id: string;
  label: string;
  value: number;
}

export interface ExecPriorityItem {
  rank: 1 | 2 | 3;
  title: string;
  tagLabel: string;
  tagTone: 'danger' | 'warn' | 'brand';
  body: string;
  highlight?: boolean;
}

export interface ExecSummaryCard {
  label: string;
  value: string;
  sub?: string;
  danger?: boolean;
}

export interface ExecPdfDoc {
  title: string;
  subtitle: string;
  meta: string;
  insights: Array<{ label: string; quote: string; action: string }>;
  qaTitle?: string;
  qaBullets: string[];
  footer: string;
}

export interface ExecDashboardPanel {
  title: string;
  subtitle?: string;
  summary: ExecSummaryCard[];
  radar: RadarAxis[];
  radarNote?: string;
  priorities: ExecPriorityItem[];
  pdfButtonPulse?: boolean;
  pdfModalVisible?: boolean;
  pdfDoc: ExecPdfDoc;
}

export interface SalesBridgeBubbleSender {
  id: string;
  label: string;
  initial: string;
  color: string;
  badge?: string;
  avatarSrc?: string;
  org?: string;
}

export interface SBMessageText {
  kind: 'text';
  id?: string;
  sender: SalesBridgeBubbleSender;
  isMine?: boolean;
  text: string;
  time?: string;
}

export interface SBMessageBizForm {
  kind: 'bizform';
  id?: string;
  sender: SalesBridgeBubbleSender;
  isMine?: boolean;
  title?: string;
  statusLabel?: string;
  fields: Array<{
    label: string;
    value: string;
    auto?: boolean;
    highlight?: boolean;
  }>;
  time?: string;
}

export interface SBMessageFileChoices {
  kind: 'file-choices';
  id?: string;
  sender: SalesBridgeBubbleSender;
  isMine?: boolean;
  title?: string;
  caption?: string;
  choices: Array<{
    id: string;
    name: string;
    note?: string;
    valid: boolean;
    pulse?: boolean;
  }>;
  time?: string;
}

export interface SBMessageAttachment {
  kind: 'attachment';
  id?: string;
  sender: SalesBridgeBubbleSender;
  isMine?: boolean;
  fileName: string;
  fileSize?: string;
  fileType?: 'xls' | 'png' | 'pdf' | 'doc';
  caption?: string;
  status?: 'sent' | 'draft';
  time?: string;
}

export interface SBMessageSystem {
  kind: 'system';
  id?: string;
  text: string;
  tone?: 'good' | 'warn' | 'brand';
}

export interface SBMessageDate {
  kind: 'date';
  id?: string;
  text: string;
}

export type SalesBridgeChatMessage =
  | SBMessageText
  | SBMessageBizForm
  | SBMessageFileChoices
  | SBMessageAttachment
  | SBMessageSystem
  | SBMessageDate;

export interface SalesBridgeChat {
  partnerLabel: string;
  partnerSub?: string;
  partnerAvatar?: string;
  partnerAvatarTone?: 'miu' | 'daedong' | 'rims' | 'keumho';
  guestBadge?: string;
  messages: SalesBridgeChatMessage[];
}

export interface SalesBridgeMain {
  kind: SalesBridgeMainKind;
  liveCounter?: {
    current: number;
    total: number;
    label: string;
    sublabel?: string;
    completedNote?: string;
  };
  chat?: SalesBridgeChat;
}

export interface PartnerInfoPanel {
  partnerName: string;
  partnerTone?: 'miu' | 'daedong' | 'rims' | 'keumho';
  contractPrice: { code: string; value: string };
  contractDate: string;
  recentHistory: Array<{ date: string; label: string; tone?: 'good' | 'warn' | 'plain' }>;
  partnerSize?: string;
  guestMessage?: string;
}

export interface BlockedFileModal {
  title: string;
  body: string;
  expectedPartner: string;
  actualPartner: string;
  correctFile: string;
  primaryLabel: string;
}

export interface ShareFailureModalDef {
  title: string;
  body: string;
  shareTargets: Array<{ name: string; icon: string; disabled?: boolean }>;
  note?: string;
  primaryLabel?: string;
}

export interface AutoVizModalDef {
  step?: 1 | 2 | 3;
  title: string;
  environmentBox: { title: string; left: string; right: string; warn: string };
  problemBox: { title: string; body: string };
  solutionBox: { title: string; body: string[] };
  ctaLabel?: string;
}

export interface DeliveryStatusBoxDef {
  title: string;
  rows: Array<{ id: string; label: string; status: 'ok' | 'warn' | 'fail' | 'pending'; note?: string }>;
}

export interface ComparisonBox {
  title: string;
  subtitle: string;
  rows: Array<{ label: string; ch1: string; ch2: string }>;
  variant?: 'side' | 'top-banner';
}

export interface SalesBridgeState {
  topBanner?: string;
  topMeta?: string;
  sosBanner?: { title: string; body: string };
  liveCounter?: { current: number; total: number; label: string };
  partnerList: PartnerListItem[];
  partnerListMeta?: string;
  activePartnerId?: string;
  mainContent: SalesBridgeMain;
  rightPanel?: PartnerInfoPanel;
  toast?: { title: string; body: string; tone?: 'system' | 'warn' };
  comparisonBox?: ComparisonBox;
  comparisonBanner?: ComparisonBox;
  deliveryStatus?: DeliveryStatusBoxDef;
  blockedFileModal?: BlockedFileModal;
  shareFailureModal?: ShareFailureModalDef;
  autoVizModal?: AutoVizModalDef;
  noaAdmin?: NoaAdminPanel;
  execDashboard?: ExecDashboardPanel;
  clockTime: string;
  clockDate: string;
  badgeMessage?: string;
}

export type StageVariant =
  | 'three-phones'
  | 'phone-workspace'
  | 'single-phone'
  | 'desktop-pc'
  | 'salesbridge-workspace'
  | 'mobile-pc-split'
  | 'exec-dashboard'
  | 'rentacar'
  | 'manufacturing';

/* ══════════════════════════════════════════════════════════════
 *  제조/유통 공통 골격 (cowork-manufacturing) 스테이지 타입
 *  신0~2·신3국내 = mfgArena / 신3해외 = mfgOverseas / 신4 = mfgDashboard
 * ══════════════════════════════════════════════════════════════ */

/** 무대 위 발화자 (폰 소유자·워크스페이스 발신자 공용) */
export interface MfgActor {
  id: string;
  name: string;
  initial: string;
  color: string;
}

export type MfgKakaoItemKind = 'date' | 'message' | 'file' | 'invite' | 'joined';

/** 카톡풍 폰 화면의 한 줄 (self 여부는 senderId === 폰 ownerId 로 결정) */
export interface MfgKakaoItem {
  id: string;
  kind: MfgKakaoItemKind;
  senderId?: string;
  text?: string;
  time?: string;
  /** kind 'invite' — 알림톡 초대 카드의 수신 거래처명 */
  inviteVendor?: string;
  /** kind 'invite' — 초대 채널명 */
  inviteChannel?: string;
  isNew?: boolean;
}

export type MfgPhoneBadge = 'company' | 'vendor' | 'channel';

export type MfgPhoneScreen = 'chat' | 'alert-list' | 'ios-home' | 'cowork-app';

export interface MfgPhoneDef {
  id: string;
  /** 이 폰의 시점 주인 (self 정렬 기준) */
  ownerId: string;
  ownerLabel: string;
  ownerSub: string;
  badge: MfgPhoneBadge;
  badgeLabel?: string;
  /** 회사 담당자 폰 — 보라 테두리 + '회사 담당자' 리본 */
  companyFrame?: boolean;
  headerTitle?: string;
  headerCount?: string;
  /** 상담톡 입장 후 보라 헤더 테마 */
  channelTheme?: boolean;
  screen?: MfgPhoneScreen;
  /** 상태바 시각 — 생략 시 items의 마지막 타임스탬프에서 유도 */
  statusTime?: string;
  items?: MfgKakaoItem[];
  /** screen 'cowork-app' — 입력창 상태 */
  appInput?: { text?: string; state: 'idle' | 'typing' | 'sent' };
  /** 발신 강조 펄스 */
  highlight?: boolean;
  /** 문제 강조 시 회색 처리 */
  dimmed?: boolean;
}

export interface MfgPainPopupDef {
  title: string;
  items: Array<{ heading: string; desc: string }>;
}

export type MfgWsMessageKind = 'system' | 'system-hi' | 'in' | 'out';

export interface MfgWsFileDef {
  icon: string;
  name: string;
  sub: string;
  state?: 'raw' | 'fixed' | 'plain';
  statusText?: string;
  statusTone?: 'fail' | 'ok';
  download?: boolean;
}

export interface MfgWsMessage {
  id: string;
  kind: MfgWsMessageKind;
  senderId?: string;
  /** 발신자 표기 오버라이드 (예: '알 수 없음') */
  senderLabel?: string;
  /** '상담톡 채널' | '상담톡 인입' | '모바일' | '외근 iOS 앱' */
  srcLabel?: string;
  text?: string;
  time?: string;
  /** '✓ 자산화됨' 등 메타 뱃지 */
  metaText?: string;
  /** 발신자 미표시 raw 연출 (아바타 '?' 회색) */
  senderUnknown?: boolean;
  badge?: { tone: 'raw' | 'fixed'; text: string };
  file?: MfgWsFileDef;
  /** 납기 확정 등 카드 */
  card?: { title: string; rows: Array<[string, string]> };
  isNew?: boolean;
}

export interface MfgWsRoom {
  id: string;
  name: string;
  preview?: string;
  color: string;
  active?: boolean;
}

export interface MfgWorkspaceDef {
  role?: 'br' | 'admin';
  headerTitle: string;
  headerSub?: string;
  rooms?: MfgWsRoom[];
  /** 사이드바 '대화방' 카운트 표기 (예: '· 57') */
  roomCount?: string;
  /** 사이드바 하단 노트 */
  sideNote?: string;
  messages: MfgWsMessage[];
}

export interface MfgArenaState {
  /** 'phones-only' = 신0 (폰 전체 화면) / 'split' = 폰 + 워크스페이스 */
  layout: 'phones-only' | 'split';
  phonesLabel?: string;
  phonesBadge?: string;
  actors: MfgActor[];
  phones: MfgPhoneDef[];
  /** '외 55개 거래처' 하단 슬롯 */
  moreSlot?: { title: string; sub: string };
  painPopup?: MfgPainPopupDef;
  workspace?: MfgWorkspaceDef;
  banner?: string;
}

/** 하단 고정 3대 요건 스트립 (셀링포인트 · 페인포인트 · ROI) */
export interface MfgValueStripDef {
  sell: string;
  pain: string;
  roi: string;
}

/* ── 신3 해외 멀티 메신저 ── */

export interface MfgOvsPhoneItem {
  id: string;
  side: 'partner' | 'me';
  text?: string;
  file?: { icon: string; name: string };
  time?: string;
  isNew?: boolean;
}

export interface MfgOvsChannelDef {
  id: string;
  tabLabel: string;
  tabSub: string;
  tabIcon: string;
  tabIconBg: string;
  partnerLabel: string;
  messengerTag: string;
  /** 'wa' = WhatsApp 테마 / 'wc' = WeChat 테마 */
  theme: 'wa' | 'wc';
  phoneHeader: string;
  phoneScreen: 'chat' | 'auth';
  phoneItems?: MfgOvsPhoneItem[];
  /** phoneScreen 'auth' — Authenticator 푸시 카드 */
  auth?: { title: string; app: string; num: string; hint: string; no: string; yes: string };
}

export interface MfgOvsWsMessage {
  id: string;
  side: 'in' | 'out';
  text: string;
  /** AI 번역문 라벨+내용 ('AI 번역(한국어): …' / 'AI 번역 · 원문(한국어): …') */
  transNote?: string;
  srcLabel?: string;
  time?: string;
  metaText?: string;
  card?: { title: string; rows: Array<[string, string]> };
  file?: { icon: string; name: string; sub: string };
  isNew?: boolean;
}

export type MfgOvsWsView = 'select' | 'mfa-intro' | 'mfa-wait' | 'mfa-ok' | 'chat';

export interface MfgOverseasState {
  banner?: string;
  phonesLabel?: string;
  headerTitle: string;
  headerSub?: string;
  channels: MfgOvsChannelDef[];
  activeChannelId?: string;
  wsView: MfgOvsWsView;
  /** mfa 단계에서 표시할 채널명·매칭번호 */
  mfa?: { channelName: string; messenger: string; num?: string; okText?: string };
  wsMessages?: MfgOvsWsMessage[];
  /** 하단 AI 번역 입력 바 */
  transBar?: { placeholder?: string; typed?: string; state: 'idle' | 'typing' | 'translating' };
  /** 완결 배너 */
  doneNote?: string;
}

/* ── 신4 관리자 대시보드 ── */

export interface MfgDashKpi {
  value: string;
  label: string;
  tag?: string;
  tagTone?: 'ok' | 'est';
  /** 숫자 색상 시맨틱 — 'good' 개선 지표(초록) / 'muted' 추정치(회색) / 기본 브랜드 보라 */
  tone?: 'good' | 'muted';
}

export interface MfgDashRiskRow {
  doc: string;
  level: 'hi' | 'md';
  org: string;
  person: string;
  badge: string;
}

export interface MfgDashTypeChip {
  icon: string;
  iconBg: string;
  iconColor: string;
  name: string;
  count: number;
}

export interface MfgDashVersionRow {
  icon: string;
  name: string;
  sub: string;
  badge: string;
  hot?: boolean;
  latest: string;
}

export interface MfgDashRankRow {
  no: number;
  name: string;
  msg: number;
  files: number;
}

export interface MfgDashAccountMember {
  name: string;
  msg: number;
  files: number;
  lastDoc: string;
}

export interface MfgDashAccount {
  name: string;
  pct: number;
  color: string;
  msg?: number;
  files?: number;
  members?: MfgDashAccountMember[];
}

export interface MfgDashAiCard {
  icon: string;
  title: string;
  desc: string;
  tag?: string;
}

export interface MfgDashboardState {
  tab: 'gen' | 'ai';
  headerTitle: string;
  aiTabLabel?: string;
  aiTabSlotTag?: string;
  kpis: MfgDashKpi[];
  risk?: { title: string; sub: string; rows: MfgDashRiskRow[]; note?: string };
  fileTypes?: MfgDashTypeChip[];
  versions?: { title: string; sub?: string; rows: MfgDashVersionRow[]; note?: string };
  ranking?: { title: string; sub?: string; rows: MfgDashRankRow[] };
  accounts?: { title: string; sub?: string; rows: MfgDashAccount[]; note?: string };
  /** state 진입 시 자동 펼침할 거래처명 */
  openAccount?: string;
  aiSlot?: { title: string; sub: string };
  aiCards?: MfgDashAiCard[];
  aiNote?: string;
}

export type MobilePCPhase = 'warn' | 'solve';

export interface MobileSplitMessage {
  id: string;
  side: 'mine' | 'other' | 'system';
  text?: string;
  imageCaption?: string;
  imageLines?: string[];
  fileName?: string;
  fileMeta?: string;
  fileTone?: 'plain' | 'brand';
  highlightToken?: { text: string; tone: 'danger' | 'brand' };
}

export interface MobilePCFormField {
  id: string;
  label: string;
  placeholder?: string;
  value?: string;
  state?: 'empty' | 'filled' | 'error';
}

export interface MobilePCTaskField {
  id: string;
  label: string;
  value: string;
  revealed: boolean;
}

export interface MobilePCParticle {
  id: string;
  text: string;
  targetFieldId: string;
  delayMs?: number;
}

export interface MobilePCSplitState {
  phase: MobilePCPhase;
  masterTitle: string;
  masterMeta?: string;
  stateBarSteps: Array<{ id: string; label: string }>;
  stateBarActiveIndex: number;
  doneIndices?: number[];

  phoneHeader: string;
  phoneHeaderVariant?: 'kakao' | 'cowork';
  phoneMessages: MobileSplitMessage[];
  phoneActionLabel?: string;
  phoneActionNextIndex?: number;
  phoneActionHint?: string;

  pcMode: 'kakao+form' | 'workspace+task';
  pcHeaderLabel: string;
  pcStatusLabel?: string;

  pcKakao?: {
    title: string;
    sender: string;
    messages: MobileSplitMessage[];
  };

  pcSystem?: {
    title: string;
    fields: MobilePCFormField[];
    actionLabel?: string;
    actionNextIndex?: number;
    waitText?: string;
    typingError?: {
      fieldId: string;
      correctValue: string;
      wrongValue: string;
      intervalMs?: number;
      onCompleteAdvanceMs?: number;
      onCompleteAdvanceTo?: number;
    };
    autoFillName?: { fieldId: string; value: string };
    reworkBanner?: {
      label: string;
      value: string;
      sub?: string;
    };
  };

  pcDimmed?: boolean;

  pcWorkspace?: {
    sidebarActiveIndex: number;
    chatHeader: string;
    chatSubtitle?: string;
    messages: MobileSplitMessage[];
    engineStatus?: string;
  };

  pcTaskPanel?: {
    title: string;
    fields: MobilePCTaskField[];
    flyingParticles?: MobilePCParticle[];
    actionLabel?: string;
    actionNextIndex?: number;
  };

  warningOverlay?: {
    title: string;
    body: string;
    ctaLabel?: string;
    ctaNextIndex?: number;
  };

  resultModal?: {
    title: string;
    beforeLabel: string;
    beforeValue: string;
    afterLabel: string;
    afterValue: string;
    tagline: string;
    ctaLabel: string;
    ctaNextIndex?: number;
  };

  scriptHeading: string;
  scriptBody: string;
  scriptHighlight?: string;
  scriptFootnote?: string;
}

export interface ExecDashboardWidget {
  id: string;
  title: string;
  value: number;
  suffix?: string;
  prefix?: string;
  sub: string;
  tone: 'danger' | 'success' | 'info';
  countUpFrom?: number;
  durationMs?: number;
  fractionDigits?: number;
}

export interface ExecDashboardBar {
  id: string;
  label: string;
  valueText: string;
  widthPercent: number;
  clickable?: boolean;
  clickNextIndex?: number;
  warnFlag?: boolean;
  opensDrilldown?: boolean;
  tone?: 'brand' | 'warn' | 'danger';
}

export interface ExecDrilldownCauseRow {
  label: string;
  percent: number;
  tone: 'warn' | 'danger' | 'muted';
}

export interface ExecDrilldownImpact {
  eyebrow: string;
  before: string;
  after: string;
  sub: string;
}

export interface ExecDashboardDrilldown {
  targetBarId: string;
  title: string;
  rows?: Array<{ label: string; value: string; highlight?: 'good' | 'rank' | 'warn' }>;
  ctaLabel: string;
  ctaNextIndex?: number;
  causeRows?: ExecDrilldownCauseRow[];
  warnBox?: string;
  impact?: ExecDrilldownImpact;
}

export interface ExecBeforeAfterRow {
  label: string;
  before: string;
  after: string;
  highlight?: 'good' | 'warn';
}

export interface ExecBeforeAfterInsight {
  eyebrow: string;
  body: string;
  highlight?: string;
}

export interface ExecBeforeAfterPanel {
  title: string;
  beforeTitle: string;
  afterTitle: string;
  rows: ExecBeforeAfterRow[];
  tagline?: string;
  eyebrow?: string;
  subtitle?: string;
  meta?: string;
  insights?: ExecBeforeAfterInsight[];
  signature?: string;
}

export interface ExecDashboardFullState {
  masterTitle: string;
  masterMeta?: string;
  stateBarSteps: Array<{ id: string; label: string }>;
  stateBarActiveIndex: number;
  doneIndices?: number[];

  tabs?: Array<{ id: string; label: string; active?: boolean; clickNextIndex?: number; pulse?: boolean }>;
  mobileVisible?: boolean;
  mobileFading?: boolean;
  mobilePhoneHeader?: string;
  mobilePhoneMessages?: MobileSplitMessage[];

  preDashboardEmpty?: string;
  widgets?: ExecDashboardWidget[];
  chartTitle?: string;
  bars?: ExecDashboardBar[];
  drilldown?: ExecDashboardDrilldown;
  beforeAfter?: ExecBeforeAfterPanel;

  scriptHeading: string;
  scriptBody: string;
  scriptHighlight?: string;
}

export type ActId = 1 | 2 | 3 | 4;
export const ACT_LABEL: Record<ActId, string> = {
  1: 'Act I · 균열',
  2: 'Act II · 붕괴',
  3: 'Act III · 등장',
  4: 'Act IV · 정착',
};

export interface Chapter {
  id: number;
  act?: ActId;
  title: string;
  subtitle?: string;
  narration: string;
  stage: StageVariant;
  states: ChapterStateNode[];
  onComplete?: { nextChapter?: number; demoAutoAdvance?: boolean };
}

export type RoiTrend = 'up-good' | 'down-good' | 'neutral';

export interface RoiCardDef {
  id: string;
  label: string;
  caption?: string;
  value: number | null;
  unit?: string;
  prefix?: string;
  trend?: RoiTrend;
}

export interface CaseIntroVideoDef {
  /** Path relative to Vite's BASE_URL (e.g. "intro/woori-auto-finance-opening.mp4"). */
  src: string;
  /** Optional poster image, also relative to BASE_URL. */
  poster?: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  /** Skip button label. Defaults to "시나리오 바로 보기 →". */
  skipLabel?: string;
  /** Label shown when the video reaches the end. Defaults to "시나리오 시작 →". */
  continueLabel?: string;
}

export interface CaseDef {
  id: string;
  label: string;
  customer: string;
  industry: string;
  brandLine: string;
  accentColor: string;
  disableGuideOverlay?: boolean;
  introVideo?: CaseIntroVideoDef;
  cast: CastMember[];
  chapters: Chapter[];
  roi: RoiCardDef[];
}
