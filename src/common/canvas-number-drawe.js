// @flow

import type {Resources} from './resource-manager';
import {CANVAS_PICTURE_PATH} from './resource-manager';

/**
 * 1桁の数字を描画する
 * ローカル座標原点は右下である
 *
 * @param context 描画対象のキャンバスコンテキスト
 * @param image 数字画像
 * @param dx 描画位置X
 * @param dy 描画位置Y
 * @param value 描画する数字、0から9の範囲で指定する
 */
function drawSingleNumber(context: CanvasRenderingContext2D, image: Image, dx: number, dy: number, value: number) {
  const validValue = (() => {
    if (value < 0) {
      return 0;
    }
    if (value > 9) {
      return 9;
    }
    return value;
  })();
  const basicWidth = image.width / 10;

  const sx = validValue * basicWidth;
  const sy = 0;
  const sw = basicWidth;
  const sh = image.height;
  const x = dx - basicWidth;
  const y = dy - image.height;
  const dw = basicWidth;
  const dh = image.height;

  context.drawImage(image, sx, sy, sw, sh, x, y, dw, dh);
}

/**
 * キャンバスに画像数字を描画する
 * ローカル座標原点は数字の右下となる
 *
 * @param context 描画対象のキャンバスコンテキスト
 * @param resources リソース管理オブジェクト
 * @param imagePath 数字画像のパス
 * @param dx 描画X
 * @param dy 描画Y
 * @param value 描画する数字の値
 *
 * @author y.takeuchi
 */
export function drawNumber(context: CanvasRenderingContext2D, resources: Resources, imagePath: string, dx: number, dy: number, value: number): void {
  const image = resources.canvasImages.find(v => v.path === imagePath) || {};
  const basicWidth = image.image.width / 10;

  // 配列の順番を1の位 -> 10の位 -> ... としたいので、reverseで配列を反転している
  const numberArray = String(value).split('')
    .map(v => Number(v))
    .reverse();

  numberArray.forEach((num, index) => {
    const x = dx - basicWidth * index;
    drawSingleNumber(context, image.image, x, dy, num);
  });
}