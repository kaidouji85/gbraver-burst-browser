import { z } from "zod";

import { WebGLPixelRatio } from "../browser-config";

/** WebGLピクセルレート zod schema */
export const WebGLPixelRatioSchema = z.preprocess(
  Number,
  z.union([z.literal(0.5), z.literal(0.75), z.literal(1), z.literal(2)])
);

/**
 * 任意のオブジェクトをWebGLピクセルレートにパースする
 * パースできない場合はnullを返す
 *
 * @param origin パース元
 * @return パース結果
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
export function parseWebGLPixelRatio(origin: any): WebGLPixelRatio | null {
  /* eslint-enable */
  const result = WebGLPixelRatioSchema.safeParse(origin);
  return result.success ? result.data : null;
}
