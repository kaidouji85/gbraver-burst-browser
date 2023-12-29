import { LastState } from "../td-scenes/battle/custom-battle-event";

/**
 * 条件を満たした場合、叫びメッセージウインドウを非表示にする
 * 本関数はbeforeLastStateで呼び出すことを想定している
 * @param props イベントプロパティ
 */
export function invisibleCryMessageWindowIfNeeded(
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
    props.view.dom.playerCryMessageWindow.visible(false);
    props.view.dom.enemyCryMessageWindow.visible(false);
  }
}
