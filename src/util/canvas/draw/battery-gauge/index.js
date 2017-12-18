// @flow
import type {Resources} from '../../../../resource/resource-manager';
import {CANVAS_PICTURE_PATH} from '../../../../resource/resource-manager';
import {drawImage} from '../image-drawer';
import {drawNumberLeft, drawNumberRight} from '../number';
import {BatteryBar} from './bar';

/**
 * プレイヤーのバッテリーゲージを描画する
 * ローカル座標の原点は中心
 *
 * @param context Canvasコンテキスト
 * @param resources リソース管理オブジェクト
 * @param dx 描画X
 * @param dy 描画Y
 * @param value バッテリーの値
 * @param maxValue バッテリー最大値
 */
export function drawPlayerBatteryGauge(context: CanvasRenderingContext2D, resources: Resources, dx: number, dy: number, value: number, maxValue: number): void {
  drawImage(context, resources, CANVAS_PICTURE_PATH.GAUGE_BASE, dx, dy);
  BatteryBar(context, resources, dx - 8, dy + 8, Math.floor(value), Math.floor(maxValue));

  drawImage(context, resources, CANVAS_PICTURE_PATH.BATTERY_GAUGE_LABEL , dx + 72, dy - 6);
  drawNumberLeft(context, resources, CANVAS_PICTURE_PATH.BATTERY_NUMBER, dx - 100, dy - 24 , Math.floor(value));
}

/**
 * 敵のバッテリーゲージを描画する
 * ローカル座標の原点は中心
 *
 * @param context Canvasコンテキスト
 * @param resources リソース管理オブジェクト
 * @param dx 描画X
 * @param dy 描画Y
 * @param value バッテリーの値
 * @param maxValue バッテリー最大値
 */
export function drawEnemyBatteryGauge(context: CanvasRenderingContext2D, resources: Resources, dx: number, dy: number, value: number, maxValue: number): void {
  context.save();
  context.setTransform(-1, 0, 0, 1, 0, 0);

  drawImage(context, resources, CANVAS_PICTURE_PATH.GAUGE_BASE, - dx, dy);
  BatteryBar(context, resources, - dx - 8, dy + 8, Math.floor(value), Math.floor(maxValue));

  context.restore();

  drawImage(context, resources, CANVAS_PICTURE_PATH.BATTERY_GAUGE_LABEL , dx - 64, dy - 6);
  drawNumberRight(context, resources, CANVAS_PICTURE_PATH.BATTERY_NUMBER, dx + 100, dy - 24 , Math.floor(value));
}