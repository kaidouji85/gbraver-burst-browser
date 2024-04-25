import { all } from "../../../../../../animation/all";
import { Animate } from "../../../../../../animation/animate";
import { delay } from "../../../../../../animation/delay";
import type { StateAnimationProps } from "../../state-animation-props";

/**
 * 引き分けアニメーション
 *
 * @param props 戦闘シーンプロパティ
 * @returns アニメーション
 */
export function evenMatchAnimation(props: StateAnimationProps): Animate {
  return all(
    props.view.hud.gameObjects.drawIndicator
      .slideIn()
      .chain(delay(500))
      .chain(props.view.hud.gameObjects.drawIndicator.moveToEdge()),
    delay(700)
      // TODO データ型を厳密に書く
      .chain(
        ...(props.view.hud.players.map((v) => v.resultIndicator.hidden()) as [
          Animate,
          Animate,
        ]),
      ),
  );
}
