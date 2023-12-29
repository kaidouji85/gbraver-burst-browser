import { LastState } from "../../../../td-scenes/battle/custom-battle-event";
import { ConfrontationTwoBraverProps } from "../../props";

/**
 * 条件を満たした場合、敵叫びメッセージウインドウを非表示にする
 * @param props イベントプロパティ
 */
export function invisibleEnemyCryIfNeeded(
  props: Readonly<LastState & ConfrontationTwoBraverProps>,
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

  if (!playerCommand.selectable) {
    return;
  }

  if (props.state.chapter.type === "None") {
    return;
  }

  props.view.dom.enemyCryMessageWindow.visible(false);
}
