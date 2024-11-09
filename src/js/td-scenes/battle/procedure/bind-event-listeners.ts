import { merge, Unsubscribable } from "rxjs";

import { BattleSceneProps } from "../props";
import { onBattleSceneAction } from "./on-battle-scene-action";

/**
 * 戦闘シーンイにベントリスナーをバインドする
 * @param props 戦闘シーンプロパティ
 * @returns アンサブスクライバ
 */
export function bindEventListeners(props: BattleSceneProps): Unsubscribable[] {
  const { view, battleSceneAction } = props;
  return [
    merge(view.notifyBattleAction(), battleSceneAction.notify()).subscribe(
      (action) => {
        onBattleSceneAction(props, action);
      },
    ),
  ];
}
