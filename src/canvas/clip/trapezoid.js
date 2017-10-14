// @flow

/**
 * キャンバスを台形にクリッピングする関数
 * 本関数はHPゲージ、バッテリーゲージでのみ使用されることを想定している
 *
 * @param context 描画対象キャンバス
 * @param width 画像幅
 * @param height 画像高
 * @param dx 描画位置X
 * @param dy 描画位置Y
 * @param percent ゲージの値をパーセント(0から1形式の)で指定
 */
export function trapezoid(context: CanvasRenderingContext2D, width: number, height: number, dx: number, dy: number, percent: number) {
  const gaugeWidth = width * percent;

  context.beginPath();

  context.moveTo(dx - width / 2, dy - height / 2);
  context.lineTo(dx - width / 2 + gaugeWidth + 10, dy - height / 2);
  context.lineTo(dx - width / 2 + gaugeWidth, dy + height / 2);
  context.lineTo(dx - width / 2, dy + height / 2);

  context.closePath();
  context.clip();
}