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
export const PADDING_TOP = 160;
/** パディングレフト */
export const PADDING_LEFT = 64;

/** プレイヤーのバーストゲージ */
export class PlayerBurstGaugeView implements BurstGaugeView {
  /** バッテリーゲージを描画するキャンバス */
  _canvasMesh: CanvasMesh;
  /** ゲームループで使うために、リソース管理オブジェクトをキャッシュする */
  _resources: Resources;
  /** デバイスに応じた倍率 */
  _scale: number;

  constructor(resources: Resources, scale: number) {
    this._resources = resources;
    this._canvasMesh = new CanvasMesh({
      meshWidth: MESH_SIZE,
      meshHeight: MESH_SIZE,
      canvasWidth: MESH_SIZE,
      canvasHeight: MESH_SIZE,
    });
    this._scale = scale;
  }

  /** モデルをビューに反映させる */
  gameLoop(model: BurstGaugeModel): void {
    this._canvasMesh.mesh.scale.set(this._scale, this._scale, this._scale);
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
    this._canvasMesh.mesh.position.x = window.innerWidth / 2 - PADDING_LEFT * this._scale;
    this._canvasMesh.mesh.position.y = window.innerHeight / 2 - PADDING_TOP * this._scale;
  }

  getThreeJsObjectList(): THREE.Mesh[] {
    return this._canvasMesh.getThreeJsObjectList();
  }
}