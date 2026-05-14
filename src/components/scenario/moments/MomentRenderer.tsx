import type { MomentDef } from '@/cases/_types';
import { PriceDiscoveryFlash } from './PriceDiscoveryFlash';
import { AutoMappingPulse } from './AutoMappingPulse';
import { FileBlockedToast } from './FileBlockedToast';

interface MomentRendererProps {
  moment?: MomentDef;
}

export function MomentRenderer({ moment }: MomentRendererProps) {
  if (!moment) return null;

  switch (moment.kind) {
    case 'price-flash': {
      const payload = (moment.payload ?? {}) as { wrong?: number; correct?: number };
      return (
        <PriceDiscoveryFlash
          wrong={payload.wrong ?? 800}
          correct={payload.correct ?? 1000}
        />
      );
    }
    case 'auto-mapping': {
      const payload = (moment.payload ?? {}) as {
        field?: string;
        value?: string;
        detail?: string;
      };
      return (
        <AutoMappingPulse field={payload.field} value={payload.value} detail={payload.detail} />
      );
    }
    case 'file-blocked': {
      const payload = (moment.payload ?? {}) as { title?: string; body?: string };
      return <FileBlockedToast title={payload.title} body={payload.body} />;
    }
    default:
      return null;
  }
}
