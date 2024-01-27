import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { playerPilotCry } from "../../pilot-cry";

/**
 * ガイ パイロットスキル叫び
 * @param props イベントプロパティ
 * @return アニメーション
 */
export const gaiCry = (props: Readonly<CustomBattleEventProps>) =>
  playerPilotCry(props, "Gai", "俺の根性 見せてやる");
