import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { playerPilotCry } from "../../pilot-cry";

/**
 * シンヤ叫び バースト発動
 * @param props イベントプロパティ
 * @return アニメーション
 */
export const shinyaBurstCry = (props: Readonly<CustomBattleEventProps>) =>
  playerPilotCry(props, "Shinya", "シンブレイバーのパワーが急上昇してるッス");
