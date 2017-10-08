// @flow
import type {Resources} from '../../common/resource-manager';
import {CANVAS_PICTURE_PATH} from '../../common/resource-manager';
import {drawImage} from '../../common/canvas-image-drawer';
import {drawNumberLeft} from '../../common/canvas-number-drawe';
import {BatteryBar} from './bar';

/**
 * バッテリーゲージを描画する
 * ローカル座標の原点は中心
 *
 * @param context Canvasコンテキスト
 * @param resources リソース管理オブジェクト
 * @param dx 描画X
 * @param dy 描画Y
 * @param value バッテリーの値
 */
export function PlayerBatteryGauge(context: CanvasRenderingContext2D, resources: Resources, dx: number, dy: number, value: number) {
  drawImage(context, resources, CANVAS_PICTURE_PATH.GAUGE_BASE, dx, dy);
  drawImage(context, resources, CANVAS_PICTURE_PATH.BATTERY_GAUGE_LABEL , dx + 72, dy - 8);
  drawNumberLeft(context, resources, CANVAS_PICTURE_PATH.BATTERY_NUMBER, dx - 100, dy - 24 , value);
  BatteryBar(context, resources, dx - 8, dy + 8, value);
}