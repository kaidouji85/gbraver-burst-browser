// @flow
import type {Command, GameState} from "gbraver-burst-core";
import type {GameEnd} from "gbraver-burst-core/lib/effect/game-end/game-end";
import {fadeOut, stop} from "../../../../bgm/bgm-operators";
import {stateAnimation, stateHistoryAnimation} from "../animation/state-history";
import type {BattleSceneProps} from "../battle-scene-props";
import {playAnimation} from "../play-animation";
import {toCustomBattleEventProps} from "../to-custom-battle-event-props";

/**
 * コマンド選択可能になるまでゲームを進める
 * 
 * @param props 戦闘シーンプロパティ
 * @param command プレイヤーが入力したコマンド 
 * @return 処理が完了したら発火するPromise
 */
const repeatProgressWhenUnselectable = async (props: $ReadOnly<BattleSceneProps>, command: Command): Promise<?GameState> => {
  let lastCommand: Command = command;
  const maxProgressCount = 100;
  for (let i=0; i<maxProgressCount; i++) {
    const updateState = await props.battleProgress.progress(lastCommand);
    if (updateState.length < 1) {
      return;
    }
    const removeLastState = updateState.slice(0 , -1);
    await playAnimation(stateHistoryAnimation(props, removeLastState), props);
    const lastState: GameState = updateState[updateState.length - 1];
    const eventProps = {...toCustomBattleEventProps(props), update: updateState};
    props.customBattleEvent && await props.customBattleEvent.beforeLastState(eventProps);
    await Promise.all([
      playAnimation(stateAnimation(lastState, props.view, props.sounds, props.state), props),
      props.customBattleEvent ? props.customBattleEvent.onLastState(eventProps) : Promise.resolve(),
    ]);
    props.customBattleEvent && await props.customBattleEvent.afterLastState(eventProps);
    if (lastState.effect.name !== 'InputCommand') {
      return lastState;
    }
    const playerCommand = lastState.effect.players.find(v => v.playerId === props.state.playerId);
    if (!playerCommand || playerCommand.selectable) {
      return lastState;
    }
    lastCommand = playerCommand.nextTurnCommand;
  }
  return null
};

/**
 * ゲームが終了した際の処理
 * 
 * @param props 戦闘シーンプロパティ
 * @param gameEnd ゲーム終了情報
 * @return 処理が完了したら発火するPromise
 */
const onGameEnd = async (props: $ReadOnly<BattleSceneProps>, gameEnd: GameEnd): Promise<void> => {
  await props.bgm.do(fadeOut)
  await props.bgm.do(stop);
  props.endBattle.next({gameEnd, animationTimeScale: props.state.animationTimeScale});
};

/**
  * ゲームを進めるヘルパーメソッド
  *
  * @param command プレイヤーが入力したコマンド
  * @return 処理が完了したら発火するPromise
  */
export async function progressGame(props: $ReadOnly<BattleSceneProps>, command: Command): Promise<void> {
  const lastState = await repeatProgressWhenUnselectable(props, command);
    if (lastState && lastState.effect.name === 'GameEnd') {
      await onGameEnd(props, lastState.effect);
    }
}