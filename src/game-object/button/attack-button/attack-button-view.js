// @flow

import * as THREE from "three";
import type {Resources} from "../../../resource/index";
import type {ButtonModel} from "../button/model/button-model";
import {isMeshOverlap} from "../../../screen-touch/raycaster/overlap";
import {ButtonView} from "../button/button-view";
import {CanvasMesh} from "../../../mesh/canvas-mesh";
import {drawAttackButton} from "../../../canvas/button/attack-button";
import {createOverlapMesh} from "../overlap-mesh";

export const BUTTON_SIZE = 200;
export const OVERLAP_SIZE = 100;
export const CANVAS_SIZE = 2048;
export const PADDING_BOTTOM = 64;

/** コウゲキボタンのビュー */
export class AttackButtonView implements ButtonView {
  /** ボタンを描画するメッシュ */
  _canvasMesh: CanvasMesh;
  /** 当たり判定用メッシュ */
  _overlapMesh: THREE.Mesh;
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
    this._overlapMesh = createOverlapMesh(OVERLAP_SIZE, OVERLAP_SIZE);
  }
  /** モデルをビューに反映させる */
  gameLoop(model: ButtonModel) {
    const meshX = 0;
    const meshY = -window.innerHeight / 2 + PADDING_BOTTOM * this._deviceScale;
    this._canvasMesh.mesh.scale.set(this._deviceScale, this._deviceScale, this._deviceScale);
    this._canvasMesh.mesh.position.x = meshX;
    this._canvasMesh.mesh.position.y = meshY;
    this._overlapMesh.position.x = meshX;
    this._overlapMesh.position.y = meshY;
    this._canvasMesh.draw(context => {
      context.clearRect(0, 0, this._canvasMesh.canvas.width, this._canvasMesh.canvas.height);
      drawAttackButton(context, this._resources, model.depth, this._canvasMesh.canvas.width / 2, this._canvasMesh.canvas.height / 2);
    });
  }


  /** シーンに追加するthree.jsオブジェクトを取得する */
  getThreeJsObjectList(): THREE.Mesh[] {
    return [
      ...this._canvasMesh.getThreeJsObjectList(),
      this._overlapMesh
    ];
  }

  /** マウス、指とボタンが重なっているかを判定する */
  isOverlap(raycaster: THREE.Raycaster): boolean {
    return isMeshOverlap(raycaster, this._overlapMesh);
  }
}
