// @flow

import {CanvasMesh} from "../canvas-mesh";
import type {Resources} from "../../../resource/resource-manager";
import {PlayerHpGauge as drawPlayerHpGauge} from "../../../util/canvas/draw/hp-gauge";

/** プレイヤーHPゲージ */
export class PlayerHpGauge extends CanvasMesh {
  maxHp: number;
  hp: number;

  constructor(resources: Resources) {
    super({
      resources,
      meshWidth: 300,
      meshHeight: 300,
      canvasWidth: 256,
      canvasHeight: 256,
    });

    this.maxHp = 0;
    this.hp = 0;
  }

  refresh(hp: number, maxHp: number) {
    const context = this.canvas.getContext('2d');
    context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    drawPlayerHpGauge(context, this.resources, context.canvas.width/2, 32, hp, maxHp);

    this.hp = hp;
    this.maxHp = maxHp;
  }
}