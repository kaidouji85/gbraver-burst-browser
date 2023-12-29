import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { playerPilotCry } from "../../pilot-cry";

/**
 * 最初の戦闘 シンヤ
 * @param props イベントプロパティ
 * @return アニメーション
 */
export const shinyaMonologueWhenFirstBattle = (
  props: Readonly<CustomBattleEventProps>,
) => playerPilotCry(props, "Shinya", "いくッスよ ユウヤさん");
