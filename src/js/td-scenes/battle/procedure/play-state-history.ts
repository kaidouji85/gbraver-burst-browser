import { GameState } from "gbraver-burst-core";

import { all } from "../../../animation/all";
import { empty } from "../../../animation/delay";
import { getMainTurnCount } from "../../../custom-battle-events/get-main-turn-count";
import { separatePlayers } from "../../../custom-battle-events/separate-players";
import { stateAnimation } from "../animation/game-state";
import { createAnimationPlay } from "../play-animation";
import { BattleSceneProps } from "../props";

/**
 * 同時再生する効果
 * 以下効果が連続した場合、アニメーションは並列再生される
 */
const parallelPlayEffects = [
  "TurnChange",
  "RightItself",
  "UpdateRemainingTurn",
];

/**
 * ステートヒストリーアニメーションを再生し、カスタムバトルイベントを呼び出す
 * 本関数を呼び出す前にprops.stateHistoryを最新化すること
 * @param props 戦闘シーンプロパティ
 * @param gameStateHistory 再生するゲームステートヒストリー
 * @returns アニメーション
 */
export async function playStateHistory(
  props: Readonly<BattleSceneProps>,
  gameStateHistory: GameState[],
): Promise<void> {
  const lastState = gameStateHistory.at(-1);
  if (!lastState) {
    return;
  }

  props.customBattleEvent?.onStateUpdateStarted({
    ...props,
    update: gameStateHistory,
    lastState,
  });
  const playAnimation = createAnimationPlay(props);
  const stateHistoryWithLastRemoved = gameStateHistory.slice(0, -1);
  await playAnimation(
    stateHistoryWithLastRemoved
      .map((gameState, index) => {
        const next = stateHistoryWithLastRemoved[index + 1];
        const isParallel =
          next &&
          parallelPlayEffects.includes(next.effect.name) &&
          parallelPlayEffects.includes(gameState.effect.name);
        const updateUntilNow = gameStateHistory.slice(0, index + 1);
        const previousStateHistoryLength =
          props.stateHistory.length - gameStateHistory.length;
        const previousStateHistory = props.stateHistory.slice(
          0,
          previousStateHistoryLength,
        );
        const stateHistoryUntilNow = [
          ...previousStateHistory,
          ...updateUntilNow,
        ];
        const separatedPlayers = separatePlayers(props, gameState);
        const player = separatedPlayers?.player ?? gameState.players[0];
        const playerMainTurnCount = getMainTurnCount({
          stateHistory: gameStateHistory,
          playerId: player.playerId,
        });
        const enemy = separatedPlayers?.enemy ?? gameState.players[1];
        const enemyMainTurnCount = getMainTurnCount({
          stateHistory: gameStateHistory,
          playerId: enemy.playerId,
        });
        const customStateAnimationProps = {
          ...props,
          currentState: gameState,
          update: gameStateHistory,
          updateUntilNow,
          stateHistoryUntilNow,
          player,
          playerMainTurnCount,
          enemy,
          enemyMainTurnCount,
        };
        const anime = all(
          stateAnimation(props, gameState),
          props.customBattleEvent?.onStateAnimation(
            customStateAnimationProps,
          ) ?? empty(),
        ).chain(
          empty(),
          props.customBattleEvent?.afterStateAnimation(
            customStateAnimationProps,
          ) ?? empty(),
        );
        return {
          anime,
          isParallel,
        };
      })
      .reduce(
        (previous, current) =>
          current.isParallel
            ? previous.chain(empty(), current.anime)
            : previous.chain(current.anime),
        empty(),
      ),
  );

  const separatedPlayersFromLastState = separatePlayers(props, lastState);
  const player = separatedPlayersFromLastState?.player ?? lastState.players[0];
  const enemy = separatedPlayersFromLastState?.enemy ?? lastState.players[1];
  const playerMainTurnCount = getMainTurnCount({
    stateHistory: gameStateHistory,
    playerId: player.playerId,
  });
  const enemyMainTurnCount = getMainTurnCount({
    stateHistory: gameStateHistory,
    playerId: enemy.playerId,
  });
  const eventProps = {
    ...props,
    player,
    playerMainTurnCount,
    enemy,
    enemyMainTurnCount,
    update: gameStateHistory,
    lastState,
  };
  await props.customBattleEvent?.beforeLastState(eventProps);
  await Promise.all([
    playAnimation(stateAnimation(props, lastState)),
    props.customBattleEvent?.onLastState(eventProps) ?? Promise.resolve(),
  ]);
  await props.customBattleEvent?.afterLastState(eventProps);
}
