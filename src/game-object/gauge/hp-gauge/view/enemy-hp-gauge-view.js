// @flow

import type {Resources} from "../../../../resource/index";
import type {HpGaugeModel} from "../model/hp-gauge-model";
import {drawEnemyHpGauge} from "../../../../canvas/draw/hp-gauge";
import {PADDING_TOP, PlayerHpGaugeView} from "./player-hp-gauge-view";
import {MESH_WIDTH} from "../../../armdozer/shin-breaver/view/player-shin-braver-view";

/** 敵HPゲージ */
export class EnemyHpGaugeView extends PlayerHpGaugeView {
  constructor(resources: Resources, scale: number) {
    super(resources, scale);
  }

  /** ゲージを更新する */
  _refreshGauge(model: HpGaugeModel): void {
    this.draw((context: CanvasRenderingContext2D) => {
      context.clearRect(0, 0, this.canvas.width, this.canvas.height);

      // UVマッピングの原点は左下なので、HPゲージがテクスチャの一番下に描画されるようにする
      drawEnemyHpGauge(context, this.resources, context.canvas.width/2, context.canvas.height - 32, model.hp, model.maxHp);
    });
  }

  /** 表示位置を更新する */
  _refreshPos(): void {
    this.mesh.position.x = (-window.innerWidth + MESH_WIDTH * this._scale) / 2;
    this.mesh.position.y = window.innerHeight / 2  - PADDING_TOP * this._scale;
  }
}