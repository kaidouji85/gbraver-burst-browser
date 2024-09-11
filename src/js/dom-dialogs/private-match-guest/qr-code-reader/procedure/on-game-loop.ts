import jsQR from "jsqr";

import { extractRoomIDFromPrivateMatchQRCodeText } from "../../../../qr-code/private-match-qr-code";
import { PrivateMatchQRCodeReaderProps } from "../props";
import { borderingOnQrCode } from "./bordering-on-qr-code";

/**
 * ゲームループ内での処理を行う
 * @param props プロパティ
 */
export function onGameLoop(props: PrivateMatchQRCodeReaderProps) {
  const { cameraCanvas, canvas, video } = props;
  if (video.readyState !== video.HAVE_ENOUGH_DATA) {
    return;
  }

  cameraCanvas.height = video.videoHeight;
  cameraCanvas.width = video.videoWidth;
  canvas.drawImage(video, 0, 0, cameraCanvas.width, cameraCanvas.height);
  const imageData = canvas.getImageData(
    0,
    0,
    cameraCanvas.width,
    cameraCanvas.height,
  );
  const code = jsQR(imageData.data, imageData.width, imageData.height, {
    inversionAttempts: "dontInvert",
  });
  if (!code) {
    return;
  }

  borderingOnQrCode(canvas, code);
  const roomID = extractRoomIDFromPrivateMatchQRCodeText(code.data);
  if (roomID === null) {
    return;
  }

  props.notificationOfReadQRCode.next(roomID);
}
