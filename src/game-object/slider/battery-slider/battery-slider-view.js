// @flow

import {CanvasMesh} from "../../../mesh/canvas-mesh";
import type {Resources} from "../../../resource";
import type {BatterySliderModel} from "./battery-slider-model";
import {drawBatterySlider} from "../../../canvas/battery-slider";

export const MESH_WIDTH = 512;
export const MESH_HEIGHT = 512;

/** バッテリースライダーのビュー */
export class BatterySliderView extends CanvasMesh {
  constructor(resources: Resources) {
    super({
      resources,
      meshWidth: MESH_WIDTH,
      meshHeight: MESH_HEIGHT,
      canvasWidth: 512,
      canvasHeight: 512,
    });
  }

  /** ビューにモデルを反映させる */
  gameLoop(model: BatterySliderModel): void {
    this._refreshGauge(model);
    this._refreshPos();
  }

  /** バッテリースライダーを更新する */
  _refreshGauge(model: BatterySliderModel): void {
    this.draw((context: CanvasRenderingContext2D) => {
      context.clearRect(0, 0, this.canvas.width, this.canvas.height);

      // TODO 開発が終わったら削除する
      /*
      context.save();
      context.fillStyle = 'red';
      context.fillRect(0, 0, this.canvas.width, this.canvas.height);
      context.restore();
      */

      // バッテリースライダーが中央に描画されるようにする
      const dx = this.canvas.width / 2;
      const dy = this.canvas.height / 2;
      drawBatterySlider(context, this.resources, model.battery, model.maxBattery, dx, dy);
    });
  }

  /** 表示位置を更新する */
  _refreshPos(): void {
    this.mesh.position.x = 0;
    this.mesh.position.y = 0;
  }
}