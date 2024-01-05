import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { switchPlayerPilotCry } from "../../pilot-cry";

/**
 * ユウヤ 戦闘 シンヤのHPが満タン
 * @param props イベントプロパティ
 * @return アニメーション
 */
export const yuuyaBattleWhenShinyaHPIsFull = (props: Readonly<CustomBattleEventProps>) =>
  switchPlayerPilotCry(
    props,
    "Shinya",
    "まだノーダメージなんて さすがユウヤさんッス",
  );
