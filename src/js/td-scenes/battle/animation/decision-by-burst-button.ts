import { all } from "../../../animation/all";
import { Animate } from "../../../animation/animate";
import { delay } from "../../../animation/delay";
import { BattleSceneView } from "../view";

/**
 * バーストボタンによる決定アニメーション
 * @param view ビュー
 * @return アニメーション
 */
export function decisionByBurstButton(
  view: Readonly<BattleSceneView>
): Animate {
  return all(
    view.hud.gameObjects.burstButton.decide(),
    view.hud.gameObjects.burstButtonLeadLine.hidden(),
    view.hud.gameObjects.batterySelector.close(),
    view.hud.gameObjects.batterySelectorLeadLine.hidden(),
    view.hud.gameObjects.pilotButton.close(),
    view.hud.gameObjects.pilotButtonLeadLine.hidden(),
    view.hud.gameObjects.timeScaleButton.close()
  )
    .chain(delay(500))
    .chain(view.hud.gameObjects.burstButton.close());
}
