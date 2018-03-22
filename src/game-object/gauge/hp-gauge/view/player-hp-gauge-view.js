// @flow

import * as THREE from 'three';
import {CanvasMesh} from "../../../../mesh/canvas-mesh";
import type {Resources} from "../../../../resource/index";
import {HpGaugeView} from './hp-gauge-view';
import type {HpGaugeModel} from "../model/hp-gauge-model";
import {drawPlayerHpGauge} from "../../../../canvas/draw/hp-gauge";
import {rectangle} from "../../../../uv-mapping/rectangle";

/** メッシュ幅 */
export const GAUGE_WIDTH = 300;
/** ゲージ高 */
export const GAUGE_HEIGHT = 80;
/** 上パディング */
export const PADDING_TOP = 40;

/** プレイヤーHPゲージ */
export class PlayerHpGaugeView extends CanvasMesh implements HpGaugeView {
  /** デバイスに応じたHPゲージの倍率 */
  _scale: number;

  constructor(resources: Resources, scale: number) {
    super({
      resources,
      meshWidth: GAUGE_WIDTH,
      meshHeight: GAUGE_HEIGHT,
      canvasWidth: 256,
      canvasHeight: 256,
    });
    this._scale = scale;

    // HPゲージに必要な大きさだけテクスチャから抜き取る
    rectangle({
      geo: this.mesh.geometry,
      pos: new THREE.Vector2(0, 0),
      width: 1,
      height: GAUGE_HEIGHT / GAUGE_WIDTH
    });
  }

  /** ビューにモデルを反映させる */
  gameLoop(model: HpGaugeModel): void {
    this.mesh.scale.set(this._scale, this._scale, this._scale);
    this._refreshGauge(model);
    this._refreshPos();
  }

  /** ゲージを更新する */
  _refreshGauge(model: HpGaugeModel): void {
    this.draw((context: CanvasRenderingContext2D) => {
      context.clearRect(0, 0, this.canvas.width, this.canvas.height);

      // UVマッピングの原点は左下なので、HPゲージがテクスチャの一番下に描画されるようにする
      drawPlayerHpGauge(context, this.resources, context.canvas.width/2, context.canvas.height - 32, model.hp, model.maxHp);
    });
  }

  /** 表示位置を更新する */
  _refreshPos(): void {
    this.mesh.position.x = (window.innerWidth - GAUGE_WIDTH * this._scale) / 2;
    this.mesh.position.y = window.innerHeight / 2 - PADDING_TOP * this._scale;
  }
}