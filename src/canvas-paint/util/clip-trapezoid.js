// @flow

/**
 * キャンバスを台形にクリッピングする関数
 * 本関数はHPゲージ、バッテリーゲージでのみ使用されることを想定している
 *
 * @param context 描画対象キャンバス
 * @param image バーの画像
 * @param dx 描画位置X
 * @param dy 描画位置Y
 * @param percent ゲージの値をパーセント(0から1形式の)で指定
 */
export function clipTraoezoid(context: CanvasRenderingContext2D, image: Image, dx: number, dy: number, percent: number) {
  const gaugeWidth = image.width * percent;

  context.beginPath();

  context.moveTo(dx - image.width / 2, dy - image.height / 2);
  context.lineTo(dx - image.width / 2 + gaugeWidth + 10, dy - image.height / 2);
  context.lineTo(dx - image.width / 2 + gaugeWidth, dy + image.height / 2);
  context.lineTo(dx - image.width / 2, dy + image.height / 2);
  context.lineTo(dx - image.width / 2, dy - image.height / 2);

  context.closePath();
  context.clip();
}