import { Command, GameEnd, GameState, GameStateX } from "gbraver-burst-core";

import { BattleSceneProps } from "../props";
import { playUpdatedStateHistory } from "./play-updated-state-history";

/**
 * コマンド選択可能になるまでゲームを進める
 * カスタムバトルイベントの後方互換を保つために、戻り値はprogressで取得した単位で取り出せるように、二重配列になっている
 * @param props 戦闘シーンプロパティ
 * @param command プレイヤーが入力したコマンド
 * @returns 更新したステート
 */
const repeatProgressWhenUnselectable = async (
  props: Readonly<BattleSceneProps>,
  command: Readonly<Command>,
): Promise<GameState[][]> => {
  let lastCommand: Command = command;
  let updates: GameState[][] = [];
  const maxProgressCount = 100;
  for (let i = 0; i < maxProgressCount; i++) {
    const update = await props.battleProgress.progress(lastCommand);
    updates = [...updates, update];
    const lastState = update.at(-1);
    if (lastState?.effect.name !== "InputCommand") {
      break;
    }

    const playerCommand = lastState.effect.players.find(
      (v) => v.playerId === props.playerId,
    );
    if (!playerCommand || playerCommand.selectable) {
      break;
    }

    lastCommand = playerCommand.nextTurnCommand;
  }

  return updates;
};

/**
 * ゲームが終了した際の処理
 * @param props 戦闘シーンプロパティ
 * @param gameEnd ゲーム終了情報
 * @returns 処理が完了したら発火するPromise
 */
const onGameEnd = async (
  props: Readonly<BattleSceneProps>,
  lastState: GameStateX<GameEnd>,
): Promise<void> => {
  const { effect: gameEnd, players } = lastState;
  const player = players.find((v) => v.playerId === props.playerId);
  if (!player) {
    return;
  }

  props.view.dom.hamburgerMenu.hidden();
  props.endBattle.next({
    gameEnd,
    animationTimeScale: props.animationTimeScale,
    player: {
      armdozerId: player.armdozer.id,
      pilotId: player.pilot.id,
    },
  });
};

/**
 * ゲームを進めるヘルパーメソッド
 * 本関数ではprops.stateHistoryを更新する副作用がある
 * @param command プレイヤーが入力したコマンド
 * @returns 処理が完了したら発火するPromise
 */
export async function progressGame(
  props: BattleSceneProps,
  command: Command,
): Promise<void> {
  const updates = await repeatProgressWhenUnselectable(props, command);
  const isEmpty = updates.flat().length === 0;
  if (isEmpty) {
    return;
  }

  // カスタムバトルイベントの後方互換を保つために
  // updatesから順にステートを取り出して処理する
  for (const update of updates) {
    props.stateHistory = [...props.stateHistory, ...update];
    await playUpdatedStateHistory(props, update);
  }

  const lastState = props.stateHistory.at(-1);
  if (lastState?.effect.name !== "GameEnd") {
    return;
  }

  await onGameEnd(props, { ...lastState, effect: lastState.effect });
}
