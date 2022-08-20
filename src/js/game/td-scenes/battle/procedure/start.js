// @flow
import type {GameState} from "gbraver-burst-core";
import {play} from "../../../../bgm/bgm-operators";
import {stateAnimation, stateHistoryAnimation,} from "../animation/state-history";
import {toReferableBattleSceneProps} from "../animation/state-history/referable-battle-scene-props";
import type {BattleSceneProps} from "../battle-scene-props";
import {playAnimation} from "../play-animation";
import {toCustomBattleEventProps} from "../to-custom-battle-event-props";

/**
 * 戦闘シーンを開始する
 * 
 * @param props 戦闘シーンプロパティ
 * @return 処理が完了したら発火するPromise
 */
export async function start(props: $ReadOnly<BattleSceneProps>): Promise<void> {
  const referableProps = toReferableBattleSceneProps(props);
  return props.exclusive.execute(async (): Promise<void> => {
    props.bgm.do(play(props.sounds.bgm));
    if (props.initialState.length < 1) {
      return;
    }
    const removeLastState = props.initialState.slice(0, -1);
    await playAnimation(stateHistoryAnimation(referableProps, removeLastState), props);
    const eventProps = {...toCustomBattleEventProps(props), update: props.initialState};
    props.customBattleEvent && await props.customBattleEvent.beforeLastState(eventProps);
    const lastState: GameState = props.initialState[props.initialState.length - 1];
    await Promise.all([
      playAnimation(stateAnimation(referableProps, lastState), props),
      props.customBattleEvent ? props.customBattleEvent.onLastState(eventProps) : Promise.resolve()
    ]);
    props.customBattleEvent && await props.customBattleEvent.afterLastState(eventProps);
  });
}