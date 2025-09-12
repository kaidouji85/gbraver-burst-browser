import { map, merge, Observable } from "rxjs";

import { BattleSceneAction } from "../../../../actions";
import { HUDPlayerProps } from "../props";

/**
 * 戦闘シーンアクションを通知する
 * @param props プロパティ
 * @returns 通知ストリーム
 */
export function notifyBattleAction(
  props: HUDPlayerProps,
): Observable<BattleSceneAction> {
  const { predicatedDamage, statusIcon, playerId } = props;
  return merge(
    predicatedDamage
      .notifyPush()
      .pipe(
        map(() => ({ type: "battleSimulatorStartByIcon", playerId }) as const),
      ),
    statusIcon
      .notifyPushed()
      .pipe(map(() => ({ type: "statusOpeningByIcon", playerId }) as const)),
  );
}
