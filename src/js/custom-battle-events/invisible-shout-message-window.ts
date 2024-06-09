import { Animate } from "../animation/animate";
import { onStart } from "../animation/on-start";
import {
  CustomBattleEventProps,
  CustomStateAnimation,
  LastState,
} from "../td-scenes/battle/custom-battle-event";

/**
 * 全ての叫びウインドウを非表示にする
 * @param props イベントプロパティ
 */
function invisibleShoutMessageWindow(
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
export function invisibleShoutMessageWindowWhenTurnChange(
  props: Readonly<CustomStateAnimation>,
): Animate | null {
  return props.currentState.effect.name === "TurnChange"
    ? onStart(() => {
        invisibleShoutMessageWindow(props);
      })
    : null;
}

/**
 * コマンド入力時に叫びウインドウを非表示にする
 * 本関数はbeforeLastStateで呼び出す想定である
 * @param props イベントプロパティ
 */
export function invisibleShoutMessageWindowWhenInputCommand(
  props: Readonly<LastState>,
): void {
  const { lastState } = props;
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
    invisibleShoutMessageWindow(props);
  }
}

/**
 * ゲーム終了時後に叫びウインドウを非表示にする
 * 本関数はafterLastStateで呼び出す想定である
 * @param props イベントプロパティ
 */
export function invisibleShoutMessageWindowWhenGameEnd(
  props: Readonly<LastState>,
): void {
  const { lastState } = props;
  if (lastState.effect.name === "GameEnd") {
    invisibleShoutMessageWindow(props);
  }
}
