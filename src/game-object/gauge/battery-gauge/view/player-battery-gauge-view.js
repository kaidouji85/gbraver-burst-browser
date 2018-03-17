// @flow

import {CanvasMesh} from "../../../../mesh/canvas-mesh";
import {BatteryGaugeView} from './battery-gauge-view';
import type {BatteryGaugeModel} from "../model/battery-gauge-model";
import type {Resources} from "../../../../resource/index";
import * as THREE from "three";
import {rectangle} from "../../../../uv-mapping/rectangle";
import {drawPlayerBatteryGauge} from "../../../../canvas/draw/battery-gauge";

export const MESH_WIDTH = 300;
export const MESH_HEIGHT = 80;
export const PADDING_TOP = 96;

/** プレイヤーバッテリーゲージ */
export class PlayerBatteryGaugeView extends CanvasMesh implements BatteryGaugeView {
  /** デバイスに応じたバッテリーゲージの倍率 */
  _scale: number;

  constructor(resources: Resources, scale: number) {
    super({
      resources,
      meshWidth: MESH_WIDTH,
      meshHeight: MESH_HEIGHT,
      canvasWidth: 256,
      canvasHeight: 256,
    });
    this._scale = scale;

    // バッテリーゲージに必要な大きさだけテクスチャから抜き取る
    rectangle({
      geo: this.mesh.geometry,
      pos: new THREE.Vector2(0, 0),
      width: 1,
      height: MESH_HEIGHT / MESH_WIDTH
    });
  }

  /** ビューにモデルを反映させる */
  gameLoop(model: BatteryGaugeModel): void {
    this.mesh.scale.set(this._scale, this._scale, this._scale);
    this._refreshGauge(model);
    this._refreshPos();
  }

  /** ゲージを更新する */
  _refreshGauge(model: BatteryGaugeModel): void {
    this.draw((context: CanvasRenderingContext2D) => {
      context.clearRect(0, 0, this.canvas.width, this.canvas.height);

      // UVマッピングの原点は左下なので、HPゲージがテクスチャの一番下に描画されるようにする
      drawPlayerBatteryGauge(context, this.resources, context.canvas.width/2, context.canvas.height - 32, model.battery, model.maxBattery);
    });
  }

  /** 表示位置を更新する */
  _refreshPos(): void {
    this.mesh.position.x = (window.innerWidth - MESH_WIDTH * this._scale) / 2;
    this.mesh.position.y = window.innerHeight / 2 - PADDING_TOP * this._scale;
  }
}