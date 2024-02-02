import { Animate } from "../animation/animate";
import { process } from "../animation/process";
import {
  CustomBattleEventProps,
  CustomStateAnimation,
  LastState,
} from "../td-scenes/battle/custom-battle-event";

/**
 * 全ての叫びウインドウを非表示にする
 * @param props イベントプロパティ
 */
function invisibleCryMessageWindow(
  props: Readonly<CustomBattleEventProps>,
): void {
  props.view.dom.playerShoutMessageWindow.visible(false);
  props.view.dom.enemyShoutMessageWindow.visible(false);
}

/**
 * ターン開始時に叫びウインドウを非表示にする
 * 本関数はonStateAnimationで呼び出す想定である
 * @param props イベントプロパティ
 * @returns ターン開始時なら再生するアニメーション、それ以外はnull
 */
export function invisibleCryMessageWindowWhenTurnChange(
  props: Readonly<CustomStateAnimation>,
): Animate | null {
  return props.currentState.effect.name === "TurnChange"
    ? process(() => {
        invisibleCryMessageWindow(props);
      })
    : null;
}

/**
 * コマンド入力時に叫びウインドウを非表示にする
 * 本関数はbeforeLastStateで呼び出す想定である
 * @param props イベントプロパティ
 */
export function invisibleCryMessageWindowWhenInputCommand(
  props: Readonly<LastState>,
): void {
  const lastState = props.update.at(-1);
  if (!lastState) {
    return;
  }

  if (lastState.effect.name !== "InputCommand") {
    return;
  }

  const playerCommand = lastState.effect.players.find(
    (command) => command.playerId === props.playerId,
  );
  if (!playerCommand) {
    return;
  }

  if (playerCommand.selectable) {
    invisibleCryMessageWindow(props);
  }
}

/**
 * ゲーム終了時後に叫びウインドウを非表示にする
 * 本関数はafterLastStateで呼び出す想定である
 * @param props イベントプロパティ
 */
export function invisibleCryMessageWindowWhenGameEnd(
  props: Readonly<LastState>,
): void {
  const lastState = props.update.at(-1);
  if (!lastState) {
    return;
  }

  if (lastState.effect.name === "GameEnd") {
    invisibleCryMessageWindow(props);
  }
}
