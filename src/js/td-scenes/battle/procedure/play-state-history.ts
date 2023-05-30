import { GameState } from "gbraver-burst-core";
import { StateAnimationProps } from "../animation/game-state/state-animation-props";
import { Animate } from "../../../animation/animate";
import { stateAnimation } from "../animation/game-state";
import { empty } from "../../../animation/delay";
import { CustomBattleEvent } from "../custom-battle-event";

/**
 * 同時再生する効果
 * 以下効果が連続した場合、アニメーションは並列再生される
 */
const parallelPlayEffects = [
  "TurnChange",
  "RightItself",
  "UpdateRemainingTurn",
];

/** ステートヒストリーアニメーションのプロパティ */
type StateHistoryAnimationProps = StateAnimationProps & {
    /** カスタムバトルイベント */
    customBattleEvent?: CustomBattleEvent;
};

/**
 * ステートヒストリーをアニメーションとして再生する
 * @param props 戦闘シーンプロパティ
 * @param gameStateHistory 変換対象のゲームステートヒストリー
 * @return アニメーション
 */
export function stateHistoryAnimation(
  props: StateHistoryAnimationProps,
  gameStateHistory: GameState[]
): Animate {
  return gameStateHistory
    .map((gameState, index) => {
      const next = gameStateHistory[index + 1];
      const isParallel =
        next &&
        parallelPlayEffects.includes(next.effect.name) &&
        parallelPlayEffects.includes(gameState.effect.name);
      const anime = stateAnimation(props, gameState);
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
      empty()
    );
}