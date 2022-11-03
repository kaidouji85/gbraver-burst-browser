// @flow

import { Animate } from "../../../../animation/animate";
import { tween } from "../../../../animation/tween";
import type { ShinBraverModel } from "../model/shin-braver-model";

/**
 * アクティブ状態を終了する
 * @param model モデル
 * @return アニメーション
 */
export function endActive(model: ShinBraverModel): Animate {
  return tween(model.active, (t) => t.to({ opacity: 0 }, 800));
}
