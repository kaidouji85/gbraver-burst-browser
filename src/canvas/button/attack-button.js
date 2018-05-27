// @flow

import type {Resources} from "../../resource";
import {drawImageInCenter} from "../draw/image-drawer";
import type {CanvasImageResource} from "../../resource/canvas-image";
import {CANVAS_IMAGE_IDS} from "../../resource/canvas-image";

const SHADOW_PADDING_BOTTOM = 80;

/**
 * コウゲキボタンを描画する
 *
 * @param context キャンバスコンテクスト
 * @param resources リソース管理クラス
 * @param depth ボタン押込み深さ
 * @param dx 描画位置X
 * @param dy 描画位置Y
 */
export function drawAttackButton(context: CanvasRenderingContext2D, resources: Resources, depth: number, dx: number, dy: number): void {
  const buttonScale = (1 + 0.1 * depth);
  const shadowScale = (1 + 0.15 * depth);
  const attackButtonResource: ?CanvasImageResource = resources.canvasImages.find(v => v.id === CANVAS_IMAGE_IDS.ATTACK_BUTTON);
  const attackButtonImage: Image = attackButtonResource ? attackButtonResource.image : new Image();
  const buttonShadowResource: ?CanvasImageResource = resources.canvasImages.find(v => v.id === CANVAS_IMAGE_IDS.BUTTON_SHADOW);
  const buttonShadowImage: Image = buttonShadowResource ? buttonShadowResource.image : new Image();

  drawImageInCenter(context, buttonShadowImage, dx, dy + SHADOW_PADDING_BOTTOM, shadowScale);
  drawImageInCenter(context, attackButtonImage, dx, dy, buttonScale);
}