import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { switchPlayerPilotCry } from "../../pilot-cry";

/**
 * シンヤ バースト 叫び
 * @param props イベントプロパティ
 * @return アニメーション
 */
export const shinyaBurstCry = (props: Readonly<CustomBattleEventProps>) =>
  switchPlayerPilotCry(
    props,
    "Shinya",
    "ユウヤさん これで決めさせてもらうッス",
  );
