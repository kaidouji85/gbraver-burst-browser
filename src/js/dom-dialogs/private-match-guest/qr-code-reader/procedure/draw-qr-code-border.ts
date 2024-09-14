import { QRCode } from "jsqr";
import { Point } from "jsqr/dist/locator";

/**
 * キャンバスに線を描画する
 * @param canvas 描画先のキャンバス
 * @param begin 始点
 * @param end 終点
 */
function drawLine(canvas: CanvasRenderingContext2D, begin: Point, end: Point) {
  canvas.beginPath();
  canvas.moveTo(begin.x, begin.y);
  canvas.lineTo(end.x, end.y);
  canvas.lineWidth = 4;
  canvas.strokeStyle = "#FF3B58";
  canvas.stroke();
}

/**
 * QRコードに枠を描画する
 * @param canvas 描画先のキャンバス
 * @param qrCode QRコード
 */
export function drawQRCodeBorder(
  canvas: CanvasRenderingContext2D,
  qrCode: QRCode,
) {
  drawLine(
    canvas,
    qrCode.location.topLeftCorner,
    qrCode.location.topRightCorner,
  );
  drawLine(
    canvas,
    qrCode.location.topRightCorner,
    qrCode.location.bottomRightCorner,
  );
  drawLine(
    canvas,
    qrCode.location.bottomRightCorner,
    qrCode.location.bottomLeftCorner,
  );
  drawLine(
    canvas,
    qrCode.location.bottomLeftCorner,
    qrCode.location.topLeftCorner,
  );
}
