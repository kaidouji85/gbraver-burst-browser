// @flow
import type {Resources} from '../../common/resource-manager';
import {CANVAS_PICTURE_PATH} from '../../common/resource-manager';
import {drawImage} from '../../common/canvas-image-util';


/**
 * HPゲージを描画する
 * ローカル座標の原点は中心
 *
 * @param context Canvasコンテキスト
 * @param resources リソース管理オブジェクト
 * @param dx 描画X
 * @param dy 描画Y
 */
export const PlayerHpGaugeBase = (context: CanvasRenderingContext2D, resources: Resources, dx: number, dy: number) =>
  drawImage(context, CANVAS_PICTURE_PATH.PLAYER_HP_GAUGE_BASE, resources, dx, dy);
