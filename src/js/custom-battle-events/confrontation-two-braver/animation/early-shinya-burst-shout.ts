import { onStart } from "../../../animation/on-start";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { playerPilotOnlyShout } from "../../pilot-shout";

/**
 * 序盤 シンヤ バースト 叫び
 * @param props イベントプロパティ
 * @return アニメーション
 */
export const earlyShinyaBurstShout = (
  props: Readonly<CustomBattleEventProps>,
) =>
  onStart(() => {
    playerPilotOnlyShout(props, "Shinya", "はじめから飛ばすッスよ ユウヤさん");
  });
