import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { enemyPilotShout } from "../../pilot-shout";

/**
 * チャプター イーブンマッチ ユウヤ叫び2
 * @param props イベントプロパティ
 * @return アニメーション
 */
export const yuuyaShout2WhenEvenMatch = (
  props: Readonly<CustomBattleEventProps>,
) => enemyPilotShout(props, "Yuuya", "Gブレイバーの力 見せてやる");
