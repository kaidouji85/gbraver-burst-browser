import { waitTime } from "../../../wait/wait-time";
import { BattleSceneView } from "../view";

/**
 * ミニコントローラー決定アニメーション
 * @param props 戦闘シーンプロパティ
 * @return アニメーションが完了したら発火するPromise
 */
export async function decideMiniController(
  view: Readonly<BattleSceneView>
): Promise<void> {
  // TODO Animteを返すようにする
  await view.dom.miniController.decided().play();
  await waitTime(200);
  await view.dom.miniController.hidden();
}
