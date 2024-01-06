import { GameState } from "gbraver-burst-core";

import { LastState } from "../td-scenes/battle/custom-battle-event";

/**
 * プレイヤーがコマンド選択不可であるかを判定する
 * @param lastState 最終ゲームステート
 * @return 判定結果、trueであればプレイヤーがコマンド選択不可である
 */
function isPlayerNotSelectable(lastState: GameState): boolean {
  if (lastState.effect.name !== "InputCommand") {
    return false;
  }

  const playerCommand = lastState.effect.players.find(
    (v) => v.playerId === "player",
  );
  if (!playerCommand) {
    return false;
  }

  return !playerCommand.selectable;
}

/**
 * 条件を満たした場合、叫びメッセージウインドウを非表示にする
 * 本関数はbeforeLastStateで呼び出すことを想定している
 * @param props イベントプロパティ
 */
export function invisibleCryMessageWindowIfNeeded(
  props: Readonly<LastState>,
): void {
  const lastState = props.update.at(-1);
  if (lastState && isPlayerNotSelectable(lastState)) {
    return;
  }

  props.view.dom.playerCryMessageWindow.visible(false);
  props.view.dom.enemyCryMessageWindow.visible(false);
}
