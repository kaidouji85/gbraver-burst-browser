// @flow

import {CanvasMesh} from "../../../../mesh/canvas-mesh";
import {BatteryGaugeView} from './battery-gauge-view';
import type {BatteryGaugeModel} from "../model/battery-gauge-model";
import type {Resources} from "../../../../resource/index";
import * as THREE from "three";
import {drawPlayerBatteryGauge} from "../../../../canvas/battery-gauge";

/** メッシュの大きさ */
export const MESH_SIZE = 256;
/** 上パディング */
export const PADDING_TOP = 96;

/** プレイヤーバッテリーゲージ */
export class PlayerBatteryGaugeView implements BatteryGaugeView {
  /** デバイスに応じたバッテリーゲージの倍率 */
  _scale: number;
  /** バッテリーゲージを描画するキャンバス */
  _canvasMesh: CanvasMesh;
  /** ゲームループで使うために、リソース管理オブジェクトをキャッシュする */
  _resources: Resources;

  constructor(resources: Resources, scale: number) {
    this._canvasMesh = new CanvasMesh({
      meshWidth: MESH_SIZE,
      meshHeight: MESH_SIZE,
      canvasWidth: MESH_SIZE,
      canvasHeight: MESH_SIZE,
    });
    this._scale = scale;
    this._resources = resources;
  }

  /** ビューにモデルを反映させる */
  gameLoop(model: BatteryGaugeModel): void {
    this._canvasMesh.mesh.scale.set(this._scale, this._scale, this._scale);
    this._refreshGauge(model);
    this._refreshPos();
  }

  /** ゲージを更新する */
  _refreshGauge(model: BatteryGaugeModel): void {
    this._canvasMesh.draw((context: CanvasRenderingContext2D) => {
      context.clearRect(0, 0, this._canvasMesh.canvas.width, this._canvasMesh.canvas.height);
      drawPlayerBatteryGauge(context, this._resources, context.canvas.width / 2, context.canvas.height / 2, model.battery, model.maxBattery);
    });
  }

  /** 表示位置を更新する */
  _refreshPos(): void {
    this._canvasMesh.mesh.position.x = (window.innerWidth - MESH_SIZE * this._scale) / 2;
    this._canvasMesh.mesh.position.y = window.innerHeight / 2 - PADDING_TOP * this._scale;
  }

  /** シーンに追加するthree.jsのオブジェクトを返す */
  getThreeJsObjectList(): THREE.Mesh[] {
    return this._canvasMesh.getThreeJsObjectList();
  }
}