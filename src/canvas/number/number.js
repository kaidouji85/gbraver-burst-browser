// @flow

/**
 * 数字を数字配列に変換するヘルパー関数
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
 * 数字、符号の横基本サイズを取得する
 *
 * @param image 数字画像
 * @return 横基本サイズ
 */
function getBasicWidth(image: Image): number {
  return image.width / 12;
}

/**
 * 符号なし数字の横幅を取得する
 *
 * @param image 数字画像
 * @param value 数字
 * @return 横幅
 */
function getNumberWidth(image: Image, value: number): number {
  const basicWidth = getBasicWidth(image);
  const numberDigit = createNumberArray(value).length;
  return numberDigit * basicWidth;
}

/**
 * 符号あり数字の横幅を取得する
 *
 * @param image 数字画像
 * @param value 数字
 * @return 横幅
 */
function getSignedNumberWidth(image: Image, value: number): number {
  const basicWidth = getBasicWidth(image);
  return getNumberWidth(image, value) + basicWidth;
}

/**
 * 1桁の数字を描画する
 * なお、ローカル座標原点は左上である
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
  const basicWidth = getBasicWidth(image);

  const sx = validValue * basicWidth;
  const sy = 0;
  const sw = basicWidth;
  const sh = image.height;
  const dw = basicWidth;
  const dh = image.height;

  context.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh);
}

/**
 * +符号を描画する
 * なお、ローカル座標原点は左上である
 *
 * @param context 描画対象のキャンバスコンテキスト
 * @param image 数字画像
 * @param dx 描画位置X
 * @param dy 描画位置Y
 */
function drawPlusSign(context: CanvasRenderingContext2D, image: Image, dx: number, dy: number): void {
  const basicWidth = getBasicWidth(image);

  const sx = 10 * basicWidth;
  const sy = 0;
  const sw = basicWidth;
  const sh = image.height;
  const dw = basicWidth;
  const dh = image.height;

  context.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh);
}

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
  const basicWidth = getBasicWidth(image);

  createNumberArray(value).forEach((num, index) => {
    const x = dx + basicWidth * index;
    drawSingleNumber(context, image, x, dy, num);
  });
}

/**
 * キャンバスにプラス符号付きの画像数字を描画する
 * ローカル座標原点は数字の左上となる
 *
 * @param context 描画対象のキャンバスコンテキスト
 * @param image 数字画像
 * @param dx 描画X
 * @param dy 描画Y
 * @param value 描画する数字の値
 */
export function drawPlusNumberLeft(context: CanvasRenderingContext2D, image: Image, dx: number, dy: number, value: number): void {
  const basicWidth = getBasicWidth(image);

  drawPlusSign(context, image, dx, dy);
  drawNumberLeft(context, image, dx + basicWidth, dy, value);
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
  const x = dx - getNumberWidth(image, value);
  drawNumberLeft(context, image, x, dy, value);
}

/**
 * キャンバスにプラス符号付きの画像数字を描画する
 * ローカル座標原点は数字の右上となる
 *
 * @param context 描画対象のキャンバスコンテキスト
 * @param image 数字画像
 * @param dx 描画X
 * @param dy 描画Y
 * @param value 描画する数字の値
 */
export function drawPlusNumberRight(context: CanvasRenderingContext2D, image: Image, dx: number, dy: number, value: number): void {
  const x = dx - getSignedNumberWidth(image, value);
  drawPlusNumberLeft(context, image, x, dy, value);
}

/**
 * キャンバスに画像数字を描画する
 * ローカル座標原点は数字の中央となる
 *
 * @param context 描画対象のキャンバスコンテキスト
 * @param image 数字画像
 * @param dx 描画X
 * @param dy 描画Y
 * @param value 描画する数字の値
 */
export function drawNumberCenter(context: CanvasRenderingContext2D, image: Image, dx: number, dy: number, value: number): void {
  const x = dx - getNumberWidth(image, value) / 2;
  const y = dy - image.height / 2;
  drawNumberLeft(context, image, x, y, value);
}

/**
 * キャンバスにプラス符号付きの画像数字を描画する
 * ローカル座標原点は数字の中央となる
 *
 * @param context 描画対象のキャンバスコンテキスト
 * @param image 数字画像
 * @param dx 描画X
 * @param dy 描画Y
 * @param value 描画する数字の値
 */
export function drawPlusNumberCenter(context: CanvasRenderingContext2D, image: Image, dx: number, dy: number, value: number): void {
  const x = dx - getSignedNumberWidth(image, value) / 2;
  const y = dy - image.height / 2;
  drawPlusNumberLeft(context, image, x, y, value);
}