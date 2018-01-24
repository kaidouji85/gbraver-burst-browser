// @flow

import {CanvasMesh} from "../../../../util/mesh/canvas-mesh";
import {BatteryGaugeView} from './battery-gauge-view';
import type {BatteryGaugeModel} from "../model/battery-gauge-model";
import type {Resources} from "../../../../resource/resource-manager";
import * as THREE from "three";
import {rectangle} from "../../../../util/uv-mapping/rectangle";
import {drawPlayerBatteryGauge} from "../../../../util/canvas/draw/battery-gauge";

/** プレイヤーバッテリーゲージ */
export class PlayerBatteryGaugeView extends CanvasMesh implements BatteryGaugeView {

  constructor(resources: Resources) {
    const meshWidth = 300;
    const meshHeight = 80;

    super({
      resources,
      meshWidth,
      meshHeight,
      canvasWidth: 256,
      canvasHeight: 256,
    });

    // バッテリーゲージに必要な大きさだけテクスチャから抜き取る
    rectangle({
      geo: this.mesh.geometry,
      pos: new THREE.Vector2(0, 0),
      width: 1,
      height: meshHeight / meshWidth
    });
  }

  /** ビューにモデルを反映させる */
  gameLoop(model: BatteryGaugeModel): void {
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
    this.mesh.position.x = (window.innerWidth - this.meshWidth) / 2;
    this.mesh.position.y = window.innerHeight / 2 - 96;
  }
}