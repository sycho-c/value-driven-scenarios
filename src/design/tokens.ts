export const color = {
  brand: '#5B3FE4',
  brandLight: '#8B6FFF',
  brandSoft: '#F0EBFF',
  brandInk: '#1A1040',

  good: '#00C896',
  warn: '#FFB800',
  danger: '#FF4757',

  ink: '#1A1A2E',
  inkSoft: '#5A5F7A',
  muted: '#8890B0',

  bg: '#FAFBFD',
  bgSoft: '#F0F3FA',
  border: '#E2E8F0',
  surface: '#FFFFFF',

  kakao: {
    groupBg: '#B2C7DB',
    chatBg: '#ABC1D1',
    selfBubble: '#FFE500',
    otherBubble: '#FFFFFF',
    header: '#2C2C2C',
    notice: '#2D7DD2',
  },
} as const;

export const space = {
  '0.5': '4px',
  '1': '8px',
  '1.5': '12px',
  '2': '16px',
  '2.5': '20px',
  '3': '24px',
  '4': '32px',
  '5': '40px',
  '6': '48px',
  '8': '64px',
  '10': '80px',
} as const;

export const radius = {
  sm: '6px',
  md: '10px',
  lg: '14px',
  xl: '20px',
  pill: '999px',
} as const;

export const shadow = {
  card: '0 4px 18px rgba(15, 22, 60, 0.07)',
  cardHover: '0 12px 32px rgba(15, 22, 60, 0.12)',
  bubble: '0 1px 3px rgba(0, 0, 0, 0.08)',
  push: '0 4px 12px rgba(0, 0, 0, 0.15)',
  phone: '0 22px 48px rgba(15, 22, 60, 0.18)',
} as const;

export const breakpoint = {
  sm: 768,
  md: 1024,
  lg: 1280,
  xl: 1440,
} as const;

export const layout = {
  marketingMax: 1200,
  stageMax: 1280,
  proseMax: 880,
} as const;

export const z = {
  base: 0,
  raised: 10,
  sticky: 50,
  nav: 100,
  drawer: 200,
  modal: 300,
  toast: 400,
} as const;
