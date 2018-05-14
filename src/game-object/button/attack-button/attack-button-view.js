// @flow

import * as THREE from "three";
import type {Resources} from "../../../resource/index";
import type {ButtonModel} from "../button/model/button-model";
import {isMeshOverlap} from "../../../screen-touch/raycaster/overlap";
import {ButtonView} from "../button/button-view";
import {CanvasMesh} from "../../../mesh/canvas-mesh";
import {drawAttackButton} from "../../../canvas/attack-button";

export const BUTTON_SIZE = 200;
export const CANVAS_SIZE = 2048;
export const PADDING_BOTTOM = 64;

// TODO 当たり判定用のメッシュを追加する
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
    this._canvasMesh.mesh.scale.set(this._deviceScale, this._deviceScale, this._deviceScale);
    this._canvasMesh.mesh.position.x = 0;
    this._canvasMesh.mesh.position.y = -window.innerHeight / 2 + PADDING_BOTTOM * this._deviceScale;

    this._canvasMesh.draw(context => {
      context.clearRect(0, 0, this._canvasMesh.canvas.width, this._canvasMesh.canvas.height);
      //context.fillRect(0, 0, this._canvasMesh.canvas.width, this._canvasMesh.canvas.height);
      drawAttackButton(context, this._resources, model.depth, this._canvasMesh.canvas.width / 2, this._canvasMesh.canvas.height / 2);
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
