// @flow

import type {BurstGaugeView} from "./burst-gauge-view";
import type {Resources} from "../../../../resource";
import type {BurstGaugeModel} from "../model/burst-gauge-model";
import {CanvasMesh} from "../../../../mesh/canvas-mesh";
import {drawBurstGauge} from "../../../../canvas/burst-gauge";
import * as THREE from "three";

/** メッシュの大きさ */
export const MESH_SIZE = 128;
/** パディングトップ */
export const PADDING_TOP = 136;
/** パディングレフト */
export const PADDING_LEFT = 96;

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

  /** モデルをビューに反映させる */
  gameLoop(model: BurstGaugeModel): void {
    const scale = 1;
    this._canvasMesh.mesh.scale.set(scale, scale, scale);
    this._refreshGauge(model);
    this._refreshPos();
  }

  /** ゲージ内容を更新する */
  _refreshGauge(model: BurstGaugeModel): void {
    this._canvasMesh.draw(context => {
      context.clearRect(0, 0, this._canvasMesh.canvas.width, this._canvasMesh.canvas.height);
      drawBurstGauge(context, this._resources, model.isActive, context.canvas.width / 2, context.canvas.height / 2);
    });
  }

  /** ゲージ位置を調整する */
  _refreshPos(): void {
    this._canvasMesh.mesh.position.x = window.innerWidth / 2 - PADDING_LEFT;
    this._canvasMesh.mesh.position.y = window.innerHeight / 2 - PADDING_TOP;
  }

  getThreeJsObjectList(): THREE.Mesh[] {
    return this._canvasMesh.getThreeJsObjectList();
  }
}