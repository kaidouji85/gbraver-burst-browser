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
 * @param code QRコード
 */
export function borderingOnQrCode(
  canvas: CanvasRenderingContext2D,
  code: QRCode,
) {
  drawLine(canvas, code.location.topLeftCorner, code.location.topRightCorner);
  drawLine(
    canvas,
    code.location.topRightCorner,
    code.location.bottomRightCorner,
  );
  drawLine(
    canvas,
    code.location.bottomRightCorner,
    code.location.bottomLeftCorner,
  );
  drawLine(canvas, code.location.bottomLeftCorner, code.location.topLeftCorner);
}
