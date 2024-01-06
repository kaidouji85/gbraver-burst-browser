import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { enemyPilotCry } from "../../pilot-cry";

/**
 * ユウヤ 戦闘 シンヤのHPが満タン
 * @param props イベントプロパティ
 * @return アニメーション
 */
export const yuuyaAttackCryWhenShinyaHPIsFull = (
  props: Readonly<CustomBattleEventProps>,
) => enemyPilotCry(props, "Yuuya", "シンヤ これが躱せるかな");
