import { LeadLineModel } from "./lead-line-model";

/**
 * モデルの初期値を生成する
 * @returns モデルの初期値
 */
export function initialValue(): LeadLineModel {
  return {
    start: {
      x: 0,
      y: 0,
    },
    end: {
      x: 100,
      y: 0,
    },
    opacity: 0,
  };
}
