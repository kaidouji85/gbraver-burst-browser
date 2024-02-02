import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { enemyPilotShout } from "../../pilot-shout";

/**
 * ユウヤ 戦闘 シンヤのHPが満タン
 * @param props イベントプロパティ
 * @return アニメーション
 */
export const yuuyaAttackShoutWhenShinyaHPIsFull = (
  props: Readonly<CustomBattleEventProps>,
) => enemyPilotShout(props, "Yuuya", "シンヤ これが躱せるかな");
