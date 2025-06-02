import { GameState } from "gbraver-burst-core";

import { all } from "../../../../animation/all";
import { Animate } from "../../../../animation/animate";
import { empty } from "../../../../animation/delay";
import { getMainTurnCount } from "../../../../custom-battle-events/get-main-turn-count";
import { separatePlayers } from "../../../../custom-battle-events/separate-players";
import { stateAnimation } from "../../animation/game-state";
import { CustomStateAnimationProps } from "../../custom-battle-event";
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
 * 連続した効果が並列再生かどうか判定する
 * @param options 判定に必要な情報
 * @returns 並列再生かどうか、trueなら並列再生
 */
function isParallelForCustomStateHistory(options: {
  /** 現在のステート */
  currentState: GameState;
  /** 次のステート */
  nextState: GameState | undefined;
}): boolean {
  const { currentState, nextState } = options;
  return (
    !!nextState &&
    parallelPlayEffects.includes(nextState.effect.name) &&
    parallelPlayEffects.includes(currentState.effect.name)
  );
}

/**
 * customStateAnimationPropsを生成する
 * @param options 生成に必要な情報
 * @returns 生成結果
 */
function createCustomStateAnimationProps(options: {
  /** 戦闘シーンのプロパティ */
  props: Readonly<BattleSceneProps>;
  /** 現在のステート */
  currentState: GameState;
  /** 更新分のステートヒストリー */
  update: GameState[];
  /** 現在のステートまでの更新分ステートヒストリー */
  updateUntilNow: GameState[];
}) {
  const { props, currentState, update, updateUntilNow } = options;
  const previousStateHistoryLength = props.stateHistory.length - update.length;
  const previousStateHistory = props.stateHistory.slice(
    0,
    previousStateHistoryLength,
  );
  const stateHistoryUntilNow = [...previousStateHistory, ...updateUntilNow];
  const separatedPlayers = separatePlayers(props, currentState);
  const player = separatedPlayers?.player ?? currentState.players[0];
  const playerMainTurnCount = getMainTurnCount({
    stateHistory: stateHistoryUntilNow,
    playerId: player.playerId,
  });
  const enemy = separatedPlayers?.enemy ?? currentState.players[1];
  const enemyMainTurnCount = getMainTurnCount({
    stateHistory: stateHistoryUntilNow,
    playerId: enemy.playerId,
  });
  const mainTurnCount = playerMainTurnCount + enemyMainTurnCount;
  return {
    ...props,
    currentState,
    update,
    updateUntilNow,
    stateHistoryUntilNow,
    mainTurnCount,
    player,
    playerMainTurnCount,
    enemy,
    enemyMainTurnCount,
  };
}

/**
 * animeを生成する
 * @param options 生成に必要な情報
 * @returns 生成結果
 */
function createCustomStateAnime(options: {
  /** 戦闘シーンのプロパティ */
  props: Readonly<BattleSceneProps>;
  /** 現在のステート */
  currentState: GameState;
  /** カスタムステートアニメーションのプロパティ */
  customStateAnimationProps: CustomStateAnimationProps;
}) {
  const { props, currentState, customStateAnimationProps } = options;
  return all(
    stateAnimation(props, currentState),
    props.customBattleEvent?.onStateAnimation(customStateAnimationProps) ??
      empty(),
  ).chain(
    empty(),
    props.customBattleEvent?.afterStateAnimation(customStateAnimationProps) ??
      empty(),
  );
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
    .map((currentState, index) => {
      const nextState = stateHistoryWithLastRemoved[index + 1];
      const isParallel = isParallelForCustomStateHistory({ currentState, nextState });
      const updateUntilNow = update.slice(0, index + 1);
      const customStateAnimationProps = createCustomStateAnimationProps({
        props,
        update,
        currentState,
        updateUntilNow,
      });
      const anime = createCustomStateAnime({
        props,
        currentState,
        customStateAnimationProps,
      });
      return { anime, isParallel };
    })
    .reduce(
      (previous, current) =>
        current.isParallel
          ? previous.chain(empty(), current.anime)
          : previous.chain(current.anime),
      empty(),
    );
}
