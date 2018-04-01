// @flow

import type {BatterySliderModel} from "./battery-slider-model";
import {BatterySliderView} from "./view/battery-slider-view";
import type {Resources} from "../../../resource";
import * as THREE from "three";

/** バッテリースライダー */
export class BatterySlider {
  _model: BatterySliderModel;
  _view: BatterySliderView;

  constructor(resources: Resources) {
    this._model = {
      battery: 3,
      maxBattery: 5
    };
    this._view = new BatterySliderView(resources);
  }

  /** ゲームループの処理 */
  gameLoop(time: DOMHighResTimeStamp): void {
    this._view.gameLoop(this._model);
  }

  /** マウスダウンした際の処理 */
  onMouseDown(raycaster: THREE.Raycater): void {
    this._view.onMouseDown(raycaster);
  }

  /** シーンに追加するthree.jsオブジェクトを返す */
  getThreeJsObjectList(): THREE.Mesh[] {
    return this._view.getThreeJsObjectList();
  }
}