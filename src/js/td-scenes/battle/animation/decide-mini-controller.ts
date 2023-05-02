import { Animate } from "../../../animation/animate";
import { delay } from "../../../animation/delay";
import { BattleSceneView } from "../view";
import {all} from "../../../animation/all";

/**
 * ミニコントローラー決定アニメーション
 * @param view 戦闘シーンビュー
 * @return アニメーションが完了したら発火するPromise
 */
export function decideMiniController(view: Readonly<BattleSceneView>): Animate {
  return all(
    view.dom.miniController
      .decided()
      .chain(delay(200))
      .chain(view.dom.miniController.hidden()),
    view.hud.gameObjects.timeScaleButton.close(),
  );
}
