import { onStart } from "../../../animation/on-start";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { playerPilotOnlyShout } from "../../pilot-shout";

/**
 * シンヤ バースト 叫び
 * @param props イベントプロパティ
 * @return アニメーション
 */
export const shinyaBurstShout = (props: Readonly<CustomBattleEventProps>) =>
  onStart(() => {
    playerPilotOnlyShout(props, "Shinya", "ツバサ先輩 本気でいくッスよ");
  });