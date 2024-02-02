import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { playerPilotShout } from "../../pilot-shout";

/**
 * シンヤ バースト 叫び
 * @param props イベントプロパティ
 * @return アニメーション
 */
export const shinyaBurstCry = (props: Readonly<CustomBattleEventProps>) =>
  playerPilotShout(props, "Shinya", "ユウヤさん これで決めさせてもらうッス");
