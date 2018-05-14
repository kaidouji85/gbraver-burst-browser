// @flow

import * as THREE from "three";
import type {Resources} from "../../../resource/index";
import type {ButtonModel} from "../button/model/button-model";
import {isMeshOverlap} from "../../../screen-touch/raycaster/overlap";
import {ButtonView} from "../button/button-view";
import {CanvasMesh} from "../../../mesh/canvas-mesh";
import {CANVAS_IMAGE_IDS} from "../../../resource/canvas-image";
import type {CanvasImageResource} from "../../../resource/canvas-image";
import {drawImageInCenter} from "../../../canvas/draw/image-drawer";

export const BUTTON_SIZE = 100;
export const CANVAS_SIZE = 1024;
export const PADDING_BOTTOM = 64;

/** コウゲキボタンのビュー */
export class AttackButtonView implements ButtonView {
  /** ボタンを描画するメッシュ */
  _canvasMesh: CanvasMesh;
  /** デバイスに応じたスケール */
  _deviceScale: number;
  /** リソース管理クラス */
  _resources: Resources;

  constructor(resources: Resources, deviceScale: number) {
    this._canvasMesh = new CanvasMesh({
      canvasWidth: CANVAS_SIZE,
      canvasHeight: CANVAS_SIZE,
      meshWidth: BUTTON_SIZE,
      meshHeight: BUTTON_SIZE,
    });
    this._deviceScale = deviceScale;
    this._resources = resources;
  }
  /** モデルをビューに反映させる */
  gameLoop(model: ButtonModel) {
    const scale = (1 + 0.1 * model.depth) * this._deviceScale;
    this._canvasMesh.mesh.scale.set(scale, scale, scale);
    this._canvasMesh.mesh.position.y = -window.innerHeight / 2 + PADDING_BOTTOM * this._deviceScale;

    const attackButtonResource: ?CanvasImageResource = this._resources.canvasImages.find(v => v.id === CANVAS_IMAGE_IDS.ATTACK_BUTTON);
    const attackButtonImage: Image = attackButtonResource ? attackButtonResource.image : new Image();
    this._canvasMesh.draw(context => {
      context.clearRect(0, 0, this._canvasMesh.canvas.width, this._canvasMesh.canvas.height);
      drawImageInCenter(context, attackButtonImage, this._canvasMesh.canvas.width / 2, this._canvasMesh.canvas.height / 2);
    });
  }

  /** シーンに追加するthree.jsオブジェクトを取得する */
  getThreeJsObjectList(): THREE.Mesh[] {
    return [
      ...this._canvasMesh.getThreeJsObjectList()
    ];
  }

  /** マウス、指とボタンが重なっているかを判定する */
  isOverlap(raycaster: THREE.Raycaster): boolean {
    return isMeshOverlap(raycaster, this._canvasMesh.mesh);
  }
}
