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
  props.view.dom.playerCryMessageWindow.visible(false);
  props.view.dom.enemyCryMessageWindow.visible(false);
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
  if (props.currentState.effect.name !== "TurnChange") {
    return null;
  }

  return process(() => {
    invisibleCryMessageWindow(props);
  });
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
