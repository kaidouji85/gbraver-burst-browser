// @flow

import { Animate } from "../../../../animation/animate";
import { tween } from "../../../../animation/tween";
import type { ShinBraverModel } from "../model/shin-braver-model";

/**
 * アクティブ状態フラッシュ
 * @param model モデル
 * @return アニメーション
 */
export function activeFlash(model: ShinBraverModel): Animate {
  return tween(model, (t) => t.to({ active: 1 }, 800)).chain(
    tween(model, (t) => t.to({ active: 0 }, 800))
  );
}
