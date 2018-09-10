// @flow

import type {DamageIndicatorView} from "./damage-indicator-view";
import type {Resources} from "../../../resource";
import {CanvasMesh} from "../../../mesh/canvas-mesh";
import type {DamageIndicatorModel} from "../model/damage-indicator-model";
import * as THREE from 'three';
import {CANVAS_IMAGE_IDS} from "../../../resource/canvas-image";
import type {CanvasImageResource} from "../../../resource/canvas-image";
import {drawNumberCenter} from "../../../canvas/number/number";

export const CANVAS_SIZE = 2048;
export const MESH_SIZE = 2048;
export const SCALE = 0.4;

/** プレイヤーのダメージインジケータビュー */
export class PlayerDamageIndicatorView implements DamageIndicatorView {
  _resources: Resources;

  _canvasMesh: CanvasMesh;

  constructor(resources: Resources) {
    this._resources = resources;
    this._canvasMesh = new CanvasMesh({
      canvasWidth: CANVAS_SIZE,
      canvasHeight: CANVAS_SIZE,
      meshWidth: MESH_SIZE,
      meshHeight: MESH_SIZE,
    });
  }

  /** モデルをビューに反映させる */
  engage(model: DamageIndicatorModel): void {
    this._refreshCanvas(model);
    this._refreshPos();
    this._refreshScale();
  }

  /** シーンに追加するオブジェクトを取得する */
  getObject3D(): THREE.Object3D {
    return this._canvasMesh.mesh;
  }

  /** キャンバスを更新する */
  _refreshCanvas(model: DamageIndicatorModel): void {
    this._canvasMesh.draw(context => {
      const numberResource: ?CanvasImageResource = this._resources.canvasImages.find(v => v.id === CANVAS_IMAGE_IDS.DAMAGE_NUMBER);
      const numberImage: Image = numberResource ? numberResource.image : new Image();

      const x = context.canvas.width / 2;
      const y = context.canvas.height / 2;

      context.save();

      context.globalAlpha = model.opacity;
      drawNumberCenter(context, numberImage, x, y, model.damage);

      context.restore();
    });
  }

  _refreshPos(): void {
    this._canvasMesh.mesh.position.y = 48;
    this._canvasMesh.mesh.position.x = 128;
  }

  /** 拡大率を更新する */
  _refreshScale(): void {
    this._canvasMesh.mesh.scale.set(SCALE, SCALE, SCALE);
  }
}