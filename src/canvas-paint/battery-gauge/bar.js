// @flow
import type {Resources} from '../../common/resource-manager';
import {CANVAS_PICTURE_PATH} from '../../common/resource-manager';
import {drawImage} from '../../common/canvas-image-drawer';
import {clipTraoezoid} from '../util/clip-trapezoid';

/** バッテリー最大値 */
const MAX_BATTERY = 5;

/** キャンバスを台形にクリッピングする */
const clip = (context: CanvasRenderingContext2D, resources: Resources, dx: number, dy: number, value: number) => {
  const image = resources.canvasImages.find(v => v.path === CANVAS_PICTURE_PATH.BATTERY_BAR_UP) || {};
  clipTraoezoid(context, image.image, dx, dy, value / MAX_BATTERY);
};

/**
 * バッテリーバーを描画する
 * ローカル座標の原点は中心
 *
 * @param context Canvasコンテキスト
 * @param resources リソース管理オブジェクト
 * @param dx 描画X
 * @param dy 描画Y
 * @param value 値を1から5で指定する
 */
export function BatteryBar(context: CanvasRenderingContext2D, resources: Resources, dx: number, dy: number, value: number) {
  drawImage(context, resources, CANVAS_PICTURE_PATH.BATTERY_BAR_DOWN, dx, dy);
  context.save();
  clip(context, resources, dx, dy, value);
  drawImage(context, resources, CANVAS_PICTURE_PATH.BATTERY_BAR_UP, dx, dy);
  context.restore();
}