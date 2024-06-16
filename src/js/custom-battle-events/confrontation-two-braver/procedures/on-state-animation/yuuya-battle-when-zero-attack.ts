import { CustomStateAnimation } from "../../../../td-scenes/battle/custom-battle-event";
import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { yuuyaShoutWhenZeroAttack } from "../../animation/yuuya-shout-when-zero-attack";
import { ConfrontationTwoBraverProps } from "../../props";

/** ユウヤ 戦闘 ０攻撃 */
export const yuuyaBattleWhenZeroAttack: ConditionalAnimation<
  CustomStateAnimation & ConfrontationTwoBraverProps
>[] = [
  (props) =>
    props.currentState.effect.name === "BatteryDeclaration" &&
    props.currentState.effect.attacker === props.enemyId &&
    props.currentState.effect.attackerBattery === 0
      ? yuuyaShoutWhenZeroAttack(props)
      : null,
];
