import type { Command, GameEnd, GameState } from "gbraver-burst-core";

import { fadeOut, stop } from "../../../bgm/bgm-operators";
import type { BattleSceneProps } from "../battle-scene-props";
import { playStateHistory } from "./play-state-history";

/**
 * コマンド選択可能になるまでゲームを進める
 * 本関数ではprops.stateHistoryを更新する副作用がある
 * @param props 戦闘シーンプロパティ
 * @param command プレイヤーが入力したコマンド
 * @return 処理が完了したら発火するPromise
 */
const repeatProgressWhenUnselectable = async (
  props: BattleSceneProps,
  command: Command,
): Promise<GameState | null> => {
  let lastCommand: Command = command;
  const maxProgressCount = 100;
  for (let i = 0; i < maxProgressCount; i++) {
    const updateState = await props.battleProgress.progress(lastCommand);
    if (updateState.length < 1) {
      return null;
    }

    props.stateHistory = [...props.stateHistory, ...updateState];
    await playStateHistory(props, updateState);
    const lastState: GameState = updateState[updateState.length - 1];
    if (lastState.effect.name !== "InputCommand") {
      return lastState;
    }

    const playerCommand = lastState.effect.players.find(
      (v) => v.playerId === props.playerId,
    );
    if (!playerCommand || playerCommand.selectable) {
      return lastState;
    }

    lastCommand = playerCommand.nextTurnCommand;
  }

  return null;
};

/**
 * ゲームが終了した際の処理
 * @param props 戦闘シーンプロパティ
 * @param gameEnd ゲーム終了情報
 * @return 処理が完了したら発火するPromise
 */
const onGameEnd = async (
  props: Readonly<BattleSceneProps>,
  gameEnd: GameEnd,
): Promise<void> => {
  await props.bgm.do(fadeOut);
  await props.bgm.do(stop);
  props.endBattle.next({
    gameEnd,
    animationTimeScale: props.animationTimeScale,
  });
};

/**
 * ゲームを進めるヘルパーメソッド
 * 本関数ではprops.stateHistoryを更新する副作用がある
 * @param command プレイヤーが入力したコマンド
 * @return 処理が完了したら発火するPromise
 */
export async function progressGame(
  props: BattleSceneProps,
  command: Command,
): Promise<void> {
  const lastState = await repeatProgressWhenUnselectable(props, command);
  if (lastState && lastState.effect.name === "GameEnd") {
    await onGameEnd(props, lastState.effect);
  }
}
