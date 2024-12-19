import { Knob, type KnobProps } from './KnobBase';
import { round, map, clamp } from '@/lib/math';

export type KnobFrequencyProps = Omit<
  KnobProps,
  | 'min'
  | 'max'
  | 'displayValueFn'
  | 'toManualInputFn'
  | 'fromManualInputFn'
  | 'mapTo01'
  | 'mapFrom01'
>;

export function KnobFrequency(props: KnobFrequencyProps) {
  const min = 20;
  const max = 20000;

  const mapTo01 = (x: number) => clamp(map(x, 20, 20000, 0, 1));
  const mapFrom01 = (x: number) => map(clamp(x), 0, 1, 20, 20000);

  return (
    <Knob
      min={min}
      max={max}
      displayValueFn={displayValueFn}
      toManualInputFn={toManualInputFn}
      fromManualInputFn={fromManualInputFn}
      mapTo01={mapTo01}
      mapFrom01={mapFrom01}
      {...props}
    />
  );
}

const displayValueFn = (hz: number) => {
  if (hz < 100) {
    return `${hz.toFixed(1)} Hz`;
  }

  if (hz < 1000) {
    return `${hz.toFixed(0)} Hz`;
  }

  const kHz = hz / 1000;

  if (hz < 10000) {
    return `${kHz.toFixed(2)} kHz`;
  }

  return `${kHz.toFixed(1)} kHz`;
};

const toManualInputFn = (hz: number): number => {
  if (hz < 100) {
    return round(hz, 1);
  }

  if (hz < 1000) {
    return round(hz);
  }

  if (hz < 10000) {
    return round(hz, -1);
  }

  return round(hz, -2);
};

const fromManualInputFn = (hz: number): number => hz;
