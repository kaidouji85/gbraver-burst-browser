import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { playerPilotShout } from "../../pilot-shout";

/**
 * 最初の戦闘 シンヤ 叫び
 * @param props イベントプロパティ
 * @return アニメーション
 */
export const shinyaShoutWhenFirstBattle = (
  props: Readonly<CustomBattleEventProps>,
) => playerPilotShout(props, "Shinya", "いくッスよ ユウヤさん");
