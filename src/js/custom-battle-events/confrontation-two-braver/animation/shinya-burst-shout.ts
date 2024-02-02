import { process } from "../../../animation/process";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { playerPilotOnlyShout } from "../../pilot-shout";

/**
 * シンヤ バースト 叫び
 * @param props イベントプロパティ
 * @return アニメーション
 */
export const shinyaBurstShout = (props: Readonly<CustomBattleEventProps>) =>
  process(() => {
    playerPilotOnlyShout(
      props,
      "Shinya",
      "ユウヤさん これで決めさせてもらうッス",
    );
  });
