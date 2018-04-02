// @flow

import type {BatterySliderModel} from "./model/battery-slider-model";
import {BatterySliderView} from "./view/battery-slider-view";
import type {Resources} from "../../../resource";
import * as THREE from "three";
import {change} from './model/change';
import {Group, Tween} from "@tweenjs/tween.js";

/** バッテリースライダー */
export class BatterySlider {
  /** バッテリースライダーのモデル */
  _model: BatterySliderModel;
  /** バッテリースライダーのビュー */
  _view: BatterySliderView;
  /** 本オブジェクトに関するTweenのグループ */
  _tweenGroup: Group;

  constructor(resources: Resources) {
    this._model = {
      battery: 3,
      maxBattery: 5
    };
    this._view = new BatterySliderView({
      resources,
      maxValue: this._model.maxBattery,
      onValueChange: (value: number) => {
        this.change(value).start();
      }
    });
    this._tweenGroup = new Group();
  }

  /** ゲームループの処理 */
  gameLoop(time: DOMHighResTimeStamp): void {
    this._tweenGroup.update(time);
    this._view.gameLoop(this._model);
  }

  /**
   * バッテリー値を変更する
   *
   * @param toBattery 変更する値
   * @return バッテリー変更アニメTween
   */
  change(toBattery: number): Tween {
    return change(this._model, this._tweenGroup, toBattery);
  }

  /** 本クラスのTweenを全て削除する */
  removeAllTween(): void {
    this._tweenGroup.removeAll();
  }

  /** マウスダウンした際の処理 */
  onMouseDown(raycaster: THREE.Raycater): void {
    this._view.onMouseDown(raycaster);
  }

  /** マウスムーブした際の処理 */
  onMouseMove(raycaster: THREE.Raycater): void {
    this._view.onMouseMove(raycaster);
  }

  /** マウスアップした際の処理 */
  onMouseUp(raycaster: THREE.Raycater): void {
    this._view.onMouseUp(raycaster);
  }

  /** マウスリーブした際の処理 */
  onMouseLeave(raycaster: THREE.Raycater): void {
    this._view.onMouseLeave(raycaster);
  }

  /** シーンに追加するthree.jsオブジェクトを返す */
  getThreeJsObjectList(): THREE.Mesh[] {
    return this._view.getThreeJsObjectList();
  }
}