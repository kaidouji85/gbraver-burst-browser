import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { playerPilotOnlyShout } from "../../pilot-shout";

/**
 * ガイ パイロットスキル叫び
 * @param props イベントプロパティ
 * @return アニメーション
 */
export const gaiShout = (props: Readonly<CustomBattleEventProps>) =>
  playerPilotOnlyShout(props, "Gai", "俺の根性 見せてやる");
