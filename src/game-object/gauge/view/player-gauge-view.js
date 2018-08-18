// @flow

import * as THREE from 'three';
import type {GaugeView} from "./gauge-view";
import type {GaugeModel} from "../model/gauge-model";
import {CanvasMesh} from "../../../mesh/canvas-mesh";
import {drawGauge} from "../../../canvas/gauge";
import type {Resources} from "../../../resource";

export const CANVAS_SIZE = 1024;
export const MESH_SIZE = 1024;
export const SCALE = 0.4;

export class PlayerGaugeView implements GaugeView {
  _canvasMesh: CanvasMesh;
  _resources: Resources;

  constructor(resources: Resources) {
    this._resources = resources;
    this._canvasMesh = new CanvasMesh({
      canvasWidth: CANVAS_SIZE,
      canvasHeight: CANVAS_SIZE,
      meshWidth: MESH_SIZE,
      meshHeight: MESH_SIZE,
    });
  }

  engage(model: GaugeModel): void {
    this._refreshGauge(model);
    this._setScale();
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
        hp: 2000,
        maxHp: 3000,
        battery: 4,
        maxBattery: 5
      });

      context.restore();
    });
  }

  /** 全体の拡大率を設定する */
  _setScale(): void {
    this._canvasMesh.mesh.scale.set(SCALE, SCALE, SCALE);
  }

  getObject3D(): THREE.Object3D {
    return this._canvasMesh.mesh;
  }
}