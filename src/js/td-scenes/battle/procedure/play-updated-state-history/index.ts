import { GameState } from "gbraver-burst-core";

import { stateAnimation } from "../../animation/game-state";
import { createAnimationPlay } from "../../play-animation";
import { BattleSceneProps } from "../../props";
import { createCustomStateHistoryAnimations } from "./create-custom-state-history-animations";
import { createLastStateEventProps } from "./create-last-state-event-props";

/**
 * 更新されたステートヒストリーを再生する
 * 本関数は、props.stateHistory に更新分のステートヒストリーが追加されていることを前提とする
 * @param props 戦闘シーンのプロパティ
 * @param update 再生対象となる更新分のステートヒストリー
 * @returns アニメーション
 */
export async function playUpdatedStateHistory(
  props: Readonly<BattleSceneProps>,
  update: GameState[],
): Promise<void> {
  const lastState = update.at(-1);
  if (!lastState) {
    return;
  }

  props.customBattleEvent?.onStateUpdateStarted({
    ...props,
    update,
    lastState,
  });
  const playAnimation = createAnimationPlay(props);
  const customStateAnimations = createCustomStateHistoryAnimations(
    props,
    update,
  );
  await playAnimation(customStateAnimations);

  const eventProps = createLastStateEventProps(props, update);
  await props.customBattleEvent?.beforeLastState(eventProps);
  await Promise.all([
    playAnimation(stateAnimation(props, lastState)),
    props.customBattleEvent?.onLastState(eventProps) ?? Promise.resolve(),
  ]);
  await props.customBattleEvent?.afterLastState(eventProps);
}
