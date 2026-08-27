import type { CaseDef } from './_types';
import { wontalkCase } from './wontalk-woori';
import { salesbridgeSkCase } from './salesbridge-sk';
import { coworkHanaCase } from './cowork-hana';
import { coworkManufacturingCase } from './cowork-manufacturing';
import { coworkFranchiseCase } from './cowork-franchise';

export const caseRegistry: Record<string, CaseDef> = {
  [coworkHanaCase.id]: coworkHanaCase,
  [wontalkCase.id]: wontalkCase,
  [salesbridgeSkCase.id]: salesbridgeSkCase,
  [coworkManufacturingCase.id]: coworkManufacturingCase,
  [coworkFranchiseCase.id]: coworkFranchiseCase,
};

export function getCase(id: string): CaseDef | null {
  return caseRegistry[id] ?? null;
}

export const allCases: CaseDef[] = Object.values(caseRegistry);
