// @flow

import TWEEN from "@tweenjs/tween.js";

import { Animate } from "../../../../animation/animate";
import { tween } from "../../../../animation/tween";
import type { ShinBraverModel } from "../model/shin-braver-model";

/**
 * アクティブ状態フラッシュ
 * @param model モデル
 * @param group TWEENグループ
 * @return アニメーション
 */
export function activeFlash(
  model: ShinBraverModel,
  group: typeof TWEEN.Group
): Animate {
  return tween(model, (t) => t.to({ active: 1 }, 800), group).chain(
    tween(model, (t) => t.to({ active: 0 }, 800), group)
  );
}
