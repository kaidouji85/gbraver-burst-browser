import { Animate } from "../../../../animation/animate";
import { empty } from "../../../../animation/delay";
import { CustomStateAnimation } from "../../../../td-scenes/battle/custom-battle-event";
import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { separatePlayers } from "../../../separate-players";
import { gaiBattleShoutWhenGuardAndEnemyFullHP } from "../../animation/gai-battle-shout-when-guard-and-enemy-full-h-p";
import { PrinceOfFallenSunProps } from "../../props";

/** ガイ 戦闘 ガード 敵HPが満タン */
export const gaiBattleWhenGuardAndEnemyFullHP: ConditionalAnimation<
  CustomStateAnimation & PrinceOfFallenSunProps
> = (props) => {
  let result: Animate | null = null;

  const { update, currentState, enemyId } = props;
  const { effect } = currentState;
  const start = update.at(0);
  if (!start) {
    return null;
  }
  const players = separatePlayers(props, start);
  if (!players) {
    return null;
  }

  const { enemy } = players;
  const isEnemyFullHP = enemy.armdozer.hp === enemy.armdozer.maxHp;
  const hasEnemyGuard = update.some(
    (s) =>
      s.effect.name === "Battle" &&
      s.effect.attacker === enemyId &&
      s.effect.result.name === "Guard",
  );
  if (
    isEnemyFullHP &&
    hasEnemyGuard &&
    effect.name === "BatteryDeclaration" &&
    effect.attacker === enemyId
  ) {
    result = gaiBattleShoutWhenGuardAndEnemyFullHP(props);
  } else if (
    isEnemyFullHP &&
    hasEnemyGuard &&
    effect.name === "Battle" &&
    effect.attacker === enemyId
  ) {
    result = empty();
  }

  return result;
};
