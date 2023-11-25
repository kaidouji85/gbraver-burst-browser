import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { enemyPilotCry } from "../../pilot-cry";

/**
 * ツバサ先輩勝利宣言
 * @param props イベントプロパティ
 * @return アニメーション
 */
export const tsubasaVictoryDeclaration = (
  props: Readonly<CustomBattleEventProps>,
) => enemyPilotCry(props, "Tsubasa", "この瞬間 私の勝利が確定した");
