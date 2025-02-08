import { map, merge, Observable } from "rxjs";

import { BattleSceneAction } from "../../../actions";
import { DOMLayerProps } from "../props";

/**
 * 戦闘シーンアクションを通知する
 * @param props レイヤープロパティ
 * @returns 生成結果
 */
export function notifyBattleAction(
  props: DOMLayerProps,
): Observable<BattleSceneAction> {
  const { miniController, hamburgerMenu } = props;
  return merge(
    miniController
      .batteryPushNotifier()
      .pipe(
        map((v) => ({ type: "decideBatteryByMiniController", ...v }) as const),
      ),
    miniController
      .burstPushNotifier()
      .pipe(map(() => ({ type: "doBurstByMiniController" }) as const)),
    miniController
      .pilotPushNotifier()
      .pipe(map(() => ({ type: "doPilotSkillByMiniController" }) as const)),
    hamburgerMenu
      .notifyBattleSimulatorStart()
      .pipe(map(() => ({ type: "battleSimulatorStart" }) as const)),
  );
}
