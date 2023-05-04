import { z } from "zod";

import {WebGLPixelRatio, WebGLPixelRatios} from "../browser-config";

/** WebGLピクセルレート zod schema */
export const WebGLPixelRatioSchema = z.preprocess(
  Number,
  z.union([
    z.literal(WebGLPixelRatios[0]),
    z.literal(WebGLPixelRatios[1]),
    ...WebGLPixelRatios.map(v => z.literal(v))
      .slice(2),
  ])
);

/**
 * 任意のオブジェクトをWebGLピクセルレートにパースする
 * パースできない場合はnullを返す
 *
 * @param origin パース元
 * @return パース結果
 */
export function parseWebGLPixelRatio(origin: unknown): WebGLPixelRatio | null {
  const result = WebGLPixelRatioSchema.safeParse(origin);
  return result.success ? result.data : null;
}
