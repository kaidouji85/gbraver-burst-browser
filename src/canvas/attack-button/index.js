// @flow

import type {Resources} from "../../resource";
import {drawImageInCenter} from "../draw/image-drawer";
import type {CanvasImageResource} from "../../resource/canvas-image";
import {CANVAS_IMAGE_IDS} from "../../resource/canvas-image";

/**
 * コウゲキボタンを描画する
 *
 * @param context キャンバスコンテクスト
 * @param resources リソース管理クラス
 */
export function drawAttackButton(context: CanvasRenderingContext2D, resources: Resources, depth: number, dx: number, dy: number): void {
  const scale = (1 + 0.1 * depth);
  const attackButtonResource: ?CanvasImageResource = resources.canvasImages.find(v => v.id === CANVAS_IMAGE_IDS.ATTACK_BUTTON);
  const attackButtonImage: Image = attackButtonResource ? attackButtonResource.image : new Image();

  const buttonWidth = attackButtonImage.width * scale;
  const buttonHeight = attackButtonImage.height * scale;
  const buttonX = dx - buttonWidth / 2;
  const buttonY = dy - buttonHeight / 2;
  context.drawImage(attackButtonImage, buttonX, buttonY, buttonWidth, buttonHeight);
}