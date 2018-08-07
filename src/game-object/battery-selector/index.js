// @flow

import {BatterySlider} from "../battery-slider";
import type {Resources} from "../../resource";
import type {MouseRaycaster} from "../../overlap/check/mouse/mouse-raycaster";
import type {TouchRaycastContainer} from "../../overlap/check/touch/touch-raycaster";
import * as THREE from "three";
import {Group} from "./group";
import {BatterySelectorWindow} from "../window/battery-selector-window";

/** コンストラクタのパラメータ */
type Param = {
  resources: Resources,
  isVisible: boolean,
  onBatteryChange: (battery: number) => void,
};

/** バッテリーセレクタ */
export class BatterySelector {
  /** バッテリースライダー */
  _batterySlider: BatterySlider;
  /** ウインドウ */
  _window: BatterySelectorWindow;
  /** バッテリースライダーで使うthree.jsオブジェクトをまとめたもの */
  _group: Group;

  constructor(param: Param) {
    this._batterySlider = new BatterySlider({
      resources: param.resources,
      isVisible: true,
      onBatteryChange: param.onBatteryChange,
    });

    this._window = new BatterySelectorWindow({
      resources: param.resources
    });

    this._group = new Group({
      slider: this._batterySlider.getObject3D(),
      window: this._window.getObject3D()
    });
  }

  /** ゲームループの処理 */
  gameLoop(time: DOMHighResTimeStamp): void {
    this._batterySlider.gameLoop(time);
    this._group.refreshPosition();
  }

  /** マウスダウンした際の処理 */
  onMouseDown(mouse: MouseRaycaster): void {
    this._batterySlider.onMouseDown(mouse);
  }

  /** マウスムーブした際の処理 */
  onMouseMove(mouse: MouseRaycaster, isLeftButtonPushed: boolean): void {
    this._batterySlider.onMouseMove(mouse, isLeftButtonPushed);
  }

  /** タッチスタートした際の処理 */
  onTouchStart(touch: TouchRaycastContainer): void {
    this._batterySlider.onTouchStart(touch);
  }

  /** タッチムーブした際の処理 */
  onTouchMove(touch: TouchRaycastContainer): void {
    this._batterySlider.onTouchMove(touch);
  }

  /** シーンに追加するthree.jsオブジェクトを返す */
  getObject3D(): THREE.Object3D {
    return this._group.getObject3D();
  }
}