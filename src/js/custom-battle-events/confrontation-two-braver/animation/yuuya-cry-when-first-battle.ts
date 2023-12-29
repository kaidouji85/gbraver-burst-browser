import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { enemyPilotCry } from "../../pilot-cry";

/**
 * 最初の戦闘 ユウヤ 叫び
 * @param props イベントプロパティ
 * @return アニメーション
 */
export const yuuyaCryWhenFirstBattle = (
  props: Readonly<CustomBattleEventProps>,
) => enemyPilotCry(props, "Yuuya", "見せてもらおうか シンブレイバーの実力を");
