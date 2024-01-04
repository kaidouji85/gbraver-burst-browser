import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { switchPlayerPilotCry } from "../../pilot-cry";

/**
 * 序盤 シンヤ バースト 叫び
 * @param props イベントプロパティ
 * @return アニメーション
 */
export const earlyShinyaBurstCry = (props: Readonly<CustomBattleEventProps>) =>
  switchPlayerPilotCry(props, "Shinya", "はじめから飛ばすッスよ ユウヤさん");
