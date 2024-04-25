import { all } from "../../../animation/all";
import { Animate } from "../../../animation/animate";
import { delay } from "../../../animation/delay";
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
      .chain(view.dom.miniController.hidden()),
    view.hud.gameObjects.timeScaleButton.close(),
  );
}
