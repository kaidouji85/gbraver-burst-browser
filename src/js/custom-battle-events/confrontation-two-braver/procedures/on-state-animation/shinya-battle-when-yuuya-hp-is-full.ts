import { CustomStateAnimation } from "../../../../td-scenes/battle/custom-battle-event";
import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { separatePlayersFromCurrentState } from "../../../separate-players";
import { shinyaAttackShoutWhenYuuyaHPIsFull } from "../../animation/shinya-attack-shout-when-yuuya-hp-is-full";
import { ConfrontationTwoBraverProps } from "../../props";

/** シンヤ 戦闘 ユウヤのHPが満タン */
export const shinyaBattleWhenYuuyaHPIsFull: ConditionalAnimation<
  CustomStateAnimation & ConfrontationTwoBraverProps
>[] = [
  (props) => {
    const separatedResult = separatePlayersFromCurrentState(props);
    if (!separatedResult) {
      return null;
    }

    const { player, enemy } = separatedResult;
    const isYuuyaHPFull = enemy.armdozer.hp === enemy.armdozer.maxHp;
    return isYuuyaHPFull &&
      props.currentState.effect.name === "BatteryDeclaration" &&
      props.currentState.effect.attacker === player.playerId
      ? shinyaAttackShoutWhenYuuyaHPIsFull(props)
      : null;
  },
];
