import { merge, Observable } from "rxjs";

import { BattleSceneAction } from "../../../actions";
import { HUDLayerProps } from "../props";

/**
 * 戦闘シーンアクション通知
 * @param props レイヤープロパティ
 * @returns 通知ストリーム
 */
export function battleActionNotifier(
  props: HUDLayerProps,
): Observable<BattleSceneAction> {
  const { gameObjects, players } = props;
  return merge(
    gameObjects.notifyBattleAction(),
    ...players.map((p) => p.notifyBattleAction()),
  );
}
