export type CastRole = 'guest' | 'br' | 'admin' | 'other';

export interface CastMember {
  id: string;
  initial: string;
  color: string;
  role: CastRole;
  label: string;
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

export interface ChatLine {
  id?: string;
  kind: ChatLineKind;
  text?: string;
  senderId?: string;
  side?: ChatBubbleSide;
  time?: string;
  isNew?: boolean;
  meta?: Record<string, unknown>;
}

export interface PushNotification {
  id: string;
  room: string;
  sender?: string;
  preview: string;
  unread?: number;
  urgent?: boolean;
}

export type PhoneScreenType =
  | 'kakao-1to1'
  | 'kakao-group'
  | 'wontalk-group'
  | 'friends-search'
  | 'bizform'
  | 'tasks'
  | 'secret-input'
  | 'auth-sms';

export interface PhoneScreen {
  type: PhoneScreenType;
  headerTitle?: string;
  headerSubtitle?: string;
  pushNotifications?: PushNotification[];
  messages?: ChatLine[];
  meta?: Record<string, unknown>;
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

export type SalesBridgeMainKind = 'empty' | 'live-counter' | 'chat';

export interface SalesBridgeBubbleSender {
  id: string;
  label: string;
  initial: string;
  color: string;
  badge?: string;
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

export interface ComparisonBox {
  title: string;
  subtitle: string;
  rows: Array<{ label: string; ch1: string; ch2: string }>;
}

export interface SalesBridgeState {
  topBanner?: string;
  topMeta?: string;
  liveCounter?: { current: number; total: number; label: string };
  partnerList: PartnerListItem[];
  partnerListMeta?: string;
  activePartnerId?: string;
  mainContent: SalesBridgeMain;
  rightPanel?: PartnerInfoPanel;
  toast?: { title: string; body: string; tone?: 'system' | 'warn' };
  comparisonBox?: ComparisonBox;
  modal?: BlockedFileModal;
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
