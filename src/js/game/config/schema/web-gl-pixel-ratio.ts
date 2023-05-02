import { z } from "zod";

/** WebGLピクセルレート */
export type WebGLPixelRatio = number;

/** 設定可能なWebGLピクセルレートを集めたもの */
export const WebGLPixelRatios: WebGLPixelRatio[] = [0.5, 0.75, 1, 2];

/** WebGLピクセルレート zod schema */
export const WebGLPixelRatioSchema = z.union([z.literal(0.5), z.literal(0.75), z.literal(1), z.literal(2)]);

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