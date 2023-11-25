import { process } from "../animation/process";
import { MessageWindow } from "../game-dom/message-window";
import { FaceType } from "../game-dom/message-window/face-graphic";

/**
 * パイロットの叫び
 * @param messageWindow メッセージウィンドウ
 * @param face 顔グラフィック
 * @param message メッセージ
 */
export function pilotCry(
  messageWindow: MessageWindow,
  face: FaceType,
  message: string,
) {
  return process(() => {
    messageWindow.visible(true);
    messageWindow.lighten();
    messageWindow.face(face);
    messageWindow.faceVisible(true);
    messageWindow.messages([message]);
    messageWindow.nextMessageIconVisible(false);
  });
}
