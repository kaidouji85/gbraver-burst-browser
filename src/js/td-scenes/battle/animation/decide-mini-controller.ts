import { waitTime } from "../../../wait/wait-time";
import { BattleSceneProps } from "../battle-scene-props";
import { BattleSceneView } from "../view";

/**
 * ミニコントローラー決定アニメーション
 * @param props 戦闘シーンプロパティ
 * @return アニメーションが完了したら発火するPromise
 */
export async function decideMiniController(
  view: Readonly<BattleSceneView>
): Promise<void> {
  await view.dom.miniController.decided();
  await waitTime(200);
  await view.dom.miniController.hidden();
}
