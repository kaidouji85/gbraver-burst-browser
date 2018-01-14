// @flow
import type {Resources} from '../../../../resource/resource-manager';
import {CANVAS_PICTURE_PATH} from '../../../../resource/loader/depricated-canvas-image-loader';
import {depuricated_drawImage, drawImage} from '../image-drawer';
import {trapezoid} from '../../clip/trapezoid';
import type {CanvasImageResource} from "../../../../resource/canvas-image";
import {CANVAS_IMAGE_IDS} from "../../../../resource/canvas-image";

/** キャンバスを台形にクリッピングする */
const clip = (context: CanvasRenderingContext2D, resources: Resources, dx: number, dy: number, percent: number) => {
  const image = resources.depuricated_canvasImages.find(v => v.path === CANVAS_PICTURE_PATH.HP_BAR_UP) || {};
  trapezoid(context, image.image.width, image.image.height, dx, dy, percent);
};

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
  const hpBarDownResource: ?CanvasImageResource = resources.canvasImages.find(v => v.id === CANVAS_IMAGE_IDS.HP_BAR_DOWN);
  const hpBar: Image = hpBarDownResource ? hpBarDownResource.image : new Image();

  drawImage(context, hpBar, dx, dy);

  context.save();

  clip(context, resources, dx, dy, percent);
  depuricated_drawImage(context, resources, CANVAS_PICTURE_PATH.HP_BAR_UP, dx, dy);

  context.restore();
}