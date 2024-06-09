import { Animate } from "../../../../animation/animate";
import { CustomStateAnimation } from "../../../../td-scenes/battle/custom-battle-event";
import { playerBattleCount } from "../../../battle-count";
import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { separatePlayersFromCurrentState } from "../../../separate-players";
import { yuuyaFirstAttackShout1 } from "../../animation/yuuya-first-attack-shout1";
import { yuuyaFirstAttackShout2 } from "../../animation/yuuya-first-attack-shout2";
import { yuuyaFullBatteryAttackOnTraumaOfLastYear } from "../../animation/yuuya-full-battery-attack-on-trauma-of-last-year";
import { QueenOfTragedyProps } from "../../props";

/** ユウヤ 攻撃 */
export const yuuyaAttack: ConditionalAnimation<
  CustomStateAnimation & QueenOfTragedyProps
>[] = [
  (props) => {
    const player = separatePlayersFromCurrentState(props)?.player;
    if (!player) {
      return null;
    }

    let result: Animate | null = null;
    const { stateHistory, currentState } = props;
    const { chapter } = props.state;
    const yuuyaBattleCount = playerBattleCount(stateHistory, player.playerId);
    const isPlayerBatteryDeclaration =
      currentState.effect.name === "BatteryDeclaration" &&
      currentState.activePlayerId === player.playerId;
    const isPlayerBattle =
      currentState.effect.name === "Battle" &&
      currentState.activePlayerId === player.playerId;

    if (
      yuuyaBattleCount === 1 &&
      isPlayerBatteryDeclaration &&
      chapter.type === "TraumaOfLastYear"
    ) {
      result = yuuyaFullBatteryAttackOnTraumaOfLastYear(props);
    } else if (
      yuuyaBattleCount === 1 &&
      isPlayerBatteryDeclaration &&
      chapter.type === "None"
    ) {
      result = yuuyaFirstAttackShout1(props);
    } else if (
      yuuyaBattleCount === 1 &&
      isPlayerBattle &&
      chapter.type === "None"
    ) {
      result = yuuyaFirstAttackShout2(props);
    }

    return result;
  },
];
