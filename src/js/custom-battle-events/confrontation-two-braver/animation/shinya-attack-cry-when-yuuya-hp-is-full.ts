import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { playerPilotCry } from "../../pilot-cry";

/**
 * シンヤ 戦闘 ユウヤのHPが満タン
 * @param props イベントプロパティ
 * @return アニメーション
 */
export const shinyaAttackCryWhenYuuyaHPIsFull = (
  props: Readonly<CustomBattleEventProps>,
) =>
  playerPilotCry(
    props,
    "Shinya",
    "まだノーダメージなんて さすがユウヤさんッス",
  );
