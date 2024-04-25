import { z } from "zod";

import { SoundVolume } from "../browser-config";

/** 音量 zod schema */
export const SoundVolumeSchema = z.preprocess(
  (origin: unknown) =>
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
  ]),
);

/**
 * 任意のオブジェクトを音量にパースする
 * パースできない場合はnullを返す
 *
 * @param origin パース元
 * @returns パース結果
 */
export function parseSoundVolume(origin: unknown): SoundVolume | null {
  const result = SoundVolumeSchema.safeParse(origin);
  return result.success ? result.data : null;
}
