import { onStart } from "../../../animation/on-start";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { enemyPilotOnlyShout } from "../../pilot-shout";

/**
 * ツバサ 連続攻撃 叫び
 * @param props イベントプロパティ
 * @returns アニメーション
 */
export const tsubasaAttackShoutWhenContinuousAttack = (
  props: Readonly<CustomBattleEventProps>,
) =>
  onStart(() => {
    enemyPilotOnlyShout(props, "Tsubasa", `これが本命だ`);
  });
