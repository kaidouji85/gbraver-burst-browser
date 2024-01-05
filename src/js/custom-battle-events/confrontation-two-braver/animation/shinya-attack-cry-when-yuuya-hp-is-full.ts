import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { switchPlayerPilotCry } from "../../pilot-cry";

/**
 * シンヤ 戦闘 ユウヤのHPが満タン
 * @param props イベントプロパティ
 * @return アニメーション
 */
export const shinyaAttackCryWhenYuuyaHPIsFull = (
  props: Readonly<CustomBattleEventProps>,
) =>
  switchPlayerPilotCry(
    props,
    "Shinya",
    "まだノーダメージなんて さすがユウヤさんッス",
  );
