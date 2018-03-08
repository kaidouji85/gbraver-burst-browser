// @flow

import type {BatteryGaugeModel} from "../model/battery-gauge-model";
import type {Resources} from "../../../../resource/index";
import {drawEnemyBatteryGauge} from "../../../../canvas/draw/battery-gauge";
import {MESH_WIDTH, PADDING_TOP, PlayerBatteryGaugeView} from "./player-battery-gauge-view";

/** 敵バッテリーゲージ */
export class EnemyBatteryGaugeView extends PlayerBatteryGaugeView {

  constructor(resources: Resources) {
    super(resources);
  }

  /** ゲージを更新する */
  _refreshGauge(model: BatteryGaugeModel): void {
    this.draw((context: CanvasRenderingContext2D) => {
      context.clearRect(0, 0, this.canvas.width, this.canvas.height);

      // UVマッピングの原点は左下なので、HPゲージがテクスチャの一番下に描画されるようにする
      drawEnemyBatteryGauge(context, this.resources, context.canvas.width/2, context.canvas.height - 32, model.battery, model.maxBattery);
    });
  }

  /** 表示位置を更新する */
  _refreshPos(): void {
    const scale = this._getScale();
    this.mesh.position.x = (-window.innerWidth + MESH_WIDTH * scale) / 2;
    this.mesh.position.y = window.innerHeight / 2 - PADDING_TOP * scale;
  }
}