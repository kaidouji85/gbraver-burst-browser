// @flow

import type {Resources} from '../../resource/index'

/**
 * キャンバスに画像数字を描画する
 * ローカル座標原点は数字の左上となる
 *
 * @param context 描画対象のキャンバスコンテキスト
 * @param image 数字画像
 * @param dx 描画X
 * @param dy 描画Y
 * @param value 描画する数字の値
 */
export function drawNumberLeft(context: CanvasRenderingContext2D, image: Image, dx: number, dy: number, value: number): void {
  const basicWidth = image.width / 10;

  createNumberArray(value).forEach((num, index) => {
    const x = dx + basicWidth * index;
    drawSingleNumber(context, image, x, dy, num);
  });
}

/**
 * キャンバスに画像数字を描画する
 * ローカル座標原点は数字の右上となる
 *
 * @param context 描画対象のキャンバスコンテキスト
 * @param image 数字画像
 * @param dx 描画X
 * @param dy 描画Y
 * @param value 描画する数字の値
 */
export function drawNumberRight(context: CanvasRenderingContext2D, image: Image, dx: number, dy: number, value: number): void {
  const basicWidth = image.width / 10;

  const numberArray = createNumberArray(value);
  const numberDigit = numberArray.length;

  const x = dx - basicWidth * numberDigit;
  drawNumberLeft(context, image, x, dy, value);
}

/**
 * 数字を数字配列に変換する
 *
 * 例)
 * createNumberArray(1234)
 * -> [1, 2, 3, 4]
 *
 * @aram value 変換元
 * @return 変換結果
 */
function createNumberArray(value: number): number[] {
  return String(value)
    .split('')
    .map(v => Number(v));
}

/**
 * 1桁の数字を描画する
 * ローカル座標原点は左上である。
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
  const dw = basicWidth;
  const dh = image.height;

  context.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh);
}

