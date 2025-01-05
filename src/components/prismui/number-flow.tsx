"use client";

import NumberFlow from "@number-flow/react";
import { type Format } from "@number-flow/react";

interface NumberFlowProps {
  value: number;
  format?: Format;
  locales?: string | string[];
  prefix?: string;
  suffix?: string;
  spinTiming?: EffectTiming;
  willChange?: boolean;
  continuous?: boolean;
}

export default function NumberFlowWrapper({
  value,
  format = {},
  locales,
  prefix,
  suffix,
  spinTiming,
  willChange = false,
  continuous = false,
}: NumberFlowProps) {
  return (
    <NumberFlow
      value={value}
      format={format}
      locales={locales}
      prefix={prefix}
      suffix={suffix}
      spinTiming={spinTiming}
      willChange={willChange}
      continuous={continuous}
    />
  );
}
