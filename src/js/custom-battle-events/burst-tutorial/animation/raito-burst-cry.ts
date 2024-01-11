import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { playerPilotCry } from "../../pilot-cry";

/**
 * ライト バースト 叫び
 * @param props イベントプロパティ
 * @return アニメーション
 */
export const raitoBurstCry = (props: Readonly<CustomBattleEventProps>) =>
  playerPilotCry(props, "Raito", "奥義 ライトニングバースト！！");
