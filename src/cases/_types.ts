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

export type WorkspaceMode = 'chat' | 'dashboard' | 'tasks';

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
  operatorPanel?: OperatorPanelCard[];
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
  | 'auto-viz';

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

export interface ChapterStateNode {
  index: number;
  activeCastId?: string;
  activeCastIds?: string[];
  phones?: Record<string, PhoneScreen>;
  workspace?: WorkspaceState;
  desktop?: DesktopState;
  salesbridge?: SalesBridgeState;
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
  | 'file-captured';

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
  | 'salesbridge-workspace';

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

export interface CaseDef {
  id: string;
  label: string;
  customer: string;
  industry: string;
  brandLine: string;
  accentColor: string;
  disableGuideOverlay?: boolean;
  cast: CastMember[];
  chapters: Chapter[];
  roi: RoiCardDef[];
}
