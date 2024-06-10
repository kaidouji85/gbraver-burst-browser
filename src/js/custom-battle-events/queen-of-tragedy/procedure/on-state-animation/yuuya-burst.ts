import { Animate } from "../../../../animation/animate";
import { CustomStateAnimation } from "../../../../td-scenes/battle/custom-battle-event";
import { playerBattleCount } from "../../../battle-count";
import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { separatePlayersFromCurrentState } from "../../../separate-players";
import { yuuyaBurstShoutWhenLastYearTrauma } from "../../animation/yuuya-burst-shout-when-last-year-trauma";
import { QueenOfTragedyProps } from "../../props";

/** ユウヤ バースト */
export const yuuyaBurst: ConditionalAnimation<
  CustomStateAnimation & QueenOfTragedyProps
> = (props) => {
  const separatedPlayers = separatePlayersFromCurrentState(props);
  if (!separatedPlayers) {
    return null;
  }

  let result: Animate | null = null;
  const { player, enemy } = separatedPlayers;
  const { stateHistory, currentState } = props;
  const tsubasaBattleCount = playerBattleCount(stateHistory, enemy.playerId);
  const isPlayerBurstActivated =
    currentState.effect.name === "BurstEffect" &&
    currentState.activePlayerId === player.playerId;

  if (tsubasaBattleCount === 1 && isPlayerBurstActivated) {
    result = yuuyaBurstShoutWhenLastYearTrauma(props);
  }

  return result;
};
