// @flow

import * as THREE from 'three';
import type {GaugeView} from "./gauge-view";
import type {GaugeModel} from "../model/gauge-model";
import {CanvasMesh} from "../../../mesh/canvas-mesh";
import {drawGauge} from "../../../canvas/gauge";
import type {Resources} from "../../../resource";
import * as R from 'ramda';

export const CANVAS_SIZE = 256;
export const MESH_SIZE = 150;

/** プレイヤーゲージのビュー */
export class PlayerGaugeView implements GaugeView {
  _canvasMesh: CanvasMesh;
  _resources: Resources;
  _lastModel: ?GaugeModel;

  constructor(resources: Resources) {
    this._resources = resources;
    this._canvasMesh = new CanvasMesh({
      canvasWidth: CANVAS_SIZE,
      canvasHeight: CANVAS_SIZE,
      meshWidth: MESH_SIZE,
      meshHeight: MESH_SIZE,
    });
    this._lastModel = null;
  }

  /** モデルをビューに反映させる */
  engage(model: GaugeModel): void {
    if (this._isModelChanged(model)) {
      this._refreshGauge(model);
    }
    this._setPos();
    this._updateLastModel(model);
  }

  /** モデルが変更されたか否かを判定する、trueで変更された */
  _isModelChanged(model: GaugeModel): boolean {
    return !R.equals(this._lastModel, model);
  }

  /** モデルの最終値を更新する */
  _updateLastModel(model: GaugeModel): void {
    this._lastModel = R.clone(model);
  }

  /** ゲージを更新する */
  _refreshGauge(model: GaugeModel): void {
    this._canvasMesh.draw(context => {
      context.clearRect(0, 0, context.canvas.height, context.canvas.height);
      context.save();

      drawGauge({
        context: context,
        resources: this._resources,
        dx: CANVAS_SIZE / 2,
        dy: CANVAS_SIZE / 2,
        hp: model.hp,
        maxHp: model.maxHp,
        battery: model.battery,
        maxBattery: model.maxBattery
      });

      context.restore();
    });
  }

  /** 座標を設定する */
  _setPos(): void {
    this._canvasMesh.mesh.position.x = 92;
    this._canvasMesh.mesh.position.y = + window.innerHeight / 2 - 48;
  }

  getObject3D(): THREE.Object3D {
    return this._canvasMesh.mesh;
  }
}