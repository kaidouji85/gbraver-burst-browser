import { all } from "../../../../../animation/all";
import { Animate } from "../../../../../animation/animate";
import { delay } from "../../../../../animation/delay";
import { onStart } from "../../../../../animation/on-start";
import { play } from "../../../../../bgm/bgm-operators";
import { StateAnimationProps } from "../state-animation-props";

/**
 * 引き分け
 * @param props 戦闘シーンプロパティ
 * @returns アニメーション
 */
export function evenMatchAnimation(props: StateAnimationProps): Animate {
  return all(
    props.view.hud.gameObjects.drawIndicator
      .slideIn()
      .chain(
        delay(500),
        onStart(() => props.bgm.do(play(props.sounds.lose))),
      )
      .chain(props.view.hud.gameObjects.drawIndicator.moveToEdge()),
  );
}
