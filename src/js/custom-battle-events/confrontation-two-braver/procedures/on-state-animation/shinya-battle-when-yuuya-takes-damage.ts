import { CustomStateAnimation } from "../../../../td-scenes/battle/custom-battle-event";
import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { separatePlayersFromCurrentState } from "../../../separate-players";
import { shinyaAttackCryWhenYuuyaHPIsFull } from "../../animation/shinya-attack-cry-when-yuuya-hp-is-full";
import { ConfrontationTwoBraverProps } from "../../props";

/** シンヤ 戦闘 ユウヤがダメージを受けている */
export const shinyaBattleWhenYuuyaTakesDamage: ConditionalAnimation<
  CustomStateAnimation & ConfrontationTwoBraverProps
>[] = [
  (props) => {
    const separatedResult = separatePlayersFromCurrentState(props);
    if (!separatedResult) {
      return null;
    }

    const { player, enemy } = separatedResult;
    const isYuuyaDamaged = enemy.armdozer.hp < enemy.armdozer.maxHp;
    return isYuuyaDamaged &&
      props.currentState.effect.name === "BatteryDeclaration" &&
      props.currentState.effect.attacker === player.playerId
      ? shinyaAttackCryWhenYuuyaHPIsFull(props)
      : null;
  },
];
