import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { playerPilotCry } from "../../pilot-cry";

/**
 * 序盤 シンヤ バースト 叫び
 * @param props イベントプロパティ
 * @return アニメーション
 */
export const earlyShinyaBurstCry = (props: Readonly<CustomBattleEventProps>) =>
  playerPilotCry(props, "Shinya", "はじめから飛ばすッスよ ユウヤさん");
