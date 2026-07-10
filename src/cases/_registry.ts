import type { CaseDef } from './_types';
import { wontalkCase } from './wontalk-woori';
import { salesbridgeCase } from './salesbridge-gaon';
import { salesbridgeSkCase } from './salesbridge-sk';
import { coworkHanaCase } from './cowork-hana';
import { coworkManufacturingCase } from './cowork-manufacturing';

export const caseRegistry: Record<string, CaseDef> = {
  [coworkHanaCase.id]: coworkHanaCase,
  [wontalkCase.id]: wontalkCase,
  [salesbridgeCase.id]: salesbridgeCase,
  [salesbridgeSkCase.id]: salesbridgeSkCase,
  [coworkManufacturingCase.id]: coworkManufacturingCase,
};

export function getCase(id: string): CaseDef | null {
  return caseRegistry[id] ?? null;
}

export const allCases: CaseDef[] = Object.values(caseRegistry);
