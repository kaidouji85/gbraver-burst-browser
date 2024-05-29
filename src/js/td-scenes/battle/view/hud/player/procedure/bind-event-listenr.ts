import { Subject, Unsubscribable } from "rxjs";

import { BattleSceneAction } from "../../../../actions";
import { HUDPlayerProps } from "../props";

/**
 * イベントをバインドする
 * @param props プロパティ
 * @param battleAction 戦闘シーンアクション通知
 * @returns アンサブスクライバ
 */
export function bindEventListener(
  props: HUDPlayerProps,
  battleAction: Subject<BattleSceneAction>,
): Unsubscribable[] {
  const { predicatedDamage } = props;
  return [
    predicatedDamage.notifyPush().subscribe(() => {
      battleAction.next({ type: "battleSimulatorStart" });
    }),
  ];
}
