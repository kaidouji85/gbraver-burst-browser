import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { enemyPilotShout } from "../../pilot-shout";

/**
 * チャプター イーブンマッチ ユウヤ叫び1
 * @param props イベントプロパティ
 * @return アニメーション
 */
export const yuuyaCry1WhenEvenMatch = (
  props: Readonly<CustomBattleEventProps>,
) => enemyPilotShout(props, "Yuuya", "それはどうかな シンヤ");
