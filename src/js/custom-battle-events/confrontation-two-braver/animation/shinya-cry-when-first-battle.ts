import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { playerPilotCry } from "../../pilot-cry";

/**
 * 最初の戦闘 シンヤ 叫び
 * @param props イベントプロパティ
 * @return アニメーション
 */
export const shinyaCryWhenFirstBattle = (
  props: Readonly<CustomBattleEventProps>,
) => playerPilotCry(props, "Shinya", "いくッスよ ユウヤさん");
