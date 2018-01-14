// @flow
import type {Resources} from '../../../../resource/resource-manager';
import {CANVAS_PICTURE_PATH} from '../../../../resource/loader/depricated-canvas-image-loader';
import {depuricated_drawImage, drawImage} from '../image-drawer';
import {depuricated_drawNumberLeft, depuricated_drawNumberRight} from '../number';
import {BatteryBar} from './bar';
import {CANVAS_IMAGE_IDS} from "../../../../resource/canvas-image";
import type {CanvasImageManager} from "../../../../resource/canvas-image";

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
  const gaugeBaseManager: ?CanvasImageManager = resources.canvasImages.find(v => v.id === CANVAS_IMAGE_IDS.GAUGE_BASE);
  const gaugeBase: Image = gaugeBaseManager ? gaugeBaseManager.image : new Image();

  drawImage(context, gaugeBase, dx, dy);
  BatteryBar(context, resources, dx - 8, dy + 8, Math.floor(value), Math.floor(maxValue));

  depuricated_drawImage(context, resources, CANVAS_PICTURE_PATH.BATTERY_GAUGE_LABEL , dx + 72, dy - 6);
  depuricated_drawNumberLeft(context, resources, CANVAS_PICTURE_PATH.BATTERY_NUMBER, dx - 100, dy - 24 , Math.floor(value));
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
  const gaugeBaseManager: ?CanvasImageManager = resources.canvasImages.find(v => v.id === CANVAS_IMAGE_IDS.GAUGE_BASE);
  const gaugeBase: Image = gaugeBaseManager ? gaugeBaseManager.image : new Image();

  context.save();
  context.setTransform(-1, 0, 0, 1, 0, 0);

  drawImage(context, gaugeBase, -dx, dy);
  BatteryBar(context, resources, - dx - 8, dy + 8, Math.floor(value), Math.floor(maxValue));

  context.restore();

  depuricated_drawImage(context, resources, CANVAS_PICTURE_PATH.BATTERY_GAUGE_LABEL , dx - 64, dy - 6);
  depuricated_drawNumberRight(context, resources, CANVAS_PICTURE_PATH.BATTERY_NUMBER, dx + 100, dy - 24 , Math.floor(value));
}