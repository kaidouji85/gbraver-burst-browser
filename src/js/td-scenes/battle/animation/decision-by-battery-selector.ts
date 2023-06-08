import { all } from "../../../animation/all";
import { Animate } from "../../../animation/animate";
import { delay } from "../../../animation/delay";
import { BattleSceneView } from "../view";

/**
 * バッテリーセレクタによる決定アニメーション
 * @param view ビュー
 * @return アニメーション
 */
export function decisionByBatterySelector(
  view: Readonly<BattleSceneView>
): Animate {
  return all(
    view.hud.gameObjects.batterySelector.decide(),
    view.hud.gameObjects.burstButton.close(),
    view.hud.gameObjects.pilotButton.close(),
    view.hud.gameObjects.timeScaleButton.close()
  )
    .chain(delay(500))
    .chain(view.hud.gameObjects.batterySelector.close());
}