import type { GameState } from "gbraver-burst-core";

import { play } from "../../../bgm/bgm-operators";
import {
  stateAnimation,
  stateHistoryAnimation,
} from "../animation/game-state";
import { animationPlayer } from "../animation-player";
import type { BattleSceneProps } from "../battle-scene-props";

/**
 * 戦闘シーンを開始する
 *
 * @param props 戦闘シーンプロパティ
 * @return 処理が完了したら発火するPromise
 */
export async function start(props: Readonly<BattleSceneProps>): Promise<void> {
  return props.exclusive.execute(async (): Promise<void> => {
    props.bgm.do(play(props.sounds.bgm));

    if (props.stateHistory.length < 1) {
      return;
    }

    const removeLastState = props.stateHistory.slice(0, -1);
    await animationPlayer(props).play(
      stateHistoryAnimation(props, removeLastState)
    );
    const eventProps = { ...props, update: props.stateHistory };
    props.customBattleEvent &&
      (await props.customBattleEvent.beforeLastState(eventProps));
    const lastState: GameState =
      props.stateHistory[props.stateHistory.length - 1];
    await Promise.all([
      animationPlayer(props).play(stateAnimation(props, lastState)),
      props.customBattleEvent
        ? props.customBattleEvent.onLastState(eventProps)
        : Promise.resolve(),
    ]);
    props.customBattleEvent &&
      (await props.customBattleEvent.afterLastState(eventProps));
  });
}
