import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { playerPilotOnlyShout } from "../../pilot-shout";

/**
 * シンヤ叫び バースト発動
 * @param props イベントプロパティ
 * @return アニメーション
 */
export const shinyaBurstShout = (props: Readonly<CustomBattleEventProps>) =>
  playerPilotOnlyShout(props, "Shinya", "シンブレイバーのパワーが急上昇してるッス");
