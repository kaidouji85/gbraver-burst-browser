import jsQR from "jsqr";

import { isMobile } from "../../../../device-ditect/is-mobile";
import { extractRoomIDFromPrivateMatchQRCodeText } from "../../../../qr-code/private-match-qr-code";
import { PrivateMatchQRCodeReaderProps } from "../props";
import { drawQRCodeBorder } from "./draw-qr-code-border";

/** モバイル端末でのQRコードのスキャン間隔（ミリ秒） */
const MOBILE_QR_SCAN_INTERVAL_MS = 1000 / 10;

/** デスクトップまたはタブレット端末でのQRコードのスキャン間隔（ミリ秒） */
const DESKTOP_OR_TABLET_QR_SCAN_INTERVAL_MS = 1000 / 15;

/** QRコードのスキャン間隔（ミリ秒） */
const QR_SCAN_INTERVAL_MS = isMobile()
  ? MOBILE_QR_SCAN_INTERVAL_MS
  : DESKTOP_OR_TABLET_QR_SCAN_INTERVAL_MS;

/**
 * ゲームループ内での処理を行う
 * @param props プロパティ
 */
export function onGameLoop(props: PrivateMatchQRCodeReaderProps) {
  const { cameraCanvas, canvas, video } = props;
  if (video.readyState !== video.HAVE_ENOUGH_DATA) {
    return;
  }

  const isCanvasSizeChanged =
    cameraCanvas.width !== video.videoWidth ||
    cameraCanvas.height !== video.videoHeight;
  if (isCanvasSizeChanged) {
    cameraCanvas.height = video.videoHeight;
    cameraCanvas.width = video.videoWidth;
  }
  canvas.drawImage(video, 0, 0, cameraCanvas.width, cameraCanvas.height);

  const now = performance.now();
  if (now - props.lastScanTimestamp < QR_SCAN_INTERVAL_MS) {
    return;
  }
  props.lastScanTimestamp = now;

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
