// @flow
import type {Resources} from '../../common/resource-manager';
import {CANVAS_PICTURE_PATH} from '../../common/resource-manager';

/** 画像幅 */
export const PICT_WIDTH = 240;
/** 画像高 */
export const PICT_HEIGHT = 33;

/**
 * HPゲージを描画する
 * ローカル座標の原点は左上
 *
 * @param context Canvasコンテキスト
 * @param resources リソース管理オブジェクト
 * @param dx 描画X
 * @param dy 描画Y
 */
export function draw(context: CanvasRenderingContext2D, resources: Resources, dx: number, dy: number): void {
  const image = resources.canvasImages.find(v => v.path === CANVAS_PICTURE_PATH.PLAYER_HP_GAUGE_BASE) || {};
  context.drawImage(image.image, dx, dy);
}

/**
 * HPゲージを描画する
 * ローカル座標の原点は中心
 *
 * @param context Canvasコンテキスト
 * @param resources リソース管理オブジェクト
 * @param dx 描画X
 * @param dy 描画Y
 */
export function drawWithCenter(context: CanvasRenderingContext2D, resources: Resources, dx: number, dy: number) {
  draw(context, resources, dx - PICT_WIDTH/2, dy - PICT_HEIGHT/2);
}