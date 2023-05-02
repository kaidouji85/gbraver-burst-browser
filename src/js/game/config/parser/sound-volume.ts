import { z } from "zod";

import { SoundVolume } from "../browser-config";

/** 音量 zod scehma */
export const SoundVolumeSchema = z.preprocess(
  /* eslint-disable @typescript-eslint/no-explicit-any */
  (origin: any) =>
    /* eslint-enable */
    origin === null || origin === undefined || origin === ""
      ? null
      : Number(origin),
  z.union([
    z.literal(0),
    z.literal(0.1),
    z.literal(0.2),
    z.literal(0.3),
    z.literal(0.4),
    z.literal(0.5),
    z.literal(0.6),
    z.literal(0.7),
    z.literal(0.8),
    z.literal(0.9),
    z.literal(1),
  ])
);

/**
 * 任意のオブジェクトを音量にパースする
 * パースできない場合はnullを返す
 *
 * @param origin パース元
 * @return パース結果
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
export function parseSoundVolume(origin: any): SoundVolume | null {
  /* eslint-enable */
  const result = SoundVolumeSchema.safeParse(origin);
  return result.success ? result.data : null;
}
