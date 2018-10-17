// @flow

import type {DamageIndicatorView} from "./damage-indicator-view";
import type {Resources} from "../../../resource";
import {CanvasMesh} from "../../../mesh/canvas-mesh";
import type {DamageIndicatorModel} from "../model/damage-indicator-model";
import * as THREE from 'three';
import type {CanvasImageResource} from "../../../resource/canvas-image";
import {CANVAS_IMAGE_IDS} from "../../../resource/canvas-image";
import {drawNumberCenter} from "../../../canvas/number/number";
import * as R from 'ramda';

export const CANVAS_SIZE = 256;
export const MESH_SIZE = 240;

/** プレイヤーのダメージインジケータビュー */
export class PlayerDamageIndicatorView implements DamageIndicatorView {
  _resources: Resources;
  _canvasMesh: CanvasMesh;
  _lastEngagedModel: ?DamageIndicatorModel;

  constructor(resources: Resources) {
    this._resources = resources;
    this._canvasMesh = new CanvasMesh({
      canvasWidth: CANVAS_SIZE,
      canvasHeight: CANVAS_SIZE,
      meshWidth: MESH_SIZE,
      meshHeight: MESH_SIZE,
    });
    this._lastEngagedModel = null;
  }

  /** モデルをビューに反映させる */
  engage(model: DamageIndicatorModel): void {
    if (this._shouldCanvasRefresh(model)) {
      this._refreshCanvas(model);
    }
    this._refreshPos();
    this._refreshOpacity(model);
    this._updateLastEngagedModel(model);
  }

  /** シーンに追加するオブジェクトを取得する */
  getObject3D(): THREE.Object3D {
    return this._canvasMesh.mesh;
  }

  /** キャンバスを更新するか否かを判定する、trueで更新する */
  _shouldCanvasRefresh(model: DamageIndicatorModel): boolean {
    if (!this._lastEngagedModel) {
      return true;
    }

    return this._lastEngagedModel.damage !== model.damage;
  }

  /** キャンバスを更新する */
  _refreshCanvas(model: DamageIndicatorModel): void {
    this._canvasMesh.draw(context => {
      const numberResource: ?CanvasImageResource = this._resources.canvasImages.find(v => v.id === CANVAS_IMAGE_IDS.DAMAGE_NUMBER);
      const numberImage: Image = numberResource ? numberResource.image : new Image();

      const x = context.canvas.width / 2;
      const y = context.canvas.height / 2;

      context.clearRect(0, 0, context.canvas.width, context.canvas.height);
      drawNumberCenter(context, numberImage, x, y, model.damage);
    });
  }

  /** 座標を更新する */
  _refreshPos(): void {
    this._canvasMesh.mesh.position.y = 48;
    this._canvasMesh.mesh.position.x = 120;
  }

  /** 透明度を更新する */
  _refreshOpacity(model: DamageIndicatorModel): void {
    this._canvasMesh.setOpacity(model.opacity);
  }

  /** 最後にビューに反映されたモデルを、引数の内容で上書きする */
  _updateLastEngagedModel(model: DamageIndicatorModel): void {
    this._lastEngagedModel = R.clone(model);
  }
}