import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { playerPilotOnlyShout } from "../../pilot-shout";

/**
 * シンヤ 戦闘 ユウヤのHPが満タン
 * @param props イベントプロパティ
 * @return アニメーション
 */
export const shinyaAttackShoutWhenYuuyaHPIsFull = (
  props: Readonly<CustomBattleEventProps>,
) =>
  playerPilotOnlyShout(
    props,
    "Shinya",
    "まだノーダメージなんて さすがユウヤさんッス",
  );
