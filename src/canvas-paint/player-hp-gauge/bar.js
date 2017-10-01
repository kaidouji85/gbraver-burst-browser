// @flow
import type {Resources} from '../../common/resource-manager';
import {CANVAS_PICTURE_PATH} from '../../common/resource-manager';
import {drawImage} from '../../common/canvas-image-drawer';

/**
 * 台形にクリッピングする
 *
 * @param context Canvasコンテキスト
 * @param resources リソース管理オブジェクト
 * @param dx 描画X
 * @param dy 描画Y
 * @param percent バーが何%の状態かを0から1で指定する
 */
function clip(context: CanvasRenderingContext2D, resources: Resources, dx: number, dy: number, percent: number) {
  const image = resources.canvasImages.find(v => v.path === CANVAS_PICTURE_PATH.PLAYER_HP_BAR_UP) || {};
  const width = image.image.width;
  const height = image.image.height;

  context.beginPath();

  const x1 = dx - width / 2;
  const y1 = dy + height / 2;
  context.moveTo(x1, y1);

  const x2 = x1 + width * percent;
  const y2 = y1;
  context.lineTo(x2, y2);

  // 斜めにクリッピングしたいので、xを少しだけ右にずらす
  const x3 = x2 + 10;
  const y3 = y2 - height;
  context.lineTo(x3, y3);

  const x4 = x1;
  const y4 = y3;
  context.lineTo(x4, y4);

  context.lineTo(x1, y1);

  context.closePath();

  context.clip();
}

/**
 * HPバーを描画する
 * ローカル座標の原点は中心
 *
 * @param context Canvasコンテキスト
 * @param resources リソース管理オブジェクト
 * @param dx 描画X
 * @param dy 描画Y
 * @param percent バーが何%の状態かを0から1で指定する
 */
export function PlayerHpBar(context: CanvasRenderingContext2D, resources: Resources, dx: number, dy: number, percent: number) {
  const validPercent = (() => {
    if (percent > 1) {
      return 1;
    }

    if (percent < 0) {
      return 0;
    }

    return percent;
  })();

  drawImage(context, resources, CANVAS_PICTURE_PATH.PLAYER_HP_BAR_DOWN, dx, dy);
  context.save();
  clip(context, resources, dx, dy, validPercent);
  drawImage(context, resources, CANVAS_PICTURE_PATH.PLAYER_HP_BAR_UP, dx, dy);
  context.restore();
}