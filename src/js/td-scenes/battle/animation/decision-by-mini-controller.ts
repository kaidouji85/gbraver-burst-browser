import { all } from "../../../animation/all";
import { Animate } from "../../../animation/animate";
import { delay } from "../../../animation/delay";
import { onStart } from "../../../animation/on-start";
import { BattleSceneView } from "../view";

/**
 * ミニコントローラーによる決定アニメーション
 * @param view 戦闘シーンビュー
 * @returns アニメーションが完了したら発火するPromise
 */
export function decisionByMiniController(
  view: Readonly<BattleSceneView>,
): Animate {
  return all(
    view.dom.miniController
      .decided()
      .chain(delay(200))
      .chain(
        all(
          view.dom.miniController.hidden(),
          onStart(() => {
            view.dom.hamburgerMenu.hidden();
          }),
        ),
      ),
    view.hud.gameObjects.timeScaleButton.close(),
    ...view.hud.players.map(({ predicatedDamage }) =>
      predicatedDamage.hidden(),
    ),
  );
}
