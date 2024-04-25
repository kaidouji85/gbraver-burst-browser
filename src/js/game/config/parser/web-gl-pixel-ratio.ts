import { z } from "zod";

import { WebGLPixelRatio } from "../browser-config";

/** WebGLピクセルレート zod schema */
export const WebGLPixelRatioSchema = z.preprocess(
  Number,
  z.union([z.literal(0.5), z.literal(0.75), z.literal(1), z.literal(2)]),
);

/**
 * 任意のオブジェクトをWebGLピクセルレートにパースする
 * パースできない場合はnullを返す
 *
 * @param origin パース元
 * @returns パース結果
 */
export function parseWebGLPixelRatio(origin: unknown): WebGLPixelRatio | null {
  const result = WebGLPixelRatioSchema.safeParse(origin);
  return result.success ? result.data : null;
}
