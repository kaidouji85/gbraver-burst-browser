// @flow

import type {BatteryGaugeModel} from "../model/battery-gauge-model";
import type {Resources} from "../../../../resource/index";
import {drawEnemyBatteryGauge} from "../../../../canvas/battery-gauge";
import {MESH_SIZE, PADDING_TOP, PlayerBatteryGaugeView} from "./player-battery-gauge-view";

/** 敵バッテリーゲージ */
export class EnemyBatteryGaugeView extends PlayerBatteryGaugeView {

  constructor(resources: Resources, scale: number) {
    super(resources, scale);
  }

  /** ゲージを更新する */
  _refreshGauge(model: BatteryGaugeModel): void {
    this._canvasMesh.draw((context: CanvasRenderingContext2D) => {
      context.clearRect(0, 0, this._canvasMesh.canvas.width, this._canvasMesh.canvas.height);
      drawEnemyBatteryGauge(context, this._resources, context.canvas.width / 2, context.canvas.height / 2, model.battery, model.maxBattery);
    });
  }

  /** 表示位置を更新する */
  _refreshPos(): void {
    this._canvasMesh.mesh.position.x = (-window.innerWidth + MESH_SIZE * this._scale) / 2;
    this._canvasMesh.mesh.position.y = window.innerHeight / 2 - PADDING_TOP * this._scale;
  }
}