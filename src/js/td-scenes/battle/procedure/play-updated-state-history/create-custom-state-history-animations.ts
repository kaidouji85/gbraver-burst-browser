import { GameState } from "gbraver-burst-core";

import { all } from "../../../../animation/all";
import { Animate } from "../../../../animation/animate";
import { empty } from "../../../../animation/delay";
import { getMainTurnCount } from "../../../../custom-battle-events/get-main-turn-count";
import { separatePlayers } from "../../../../custom-battle-events/separate-players";
import { stateAnimation } from "../../animation/game-state";
import { BattleSceneProps } from "../../props";

/**
 * 同時再生する効果
 * 以下効果が連続した場合、アニメーションは並列再生される
 */
export const parallelPlayEffects = [
  "TurnChange",
  "RightItself",
  "UpdateRemainingTurn",
];

/**
 * ステートヒストリーカスタムアニメーションを生成する
 * @param options オプション
 */
function createCustomStateHistoryAnimation(options: {
  /** 戦闘シーンプロパティ */
  props: Readonly<BattleSceneProps>;
  /** 更新分のステートヒストリー */
  update: GameState[];
  /** 最後のステートを除いたヒストリー */
  stateHistoryWithLastRemoved: GameState[];
  /** 現在のゲームステート */
  gameState: GameState;
  /** stateHistoryWithLastRemovedのインデックス */
  index: number;
}) {
  const { props, update, stateHistoryWithLastRemoved, gameState, index } =
    options;
  const next = stateHistoryWithLastRemoved[index + 1];
  const isParallel =
    next &&
    parallelPlayEffects.includes(next.effect.name) &&
    parallelPlayEffects.includes(gameState.effect.name);
  const updateUntilNow = update.slice(0, index + 1);
  const previousStateHistoryLength = props.stateHistory.length - update.length;
  const previousStateHistory = props.stateHistory.slice(
    0,
    previousStateHistoryLength,
  );
  const stateHistoryUntilNow = [...previousStateHistory, ...updateUntilNow];
  const separatedPlayers = separatePlayers(props, gameState);
  const player = separatedPlayers?.player ?? gameState.players[0];
  const playerMainTurnCount = getMainTurnCount({
    stateHistory: stateHistoryUntilNow,
    playerId: player.playerId,
  });
  const enemy = separatedPlayers?.enemy ?? gameState.players[1];
  const enemyMainTurnCount = getMainTurnCount({
    stateHistory: stateHistoryUntilNow,
    playerId: enemy.playerId,
  });
  const mainTurnCount = playerMainTurnCount + enemyMainTurnCount;
  const customStateAnimationProps = {
    ...props,
    currentState: gameState,
    update,
    updateUntilNow,
    stateHistoryUntilNow,
    mainTurnCount,
    player,
    playerMainTurnCount,
    enemy,
    enemyMainTurnCount,
  };
  const anime = all(
    stateAnimation(props, gameState),
    props.customBattleEvent?.onStateAnimation(customStateAnimationProps) ??
      empty(),
  ).chain(
    empty(),
    props.customBattleEvent?.afterStateAnimation(customStateAnimationProps) ??
      empty(),
  );
  return {
    anime,
    isParallel,
  };
}

/**
 * ステートヒストリーカスタムアニメーションをまとめて生成し合成する
 * @param props 戦闘シーンプロパティ
 * @param update 再生対象となる更新分のステートヒストリー
 * @returns 合成済みアニメーション
 */
export function createCustomStateHistoryAnimations(
  props: Readonly<BattleSceneProps>,
  update: GameState[],
): Animate {
  const stateHistoryWithLastRemoved = update.slice(0, -1);
  return stateHistoryWithLastRemoved
    .map((gameState, index) =>
      createCustomStateHistoryAnimation({
        props,
        update,
        stateHistoryWithLastRemoved,
        gameState,
        index,
      }),
    )
    .reduce(
      (previous, current) =>
        current.isParallel
          ? previous.chain(empty(), current.anime)
          : previous.chain(current.anime),
      empty(),
    );
}
