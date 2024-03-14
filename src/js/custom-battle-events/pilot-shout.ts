import { MessageWindow } from "../game-dom/message-window";
import { FaceType } from "../game-dom/message-window/face-graphic/config/face-type";
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
 * innerHTMLで指定するパイロットの叫び
 * @param messageWindow メッセージウィンドウ
 * @param face 顔グラフィック
 * @param innerHTML メッセージ要素配下のinnerHTML
 */
function pilotShoutInInnerHTML(
  messageWindow: MessageWindow,
  face: FaceType,
  innerHTML: string,
): void {
  messageWindow.visible(true);
  messageWindow.lighten();
  messageWindow.face(face);
  messageWindow.faceVisible(true);
  messageWindow.messagesInInnerHTML(innerHTML);
  messageWindow.nextMessageIconVisible(false);
}

/**
 * プレイヤーパイロットの叫び
 * @param props カスタムイベントプロパティ
 * @param face 顔グラフィック
 * @param message メッセージ
 */
export function playerPilotShout(
  props: Readonly<CustomBattleEventProps>,
  face: FaceType,
  message: string,
): void {
  pilotShout(props.view.dom.playerShoutMessageWindow, face, message);
}

/**
 * innerHTMLで指定するプレイヤーパイロットの叫び
 * @param props カスタムイベントプロパティ
 * @param face 顔グラフィック
 * @param innerHTML メッセージ要素配下のinnerHTML
 */
export function playerPilotShoutInInnerHTML(
  props: Readonly<CustomBattleEventProps>,
  face: FaceType,
  innerHTML: string,
): void {
  pilotShoutInInnerHTML(props.view.dom.playerShoutMessageWindow, face, innerHTML);
}

/**
 * プレイヤーパイロットの叫びだけを表示する
 * @param props カスタムイベントプロパティ
 * @param face 顔グラフィック
 * @param message メッセージ
 */
export function playerPilotOnlyShout(
  props: Readonly<CustomBattleEventProps>,
  face: FaceType,
  message: string,
): void {
  playerPilotShout(props, face, message);
  props.view.dom.enemyShoutMessageWindow.visible(false);
}

/**
 * 敵パイロットの叫び
 * @param props カスタムイベントプロパティ
 * @param face 顔グラフィック
 * @param message メッセージ
 */
export function enemyPilotShout(
  props: Readonly<CustomBattleEventProps>,
  face: FaceType,
  message: string,
): void {
  pilotShout(props.view.dom.enemyShoutMessageWindow, face, message);
}

/**
 * innerHTMLで指定する敵パイロットの叫び
 * @param props カスタムイベントプロパティ
 * @param face 顔グラフィック
 * @param innerHTML メッセージ要素配下のinnerHTML
 */
export function enemyPilotShoutInInnerHTML(
  props: Readonly<CustomBattleEventProps>,
  face: FaceType,
  innerHTML: string,
): void {
  pilotShoutInInnerHTML(props.view.dom.enemyShoutMessageWindow, face, innerHTML);
}

/**
 * 敵パイロットの叫びだけを表示する
 * @param props カスタムイベントプロパティ
 * @param face 顔グラフィック
 * @param message メッセージ
 */
export function enemyPilotOnlyShout(
  props: Readonly<CustomBattleEventProps>,
  face: FaceType,
  message: string,
): void {
  enemyPilotShout(props, face, message);
  props.view.dom.playerShoutMessageWindow.visible(false);
}
