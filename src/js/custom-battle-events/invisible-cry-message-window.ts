import {CustomBattleEventProps, LastState} from "../td-scenes/battle/custom-battle-event";

function invisibleCryMessageWindow(
  props: Readonly<CustomBattleEventProps>
): void {
  props.view.dom.playerCryMessageWindow.visible(false);
  props.view.dom.enemyCryMessageWindow.visible(false);
}

export function invisibleCryMessageWindowWhenInputCommandWithSelectableStart(
  props: Readonly<LastState>
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

export function invisibleCryMessageWindowWhenGameEnd(
  props: Readonly<LastState>
): void {
  const lastState = props.update.at(-1);
  if (!lastState) {
    return;
  }

  if (lastState.effect.name === "GameEnd") {
    invisibleCryMessageWindow(props);
  }
}

/**
 * プレイヤーがコマンド選択不可であるかを判定する
 * @param props イベントプロパティ
 * @return 判定結果、trueであればプレイヤーがコマンド選択不可である
 */
function isPlayerNotSelectable(props: Readonly<LastState>): boolean {
  const lastState = props.update.at(-1);
  if (!lastState) {
    return false;
  }

  if (lastState.effect.name !== "InputCommand") {
    return false;
  }

  const playerCommand = lastState.effect.players.find(
    (v) => v.playerId === props.playerId,
  );
  if (!playerCommand) {
    return false;
  }

  return !playerCommand.selectable;
}

/**
 * @deprecated
 * 条件を満たした場合、叫びメッセージウインドウを非表示にする
 * 本関数はbeforeLastStateで呼び出すことを想定している
 * @param props イベントプロパティ
 */
export function invisibleCryMessageWindow(
  props: Readonly<LastState>,
): void {
  if (isPlayerNotSelectable(props)) {
    return;
  }

  props.view.dom.playerCryMessageWindow.visible(false);
  props.view.dom.enemyCryMessageWindow.visible(false);
}
