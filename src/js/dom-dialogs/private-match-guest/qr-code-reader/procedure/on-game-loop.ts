import jsQR from "jsqr";

import { extractRoomIDFromPrivateMatchQRCodeText } from "../../../../qr-code/private-match-qr-code";
import { PrivateMatchQRCodeReaderProps } from "../props";
import {borderingOnQrCode} from "./bordering-on-qr-code";

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

  borderingOnQrCode(canvas, code);
  const roomID = extractRoomIDFromPrivateMatchQRCodeText(code.data);
  if (roomID === null) {
    return;
  }

  props.notificationOfReadQRCode.next(roomID);
}
