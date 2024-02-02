import { Animate } from "../animation/animate";
import { process } from "../animation/process";
import { MessageWindow } from "../game-dom/message-window";
import { FaceType } from "../game-dom/message-window/face-graphic";
import { CustomBattleEventProps } from "../td-scenes/battle/custom-battle-event";

/**
 * パイロットの叫び
 * @param messageWindow メッセージウィンドウ
 * @param face 顔グラフィック
 * @param message メッセージ
 */
function pilotShout(
  messageWindow: MessageWindow,
  face: FaceType,
  message: string,
): void {
  messageWindow.visible(true);
  messageWindow.lighten();
  messageWindow.face(face);
  messageWindow.faceVisible(true);
  messageWindow.messages([message]);
  messageWindow.nextMessageIconVisible(false);
}

/**
 * プレイヤーパイロットの叫び
 * @param props カスタムイベントプロパティ
 * @param face 顔グラフィック
 * @param message メッセージ
 */
export const playerPilotShout = (
  props: Readonly<CustomBattleEventProps>,
  face: FaceType,
  message: string,
): Animate =>
  process(() => {
    pilotShout(props.view.dom.playerCryMessageWindow, face, message);
    props.view.dom.enemyCryMessageWindow.visible(false);
  });

/**
 * 敵パイロットの叫び
 * @param props カスタムイベントプロパティ
 * @param face 顔グラフィック
 * @param message メッセージ
 */
export const enemyPilotShout = (
  props: Readonly<CustomBattleEventProps>,
  face: FaceType,
  message: string,
): Animate =>
  process(() => {
    pilotShout(props.view.dom.enemyCryMessageWindow, face, message);
    props.view.dom.playerCryMessageWindow.visible(false);
  });
