import { GameState } from "gbraver-burst-core";

import { empty } from "../../../../animation/delay";
import { stateAnimation } from "../../animation/game-state";
import { createAnimationPlay } from "../../play-animation";
import { BattleSceneProps } from "../../props";
import { createLastStateEventProps } from "./create-last-state-event-props";
import { createCustomStateHistoryAnimation } from "./custom-state-history-animation";

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
      .map((gameState, index) =>
        createCustomStateHistoryAnimation({
          props,
          gameStateHistory,
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
      ),
  );

  const eventProps = createLastStateEventProps(props, gameStateHistory);
  await props.customBattleEvent?.beforeLastState(eventProps);
  await Promise.all([
    playAnimation(stateAnimation(props, lastState)),
    props.customBattleEvent?.onLastState(eventProps) ?? Promise.resolve(),
  ]);
  await props.customBattleEvent?.afterLastState(eventProps);
}
