// @flow
import {all} from "../../../../../../../animation/all";
import {Animate} from "../../../../../../../animation/animate";
import {delay} from "../../../../../../../animation/delay";
import type {ReferableBattleSceneProps} from "../../referable-battle-scene-props";

/**
 * 引き分けアニメーション
 *
 * @param props 戦闘シーンプロパティ
 * @return アニメーション
 */
export function evenMatchAnimation(props: ReferableBattleSceneProps): Animate {
  return all(
    props.view.hud.gameObjects.drawIndicator.slideIn()
      .chain(delay(500))
      .chain(props.view.hud.gameObjects.drawIndicator.moveToEdge()),
    delay(700)
      .chain(...props.view.hud.players.map(v => v.resultIndicator.hidden()))
  );
}