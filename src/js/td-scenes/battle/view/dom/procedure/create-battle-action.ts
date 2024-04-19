import { map, merge, Observable } from "rxjs";

import { BattleSceneAction } from "../../../actions";
import { DecideBatteryByMiniController } from "../../../actions/decide-battery-by-mini-controller";
import { DoBurstByMiniController } from "../../../actions/do-burst-by-mini-controller";
import { DoPilotSkillByMiniController } from "../../../actions/do-pilot-skill-by-mini-controller";
import { DOMLayerProps } from "../props";

/**
 * 戦闘シーンアクション通知を生成する
 * @param props レイヤープロパティ
 * @return 生成結果
 */
export function createBattleAction(
  props: DOMLayerProps,
): Observable<BattleSceneAction> {
  const { miniController } = props;
  return merge(
    miniController.batteryPushNotifier().pipe(
      map(
        (v): DecideBatteryByMiniController => ({
          type: "decideBatteryByMiniController",
          battery: v,
        }),
      ),
    ),
    miniController.burstPushNotifier().pipe(
      map(
        (): DoBurstByMiniController => ({
          type: "doBurstByMiniController",
        }),
      ),
    ),
    miniController.pilotPushNotifier().pipe(
      map(
        (): DoPilotSkillByMiniController => ({
          type: "doPilotSkillByMiniController",
        }),
      ),
    ),
  );
}
