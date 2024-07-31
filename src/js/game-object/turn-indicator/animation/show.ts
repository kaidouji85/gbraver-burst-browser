import { Animate } from "../../../animation/animate";
import { tween } from "../../../animation/tween";
import type { TurnIndicatorModel } from "../model/turn-indicator-model";

/**
 * ターンインジケータを表示する
 * @param isPlayerTurn プレイヤーターンであるか否か、trueでプレイヤーターン
 * @param model モデル
 * @returns アニメーション
 */
export function show(
  isPlayerTurn: boolean,
  model: TurnIndicatorModel,
): Animate {
  return tween(model, (t) =>
    t.to({ opacity: 1 }, 500).onStart(() => {
      model.isPlayerTurn = isPlayerTurn;
    }),
  );
}
