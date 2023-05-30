import { GameState } from "gbraver-burst-core";
import { StateAnimationProps } from "../animation/state-history/state-animation-props";
import { Animate } from "../../../animation/animate";
import { stateAnimation } from "../animation/state-history";
import { empty } from "../../../animation/delay";

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
 * @deprecated
 * ゲームステート履歴を戦闘アニメーションに変換する
 *
 * @param props 戦闘シーンプロパティ
 * @param gameStateHistory 変換対象のゲームステートヒストリー
 * @return アニメーション
 */
export function stateHistoryAnimation(
  props: StateAnimationProps,
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