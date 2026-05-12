import type { CaseDef } from './_types';
import { wontalkCase } from './wontalk-woori';
import { salesbridgeCase } from './salesbridge-gaon';

export const caseRegistry: Record<string, CaseDef> = {
  [wontalkCase.id]: wontalkCase,
  [salesbridgeCase.id]: salesbridgeCase,
};

export function getCase(id: string): CaseDef | null {
  return caseRegistry[id] ?? null;
}

export const allCases: CaseDef[] = Object.values(caseRegistry);
