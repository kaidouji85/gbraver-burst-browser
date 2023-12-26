import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { playerPilotCry } from "../../pilot-cry";

/**
 * 序盤 シンヤ バースト 叫び
 * @param props イベントプロパティ
 * @return アニメーション
 */
export const shinyaBurst = (
  props: Readonly<CustomBattleEventProps>,
) => playerPilotCry(props, "Shinya", "序盤から飛ばすッスよ ユウヤさん");
