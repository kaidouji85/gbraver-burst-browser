import { Animate } from "../../../animation/animate";
import { delay } from "../../../animation/delay";
import { BattleSceneView } from "../view";

/**
 * ミニコントローラー決定アニメーション
 * @param props 戦闘シーンプロパティ
 * @return アニメーションが完了したら発火するPromise
 */
export function decideMiniController(view: Readonly<BattleSceneView>): Animate {
  return view.dom.miniController
    .decided()
    .chain(delay(200))
    .chain(view.dom.miniController.hidden());
}
