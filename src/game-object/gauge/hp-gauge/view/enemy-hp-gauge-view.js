// @flow

import type {Resources} from "../../../../resource/index";
import type {HpGaugeModel} from "../model/hp-gauge-model";
import {drawEnemyHpGauge} from "../../../../canvas/hp-gauge";
import {MESH_SIZE, PADDING_TOP, PlayerHpGaugeView} from "./player-hp-gauge-view";

/** 敵HPゲージ */
export class EnemyHpGaugeView extends PlayerHpGaugeView {
  constructor(resources: Resources, scale: number) {
    super(resources, scale);
  }

  /** ゲージを更新する */
  _refreshGauge(model: HpGaugeModel): void {
    this._canvasMesh.draw((context: CanvasRenderingContext2D) => {
      context.clearRect(0, 0, this._canvasMesh.canvas.width, this._canvasMesh.canvas.height);
      drawEnemyHpGauge(context, this._resources, context.canvas.width / 2, context.canvas.height / 2, model.hp, model.maxHp);
    });
  }

  /** 表示位置を更新する */
  _refreshPos(): void {
    this._canvasMesh.mesh.position.x = (-window.innerWidth + MESH_SIZE * this._scale) / 2;
    this._canvasMesh.mesh.position.y = window.innerHeight / 2  - PADDING_TOP * this._scale;
  }
}