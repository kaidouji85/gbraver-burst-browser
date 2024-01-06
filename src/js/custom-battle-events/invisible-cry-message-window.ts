import {
  CustomBattleEventProps,
  LastState,
} from "../td-scenes/battle/custom-battle-event";

/**
 * 全ての叫びウインドウを非表示にする
 * @param props イベントプロパティ
 */
function invisibleCryMessageWindow(
  props: Readonly<CustomBattleEventProps>,
): void {
  props.view.dom.playerCryMessageWindow.visible(false);
  props.view.dom.enemyCryMessageWindow.visible(false);
}

/**
 * コマンド入力開始時に叫びウインドウを非表示にする
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
    (v) => v.playerId === props.playerId,
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
