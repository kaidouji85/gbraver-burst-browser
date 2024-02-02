import { process } from "../../../animation/process";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { enemyPilotOnlyShout } from "../../pilot-shout";

/**
 * ツバサ先輩勝利宣言
 * @param props イベントプロパティ
 * @return アニメーション
 */
export const tsubasaVictoryDeclaration = (
  props: Readonly<CustomBattleEventProps>,
) =>
  process(() => {
    enemyPilotOnlyShout(props, "Tsubasa", "この瞬間 私の勝利が確定した");
  });
