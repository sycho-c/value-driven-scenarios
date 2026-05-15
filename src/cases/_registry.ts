import type { CaseDef } from './_types';
import { wontalkCase } from './wontalk-woori';
import { salesbridgeCase } from './salesbridge-gaon';
import { coworkHanaCase } from './cowork-hana';

export const caseRegistry: Record<string, CaseDef> = {
  [coworkHanaCase.id]: coworkHanaCase,
  [wontalkCase.id]: wontalkCase,
  [salesbridgeCase.id]: salesbridgeCase,
};

export function getCase(id: string): CaseDef | null {
  return caseRegistry[id] ?? null;
}

export const allCases: CaseDef[] = Object.values(caseRegistry);
