import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { switchEnemyPilotCry } from "../../pilot-cry";

/**
 * チャプター ユウヤ有利 ユウヤ叫び2
 * @param props イベントプロパティ
 * @return アニメーション
 */
export const yuuyaCry2WhenYuuyaHasAdvantage = (
  props: Readonly<CustomBattleEventProps>,
) => switchEnemyPilotCry(props, "Yuuya", "それではブレイバーの名が泣くぞ");
