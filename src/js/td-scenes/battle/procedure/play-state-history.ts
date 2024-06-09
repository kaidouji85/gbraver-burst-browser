import { GameState } from "gbraver-burst-core";

import { all } from "../../../animation/all";
import { empty } from "../../../animation/delay";
import { stateAnimation } from "../animation/game-state";
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
  const stateHistoryWithLastRemoved = gameStateHistory.slice(0, -1);
  await props.animatePlayer.play(
    stateHistoryWithLastRemoved
      .map((gameState, index) => {
        const next = stateHistoryWithLastRemoved[index + 1];
        const isParallel =
          next &&
          parallelPlayEffects.includes(next.effect.name) &&
          parallelPlayEffects.includes(gameState.effect.name);
        const customStateAnimationProps = {
          ...props,
          currentState: gameState,
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

  const eventProps = { ...props, update: gameStateHistory, lastState };
  await props.customBattleEvent?.beforeLastState(eventProps);
  await Promise.all([
    props.animatePlayer.play(stateAnimation(props, lastState)),
    props.customBattleEvent?.onLastState(eventProps) ?? Promise.resolve(),
  ]);
  await props.customBattleEvent?.afterLastState(eventProps);
}
