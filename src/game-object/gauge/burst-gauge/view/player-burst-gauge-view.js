// @flow

import type {BurstGaugeView} from "./burst-gauge-view";
import type {Resources} from "../../../../resource";
import type {BurstGaugeModel} from "../model/burst-gauge-model";
import {CanvasMesh} from "../../../../mesh/canvas-mesh";
import {drawBurstGauge} from "../../../../canvas/burst-gauge";
import * as THREE from "three";

/** メッシュの大きさ */
const MESH_SIZE = 256;

/** プレイヤーのバーストゲージ */
export class PlayerBurstGaugeView implements BurstGaugeView {
  /** バッテリーゲージを描画するキャンバス */
  _canvasMesh: CanvasMesh;
  /** ゲームループで使うために、リソース管理オブジェクトをキャッシュする */
  _resources: Resources;

  constructor(resources: Resources) {
    this._resources = resources;
    this._canvasMesh = new CanvasMesh({
      meshWidth: MESH_SIZE,
      meshHeight: MESH_SIZE,
      canvasWidth: MESH_SIZE,
      canvasHeight: MESH_SIZE,
    });
  }

  gameLoop(model: BurstGaugeModel): void {
    // TODO 描画位置を調整する
    this._canvasMesh.draw(context => {
      context.clearRect(0, 0, this._canvasMesh.canvas.width, this._canvasMesh.canvas.height);
      drawBurstGauge(context, this._resources, model.isActive, context.canvas.width / 2, context.canvas.height / 2);
    });
  }

  getThreeJsObjectList(): THREE.Mesh[] {
    return this._canvasMesh.getThreeJsObjectList();
  }
}