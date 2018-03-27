// @flow

import {CanvasMesh} from "../../../../mesh/canvas-mesh";
import {BatteryGaugeView} from './battery-gauge-view';
import type {BatteryGaugeModel} from "../model/battery-gauge-model";
import type {Resources} from "../../../../resource/index";
import * as THREE from "three";
import {rectangle} from "../../../../uv-mapping/rectangle";
import {drawPlayerBatteryGauge} from "../../../../canvas/battery-gauge";

export const MESH_WIDTH = 300;
export const MESH_HEIGHT = 80;

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
      resources,
      meshWidth: MESH_WIDTH,
      meshHeight: MESH_HEIGHT,
      canvasWidth: 256,
      canvasHeight: 256,
    });
    this._scale = scale;
    this._resources = resources;

    // バッテリーゲージに必要な大きさだけテクスチャから抜き取る
    rectangle({
      geo: this._canvasMesh.mesh.geometry,
      pos: new THREE.Vector2(0, 0),
      width: 1,
      height: MESH_HEIGHT / MESH_WIDTH
    });
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

      // UVマッピングの原点は左下なので、HPゲージがテクスチャの一番下に描画されるようにする
      drawPlayerBatteryGauge(context, this._resources, context.canvas.width/2, context.canvas.height - 32, model.battery, model.maxBattery);
    });
  }

  /** 表示位置を更新する */
  _refreshPos(): void {
    this._canvasMesh.mesh.position.x = (window.innerWidth - MESH_WIDTH * this._scale) / 2;
    this._canvasMesh.mesh.position.y = window.innerHeight / 2 - PADDING_TOP * this._scale;
  }

  /** シーンに追加するthree.jsのオブジェクトを返す */
  getThreeJsObjectList(): THREE.Mesh[] {
    return this._canvasMesh.getThreeJsObjectList();
  }
}