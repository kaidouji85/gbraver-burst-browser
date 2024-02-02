import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { enemyPilotOnlyShout } from "../../pilot-shout";

/**
 * チャプター イーブンマッチ ユウヤ叫び1
 * @param props イベントプロパティ
 * @return アニメーション
 */
export const yuuyaShout1WhenEvenMatch = (
  props: Readonly<CustomBattleEventProps>,
) => enemyPilotOnlyShout(props, "Yuuya", "それはどうかな シンヤ");
