import { MessageWindow } from "../game-dom/message-window";
import { FaceType } from "../game-dom/message-window/face-graphic/config/face-type";
import { CustomBattleEventProps } from "../td-scenes/battle/custom-battle-event";

/**
 * メッセージウインドウをアクティブ表示する
 * アクティブ表示とは以下の状態のことである
 *   - メッセージウインドウを表示する
 *   - 顔画像は非表示
 *   - 標準の明るさ
 * @param messageWindow 設定対象のメッセージウインドウ
 */
function activeMessageWindow(messageWindow: MessageWindow): void {
  messageWindow.visible(true);
  messageWindow.faceVisible(false);
  messageWindow.lighten();
}

/**
 * メッセージウインドウを顔画像ありアクティブ表示する
 * 顔画像ありアクティブ表示とは、以下の状態のことである
 *   - メッセージウインドウを表示する
 *   - 顔画像を表示する
 *   - 標準の明るさ
 * @param messageWindow 設定対象のメッセージウインドウ
 * @param faceType 顔画像タイプ
 */
function activeMessageWindowWithFace(
  messageWindow: MessageWindow,
  faceType: FaceType,
): void {
  messageWindow.visible(true);
  messageWindow.face(faceType);
  messageWindow.faceVisible(true);
  messageWindow.lighten();
}

/**
 * 左メッセージウインドウをアクティブ表示する
 * @param props イベントプロパティ
 */
export function activeLeftMessageWindow(props: CustomBattleEventProps): void {
  activeMessageWindow(props.view.dom.leftMessageWindow);
}

/**
 * 右メッセージウインドウをアクティブ表示する
 * @param props イベントプロパティ
 */
export function activeRightMessageWindow(props: CustomBattleEventProps): void {
  activeMessageWindow(props.view.dom.rightMessageWindow);
}

/**
 * バッテリーセレクタ隣メッセージウインドウをアクティブ表示する
 * @param props イベントプロパティ
 * @param innerHTML メッセージのinnerHTML
 */
export function activeNearBatterySelectorMessageWindow(
  props: CustomBattleEventProps,
  innerHTML: string,
): void {
  activeMessageWindow(props.view.dom.nearBatterySelectorMessageWindow);
  props.view.dom.nearBatterySelectorMessageWindow.messagesInInnerHTML(
    innerHTML,
  );
}

/**
 * バーストボタン隣メッセージウインドウをアクティブ表示する
 * @param props イベントプロパティ
 */
export function activeNearBurstButtonMessageWindow(
  props: CustomBattleEventProps,
): void {
  activeMessageWindow(props.view.dom.nearBurstButtonMessageWindow);
}

/**
 * パイロットボタン隣メッセージウインドウをアクティブ表示する
 * @param props イベントプロパティ
 */
export function activeNearPilotButtonMessageWindow(
  props: CustomBattleEventProps,
): void {
  activeMessageWindow(props.view.dom.nearPilotButtonMessageWindow);
}

/**
 * 敵バトルシミュレーターボタン隣メッセージウインドウをアクティブ表示する
 * @param props イベントプロパティ
 */
export function activeNearPlayerBattleSimulatorButtonMessageWindow(
  props: CustomBattleEventProps,
): void {
  activeMessageWindow(
    props.view.dom.nearPlayerBattleSimulatorButtonMessageWindow,
  );
}

/**
 * 左メッセージウインドウを顔画像ありアクティブ表示する
 * @param props イベントプロパティ
 * @param faceType 顔画像タイプ
 */
export function activeLeftMessageWindowWithFace(
  props: CustomBattleEventProps,
  faceType: FaceType,
): void {
  activeMessageWindowWithFace(props.view.dom.leftMessageWindow, faceType);
}

/**
 * 右メッセージウインドウを顔画像ありアクティブ表示する
 * @param props イベントプロパティ
 * @param faceType 顔画像タイプ
 */
export function activeRightMessageWindowWithFace(
  props: CustomBattleEventProps,
  faceType: FaceType,
): void {
  activeMessageWindowWithFace(props.view.dom.rightMessageWindow, faceType);
}
