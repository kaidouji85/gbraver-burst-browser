import { onStart } from "../../../animation/on-start";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { enemyPilotOnlyShout } from "../../pilot-shout";

/**
 * ツバサ先輩 ファーストアタック 叫び
 * @param props イベントプロパティ
 * @return アニメーション
 */
export const tsubasaFirstAttackShout = (
  props: Readonly<CustomBattleEventProps>,
) =>
  onStart(() => {
    enemyPilotOnlyShout(props, "Tsubasa", "はじめから全力でいかせてもらう");
  });
