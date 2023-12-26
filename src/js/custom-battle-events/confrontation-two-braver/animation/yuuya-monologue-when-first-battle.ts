import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { enemyPilotCry } from "../../pilot-cry";

/**
 * 最初の戦闘 ユウヤモノローグ
 * @param props イベントプロパティ
 * @return アニメーション
 */
export const yuuyaMonologueWhenFirstBattle = (
  props: Readonly<CustomBattleEventProps>,
) => enemyPilotCry(props, "Yuuya", "シンヤ まずはお手なみ拝見させてもうらぜ");
