import { CustomStateAnimation } from "../../../../td-scenes/battle/custom-battle-event";
import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { separatePlayersFromCurrentState } from "../../../separate-players";
import { yuuyaAttackCryWhenShinyaHPIsFull } from "../../animation/yuuya-attack-cry-when-shinya-hp-is-full";
import { ConfrontationTwoBraverProps } from "../../props";

/** ユウヤ 戦闘 シンヤのHPが満タン */
export const yuuyaBattleWhenShinyaHPIsFull: ConditionalAnimation<
  CustomStateAnimation & ConfrontationTwoBraverProps
>[] = [
  (props) => {
    const separatedResult = separatePlayersFromCurrentState(props);
    if (!separatedResult) {
      return null;
    }

    const { player, enemy } = separatedResult;
    const isShinyaHPFull = player.armdozer.hp === player.armdozer.maxHp;
    return isShinyaHPFull &&
      props.currentState.effect.name === "BatteryDeclaration" &&
      props.currentState.effect.attacker === enemy.playerId
      ? yuuyaAttackCryWhenShinyaHPIsFull(props)
      : null;
  },
];
