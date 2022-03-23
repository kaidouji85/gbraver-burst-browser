// @flow
import {Animate} from "../../../../../../../animation/animate";
import {delay} from "../../../../../../../animation/delay";
import {BattleSceneView} from "../../../../view";
import {all} from "../../../../../../../animation/all";

/**
 * 引き分けアニメーション
 *
 * @return アニメーション
 */
export function evenMatchAnimation(view: BattleSceneView): Animate {
  return all(
    view.hud.gameObjects.drawIndicator.slideIn()
      .chain(delay(500))
      .chain(view.hud.gameObjects.drawIndicator.moveToEdge()),
    delay(700)
      .chain(...view.hud.players.map(v => v.resultIndicator.hidden()))
  );
}