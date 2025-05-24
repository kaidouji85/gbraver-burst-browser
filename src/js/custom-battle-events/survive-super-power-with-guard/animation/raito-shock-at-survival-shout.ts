import { onStart } from "../../../animation/on-start";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { enemyPilotOnlyShout } from "../../pilot-shout";

/**
 * ライト 攻撃に耐えた驚き 叫び
 * @param props イベントプロパティ
 * @returns アニメーション
 */
export const raitoShockAtSurvivalShout = (
  props: Readonly<CustomBattleEventProps>,
) =>
  onStart(() => {
    enemyPilotOnlyShout(props, "Raito", `新型の攻撃に耐えるやと!?`);
  });
