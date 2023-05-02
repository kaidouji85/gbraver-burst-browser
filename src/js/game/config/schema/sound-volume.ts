import { z } from "zod";

/** 音量 */
export type SoundVolume = number;

/** 有効な音量 */
export const SoundVolumes: SoundVolume[] = [
  0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1,
];

/** 音量 zod scehma */
export const SoundVolumeSchema = z.union([
  z.preprocess(Number, z.literal(0)),
  z.preprocess(Number, z.literal(0.1)),
  z.preprocess(Number, z.literal(0.2)),
  z.preprocess(Number, z.literal(0.3)),
  z.preprocess(Number, z.literal(0.4)),
  z.preprocess(Number, z.literal(0.5)),
  z.preprocess(Number, z.literal(0.6)),
  z.preprocess(Number, z.literal(0.7)),
  z.preprocess(Number, z.literal(0.8)),
  z.preprocess(Number, z.literal(0.9)),
  z.preprocess(Number, z.literal(1)),
]);

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