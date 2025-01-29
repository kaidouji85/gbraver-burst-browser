import { all } from "../../../animation/all";
import { Animate } from "../../../animation/animate";
import { delay } from "../../../animation/delay";
import { onStart } from "../../../animation/on-start";
import { BattleSceneView } from "../view";

/**
 * パイロットボタンによる決定アニメーション
 * @param view ビュー
 * @returns アニメーション
 */
export function decisionByPilotButton(
  view: Readonly<BattleSceneView>,
): Animate {
  return all(
    view.hud.gameObjects.pilotButton.decide(),
    view.hud.gameObjects.burstButton.close(),
    view.hud.gameObjects.burstButtonLeadLine.hidden(),
    view.hud.gameObjects.batterySelector.close(),
    view.hud.gameObjects.batterySelectorLeadLine.hidden(),
    view.hud.gameObjects.timeScaleButton.close(),
    ...view.hud.players.map(({ predicatedDamage }) =>
      predicatedDamage.hidden(),
    ),
    onStart(() => {
      view.dom.hamburgerMenu.disableBattleSimulator();
    }),
  )
    .chain(delay(500))
    .chain(
      all(
        view.hud.gameObjects.pilotButton.close(),
        view.hud.gameObjects.pilotButtonLeadLine.hidden(),
      ),
    );
}
