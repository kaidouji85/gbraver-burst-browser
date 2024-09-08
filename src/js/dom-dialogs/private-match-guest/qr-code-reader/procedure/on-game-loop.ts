import jsQR from "jsqr";

import { extractRoomIDFromPrivateMatchQRCodeText } from "../../../../qr-code/private-match-qr-code";
import { PrivateMatchQRCodeReaderProps } from "../props";

/** jsQRが使用するポイント */
type jsQRPoint = {
  /** X座標 */
  x: number,
  /** Y座標 */
  y: number,
};

/**
 * キャンバスに線を描画する
 * @param canvas キャンバス
 * @param begin 始点
 * @param end 終点
 */
function drawLine(canvas: CanvasRenderingContext2D, begin: jsQRPoint, end: jsQRPoint) {
  canvas.beginPath();
  canvas.moveTo(begin.x, begin.y);
  canvas.lineTo(end.x, end.y);
  canvas.lineWidth = 4;
  canvas.strokeStyle = "#FF3B58";
  canvas.stroke();
}

/**
 * ゲームループ内での処理を行う
 * @param props プロパティ
 */
export function onGameLoop(props: PrivateMatchQRCodeReaderProps) {
  const { root, canvas, video } = props;
  if (video.readyState !== video.HAVE_ENOUGH_DATA) {
    return;
  }

  root.height = video.videoHeight;
  root.width = video.videoWidth;
  canvas.drawImage(video, 0, 0, root.width, root.height);
  const imageData = canvas.getImageData(0, 0, root.width, root.height);
  const code = jsQR(imageData.data, imageData.width, imageData.height, {
    inversionAttempts: "dontInvert",
  });
  if (!code) {
    return;
  }

  drawLine(canvas, code.location.topLeftCorner, code.location.topRightCorner);
  drawLine(canvas, code.location.topRightCorner, code.location.bottomRightCorner);
  drawLine(canvas, code.location.bottomRightCorner, code.location.bottomLeftCorner);
  drawLine(canvas, code.location.bottomLeftCorner, code.location.topLeftCorner);
  const roomID = extractRoomIDFromPrivateMatchQRCodeText(code.data);
  if (roomID === null) {
    return;
  }

  props.notificationOfReadQRCode.next(roomID);
}
