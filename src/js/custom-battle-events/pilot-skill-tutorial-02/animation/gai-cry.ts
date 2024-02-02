import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { playerPilotShout } from "../../pilot-shout";

/**
 * ガイ パイロットスキル叫び
 * @param props イベントプロパティ
 * @return アニメーション
 */
export const gaiCry = (props: Readonly<CustomBattleEventProps>) =>
  playerPilotShout(props, "Gai", "俺の根性 見せてやる");
