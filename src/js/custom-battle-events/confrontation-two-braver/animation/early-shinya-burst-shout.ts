import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { playerPilotShout } from "../../pilot-shout";

/**
 * 序盤 シンヤ バースト 叫び
 * @param props イベントプロパティ
 * @return アニメーション
 */
export const earlyShinyaBurstShout = (
  props: Readonly<CustomBattleEventProps>,
) => playerPilotShout(props, "Shinya", "はじめから飛ばすッスよ ユウヤさん");
