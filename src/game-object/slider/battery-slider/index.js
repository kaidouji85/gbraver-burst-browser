// @flow

import type {BatterySliderModel} from "./model/battery-slider-model";
import {BatterySliderView} from "./view/battery-slider-view";
import type {Resources} from "../../../resource";
import * as THREE from "three";
import {change} from './model/change';
import {Group, Tween} from "@tweenjs/tween.js";
import type {TouchRaycastContainer} from "../../../screen-touch/touch/touch-raycaster";
import type {MouseRaycaster} from "../../../screen-touch/mouse/mouse-raycaster";
import type {UIState} from "./ui-state";

/** バッテリースライダー */
export class BatterySlider {
  /** バッテリースライダーのモデル */
  _model: BatterySliderModel;
  /** UIの状態変数をまとめたもの */
  _uiState: UIState;
  /** バッテリースライダーのビュー */
  _view: BatterySliderView;
  /** 本オブジェクトに関するTweenのグループ */
  _tweenGroup: Group;

  constructor(resources: Resources) {
    const initialBattery = 3;
    this._model = {
      battery: initialBattery,
      maxBattery: 5
    };
    this._view = new BatterySliderView({
      resources,
      maxValue: this._model.maxBattery
    });
    this._tweenGroup = new Group();
    this._uiState = {
      isActive: false,
      selectBattery: initialBattery
    };
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
  onMouseDown(mouse: MouseRaycaster): void {
    const value: ?number = this._view.getMouseOverlap(mouse);
    if (value !== null && value !== undefined && value > 0) {
      this._uiState.isActive = true;
      this._uiState.selectBattery = value;
      this.removeAllTween();
      this.change(value).start();
    }
  }

  /** マウスムーブした際の処理 */
  onMouseMove(mouse: MouseRaycaster): void {
    const value: ?number = this._view.getMouseOverlap(mouse);
    if (this._uiState.isActive && value !== null && value !== undefined && value !== this._uiState.selectBattery) {
      this._uiState.selectBattery = value;
      this.removeAllTween();
      this.change(value).start();
    }
  }

  /** マウスアップした際の処理 */
  onMouseUp(mouse: MouseRaycaster): void {
    this._uiState.isActive = false;
  }

  /** マウスリーブした際の処理 */
  onMouseLeave(mouse: MouseRaycaster): void {
    this._uiState.isActive = false;
  }

  /** タッチムーブした際の処理 */
  onTouchMove(touch: TouchRaycastContainer): void {
    // TODO 非アクティブの時は何もしないようにする
    const value: ?number = this._view.getTouchOverlap(touch);
    if (value !== null && value !== undefined && this._uiState.selectBattery !== value) {
      this._uiState.selectBattery = value;
      this.removeAllTween();
      this.change(value).start();
    }
  }

  /** シーンに追加するthree.jsオブジェクトを返す */
  getThreeJsObjectList(): THREE.Mesh[] {
    return this._view.getThreeJsObjectList();
  }

  _onSliderTouch(value: number): void {
    if (this._model.battery === value) {
      return;
    }

    this._model.battery = value;
    this.removeAllTween();
    this.change(value).start();
  }
}