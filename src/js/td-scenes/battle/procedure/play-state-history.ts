import { GameState } from "gbraver-burst-core";

import { all } from "../../../animation/all";
import { empty } from "../../../animation/delay";
import { stateAnimation } from "../animation/game-state";
import { BattleSceneProps } from "../battle-scene-props";

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
 * @return アニメーション
 */
export async function playStateHistory(
  props: Readonly<BattleSceneProps>,
  gameStateHistory: GameState[],
): Promise<void> {
  if (gameStateHistory.length <= 0) {
    return;
  }

  const removeLastState = gameStateHistory.slice(0, -1);
  await props.animatePlayer.play(
    removeLastState
      .map((gameState, index) => {
        const next = removeLastState[index + 1];
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
          props.customBattleEvent
            ? props.customBattleEvent.onStateAnimation(
                customStateAnimationProps,
              )
            : empty(),
        ).chain(
          empty(),
          props.customBattleEvent
            ? props.customBattleEvent.afterStateAnimation(
                customStateAnimationProps,
              )
            : empty(),
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
  const lastState = gameStateHistory[gameStateHistory.length - 1];
  const eventProps = { ...props, update: gameStateHistory };
  if (props.customBattleEvent) {
    await props.customBattleEvent.beforeLastState(eventProps);
  }
  await Promise.all([
    props.animatePlayer.play(stateAnimation(props, lastState)),
    props.customBattleEvent
      ? props.customBattleEvent.onLastState(eventProps)
      : Promise.resolve(),
  ]);
  if (props.customBattleEvent) {
    await props.customBattleEvent.afterLastState(eventProps);
  }
}
