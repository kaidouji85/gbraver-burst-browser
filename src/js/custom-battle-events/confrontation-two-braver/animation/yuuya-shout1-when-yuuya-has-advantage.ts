import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { enemyPilotOnlyShout } from "../../pilot-shout";

/**
 * チャプター ユウヤ有利 ユウヤ叫び1
 * @param props イベントプロパティ
 * @return アニメーション
 */
export const yuuyaShout1WhenYuuyaHasAdvantage = (
  props: Readonly<CustomBattleEventProps>,
) => enemyPilotOnlyShout(props, "Yuuya", "どうしたシンブレイバー");
