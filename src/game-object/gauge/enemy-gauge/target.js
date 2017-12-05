// @flow

import {CANVAS_HEIGHT, CANVAS_WIDTH, PlayerGauge} from "../player-gauge/target";
import type {Resources} from "../../../resource/resource-manager";
import {EnemyBatteryGauge} from "../../../util/canvas/draw/battery-gauge";
import {EnemyHpGauge} from "../../../util/canvas/draw/hp-gauge";

export class EnemyGauge extends PlayerGauge {
  constructor(resources: Resources) {
    super(resources);
  }

  /** ゲージを更新する */
  refresh(props: {hp: number, maxHp: number, battery: number, maxBattery: number}) {
    const context = this.canvas.getContext('2d');
    context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    EnemyHpGauge(context, this.resources, context.canvas.width/2, 32, props.hp, props.maxHp);
    EnemyBatteryGauge(context, this.resources, context.canvas.width/2, 80, props.battery);
  }
}