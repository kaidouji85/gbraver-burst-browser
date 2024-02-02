import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { playerPilotShout } from "../../pilot-shout";

/**
 * シンヤ 戦闘 ユウヤのHPが満タン
 * @param props イベントプロパティ
 * @return アニメーション
 */
export const shinyaAttackCryWhenYuuyaHPIsFull = (
  props: Readonly<CustomBattleEventProps>,
) =>
  playerPilotShout(
    props,
    "Shinya",
    "まだノーダメージなんて さすがユウヤさんッス",
  );
