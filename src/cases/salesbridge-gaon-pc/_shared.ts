import type { ExcelRow, ExcelWindowState, TaskbarApp } from '../_types';

export const excelRowsBase: ExcelRow[] = [
  {
    id: 'rowDaedong',
    label: '3',
    tone: 'daedong',
    cells: [
      { text: '대동케이블판매', bold: true },
      { text: 'CV-A001' },
      { text: '800', bold: true, price: true },
      { text: '대형' },
    ],
  },
  {
    label: '4',
    cells: [
      { text: '금호' },
      { text: 'CV-A001' },
      { text: '850', price: true },
      { text: '' },
    ],
  },
  {
    label: '5',
    cells: [
      { text: '다온케이블' },
      { text: 'CV-A001' },
      { text: '880', price: true },
      { text: '' },
    ],
  },
  {
    id: 'rowMiu',
    label: '6',
    tone: 'miu',
    cells: [
      { text: '미우케이블', bold: true },
      { text: 'CV-A001' },
      { text: '1,000', bold: true, price: true },
      { text: '중소' },
    ],
  },
  {
    label: '7',
    cells: [
      { text: '림스케이블' },
      { text: 'CV-A001' },
      { text: '1,020', price: true },
      { text: '' },
    ],
  },
  {
    label: '8',
    cells: [
      { text: '유한이앤씨' },
      { text: 'CV-A001' },
      { text: '1,080', price: true },
      { text: '' },
    ],
  },
];

export function makeExcel(opts: {
  highlight?: 'miu' | 'daedong' | null;
  quotePopup?: ExcelWindowState['quotePopup'];
}): ExcelWindowState {
  const rows = excelRowsBase.map((r) => ({
    ...r,
    highlight:
      (opts.highlight === 'miu' && r.id === 'rowMiu') ||
      (opts.highlight === 'daedong' && r.id === 'rowDaedong')
        ? true
        : undefined,
  }));
  return {
    fileName: '단가표_2025_거래처별.xlsx',
    cellRef: 'C5',
    formula: '2025년 거래처별 CV-A001 단가',
    headerTitle: '2025년 거래처별 단가표 (대외비)',
    rows,
    quotePopup: opts.quotePopup,
  };
}

export const taskbarAppsBase: TaskbarApp[] = [
  { id: 'excel', icon: '📊', label: '단가표_2025', active: true },
  { id: 'kakao', icon: '💬', label: '카카오톡', active: true },
  { id: 'outlook', icon: '📧', label: 'Outlook' },
];

export const clockDate = '2025-11-18 (화)';
