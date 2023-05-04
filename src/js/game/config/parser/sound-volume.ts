import { z } from "zod";

import {SoundVolume, SoundVolumes} from "../browser-config";

/** 音量 zod schema */
export const SoundVolumeSchema = z.preprocess(
  (origin: unknown) =>
    origin === null || origin === undefined || origin === ""
      ? null
      : Number(origin),
  z.union([
    z.literal(SoundVolumes[0]),
    z.literal(SoundVolumes[1]),
    ...SoundVolumes.map(v => z.literal(v))
      .slice(2),
  ])
);

/**
 * 任意のオブジェクトを音量にパースする
 * パースできない場合はnullを返す
 *
 * @param origin パース元
 * @return パース結果
 */
export function parseSoundVolume(origin: unknown): SoundVolume | null {
  const result = SoundVolumeSchema.safeParse(origin);
  return result.success ? result.data : null;
}
