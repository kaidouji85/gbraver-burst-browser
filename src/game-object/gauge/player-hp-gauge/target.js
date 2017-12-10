// @flow

import {CanvasMesh} from "../../../util/mesh/canvas-mesh";
import type {Resources} from "../../../resource/resource-manager";
import {PlayerHpGauge as drawPlayerHpGauge} from "../../../util/canvas/draw/hp-gauge";

/** プレイヤーHPゲージ */
export class PlayerHpGauge extends CanvasMesh {
  /** 最後にレンダリングした最大HPの値 */
  maxHp: number;
  /** 最後にレンダリングしたHPの値 */
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

  /**
   * ゲージを更新する
   * 更新する必要がない場合は何もしない
   *
   * @param hp 現在のHP
   * @param maxHp 最大HP
   */
  refreshGauge(hp: number, maxHp: number) {
    if (this.hp === hp && this.maxHp === maxHp) {
      return;
    }
    this.hp = hp;
    this.maxHp = maxHp;

    this.draw((context: CanvasRenderingContext2D) => {
      context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      drawPlayerHpGauge(context, this.resources, context.canvas.width/2, 32, hp, maxHp);
    });
  }

  /** 表示位置を更新する */
  refreshPos() {
    this.mesh.position.x = (window.innerWidth - this.meshWidth) / 2;
    this.mesh.position.y = (window.innerHeight - this.meshHeight) / 2;
  }
}