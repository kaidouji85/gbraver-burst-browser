import type { Command, GameEnd, GameState } from "gbraver-burst-core";

import { fadeOut, stop } from "../../../bgm/bgm-operators";
import { stateAnimation, stateHistoryAnimation } from "../animation/state-history";
import { animationPlayer } from "../animation-player";
import type { BattleSceneProps } from "../battle-scene-props";

/**
 * コマンド選択可能になるまでゲームを進める
 *
 * @param props 戦闘シーンプロパティ
 * @param command プレイヤーが入力したコマンド
 * @return 処理が完了したら発火するPromise
 */
const repeatProgressWhenUnselectable = async (props: Readonly<BattleSceneProps>, command: Command): Promise<GameState | null | undefined> => {
  let lastCommand: Command = command;
  const maxProgressCount = 100;

  for (let i = 0; i < maxProgressCount; i++) {
    const updateState = await props.battleProgress.progress(lastCommand);

    if (updateState.length < 1) {
      return;
    }

    const removeLastState = updateState.slice(0, -1);
    await animationPlayer(props).play(stateHistoryAnimation(props, removeLastState));
    const lastState: GameState = updateState[updateState.length - 1];
    const eventProps = { ...props,
      update: updateState
    };
    props.customBattleEvent && (await props.customBattleEvent.beforeLastState(eventProps));
    await Promise.all([animationPlayer(props).play(stateAnimation(props, lastState)), props.customBattleEvent ? props.customBattleEvent.onLastState(eventProps) : Promise.resolve()]);
    props.customBattleEvent && (await props.customBattleEvent.afterLastState(eventProps));

    if (lastState.effect.name !== "InputCommand") {
      return lastState;
    }

    const playerCommand = lastState.effect.players.find(v => v.playerId === props.playerId);

    if (!playerCommand || playerCommand.selectable) {
      return lastState;
    }

    lastCommand = playerCommand.nextTurnCommand;
  }

  return null;
};

/**
 * ゲームが終了した際の処理
 *
 * @param props 戦闘シーンプロパティ
 * @param gameEnd ゲーム終了情報
 * @return 処理が完了したら発火するPromise
 */
const onGameEnd = async (props: Readonly<BattleSceneProps>, gameEnd: GameEnd): Promise<void> => {
  await props.bgm.do(fadeOut);
  await props.bgm.do(stop);
  props.endBattle.next({
    gameEnd,
    animationTimeScale: props.animationTimeScale
  });
};

/**
 * ゲームを進めるヘルパーメソッド
 *
 * @param command プレイヤーが入力したコマンド
 * @return 処理が完了したら発火するPromise
 */
export async function progressGame(props: Readonly<BattleSceneProps>, command: Command): Promise<void> {
  const lastState = await repeatProgressWhenUnselectable(props, command);

  if (lastState && lastState.effect.name === "GameEnd") {
    await onGameEnd(props, lastState.effect);
  }
}