import jsQR from "jsqr";

import { isMobile } from "../../../../device-ditect/is-mobile";
import { extractRoomIDFromPrivateMatchQRCodeText } from "../../../../qr-code/private-match-qr-code";
import { PrivateMatchQRCodeReaderProps } from "../props";
import { drawQRCodeBorder } from "./draw-qr-code-border";

const QR_SCAN_INTERVAL_MS = isMobile() ? 1000 / 10 : 1000 / 15;
const lastScanTimestamp = new WeakMap<PrivateMatchQRCodeReaderProps, number>();

/**
 * ゲームループ内での処理を行う
 * @param props プロパティ
 */
export function onGameLoop(props: PrivateMatchQRCodeReaderProps) {
  const { cameraCanvas, canvas, video } = props;
  if (video.readyState !== video.HAVE_ENOUGH_DATA) {
    return;
  }

  if (
    cameraCanvas.width !== video.videoWidth ||
    cameraCanvas.height !== video.videoHeight
  ) {
    cameraCanvas.height = video.videoHeight;
    cameraCanvas.width = video.videoWidth;
  }

  canvas.drawImage(video, 0, 0, cameraCanvas.width, cameraCanvas.height);

  const now = performance.now();
  const previousScanTimestamp = lastScanTimestamp.get(props) ?? 0;
  if (now - previousScanTimestamp < QR_SCAN_INTERVAL_MS) {
    return;
  }
  lastScanTimestamp.set(props, now);

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

  drawQRCodeBorder(canvas, code);
  const roomID = extractRoomIDFromPrivateMatchQRCodeText(code.data);
  if (roomID === null) {
    return;
  }

  props.notificationOfReadQRCode.next(roomID);
}
