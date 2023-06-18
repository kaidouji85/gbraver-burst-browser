import { all } from "../../../animation/all";
import { Animate } from "../../../animation/animate";
import { delay } from "../../../animation/delay";
import { BattleSceneView } from "../view";

/**
 * パイロットボタンによる決定アニメーション
 * @param view ビュー
 * @return アニメーション
 */
export function decisionByPilotButton(
  view: Readonly<BattleSceneView>
): Animate {
  return all(
    view.hud.gameObjects.pilotButton.decide(),
    view.hud.gameObjects.burstButton.close(),
    view.hud.gameObjects.batterySelector.close(),
    view.hud.gameObjects.timeScaleButton.close()
  )
    .chain(delay(500))
    .chain(view.hud.gameObjects.pilotButton.close());
}
