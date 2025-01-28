import { all } from "../../../animation/all";
import { Animate } from "../../../animation/animate";
import { delay } from "../../../animation/delay";
import { BattleSceneView } from "../view";

/**
 * バーストボタンによる決定アニメーション
 * @param view ビュー
 * @returns アニメーション
 */
export function decisionByBurstButton(
  view: Readonly<BattleSceneView>,
): Animate {
  return all(
    view.hud.gameObjects.burstButton.decide(),
    view.hud.gameObjects.batterySelector.close(),
    view.hud.gameObjects.batterySelectorLeadLine.hidden(),
    view.hud.gameObjects.pilotButton.close(),
    view.hud.gameObjects.pilotButtonLeadLine.hidden(),
    view.hud.gameObjects.timeScaleButton.close(),
    ...view.hud.players.map(({ predicatedDamage }) =>
      predicatedDamage.hidden(),
    ),
  )
    .chain(delay(500))
    .chain(
      all(
        view.hud.gameObjects.burstButton.close(),
        view.hud.gameObjects.burstButtonLeadLine.hidden(),
      ),
    );
}
