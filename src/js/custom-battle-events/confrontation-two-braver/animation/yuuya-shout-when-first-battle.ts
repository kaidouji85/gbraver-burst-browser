import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { enemyPilotShout } from "../../pilot-shout";

/**
 * 最初の戦闘 ユウヤ 叫び
 * @param props イベントプロパティ
 * @return アニメーション
 */
export const yuuyaShoutWhenFirstBattle = (
  props: Readonly<CustomBattleEventProps>,
) => enemyPilotShout(props, "Yuuya", "見せてもらおうか シンブレイバーの実力を");
