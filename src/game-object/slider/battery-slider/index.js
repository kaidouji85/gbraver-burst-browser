// @flow

import {Subject} from 'rxjs';
import type {BatterySliderModel} from "./model/battery-slider-model";
import {BatterySliderView} from "./view/battery-slider-view";
import type {Resources} from "../../../resource";
import * as THREE from "three";
import {change} from './model/change';
import {Group, Tween} from "@tweenjs/tween.js";
import type {TouchRaycastContainer} from "../../../screen-touch/touch/touch-raycaster";
import type {MouseRaycaster} from "../../../screen-touch/mouse/mouse-raycaster";
import {isLeftButtonPush} from "../../../mouse/left-button-down";

/** バッテリースライダー */
export class BatterySlider {
  /** バッテリースライダーのモデル */
  _model: BatterySliderModel;
  /** バッテリースライダーのビュー */
  _view: BatterySliderView;
  /** 本オブジェクトに関するTweenのグループ */
  _tweenGroup: Group;
  /** バッテリー値変更に関するサブジェクト */
  _changeBattery: Subject<number>;

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

    this._changeBattery = new Subject();
    this._changeBattery
      .distinctUntilChanged()
      .subscribe((battery: number) => {
        this.removeAllTween();
        this.change(battery).start();
      });
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
    if (value !== null && value !== undefined) {
      this._changeBattery.next(value);
    }
  }

  /** マウスムーブした際の処理 */
  onMouseMove(mouseRaycaster: MouseRaycaster, mouseEvent: MouseEvent): void {
    const value: ?number = this._view.getMouseOverlap(mouseRaycaster);
    if (value !== null && value !== undefined && isLeftButtonPush(mouseEvent)) {
      this._changeBattery.next(value);
    }
  }

  /** タッチスタートした際の処理 */
  onTouchStart(touch: TouchRaycastContainer): void {
    const value: ?number = this._view.getTouchOverlap(touch);
    if (value !== null && value !== undefined) {
      this._changeBattery.next(value);
    }
  }

  /** タッチムーブした際の処理 */
  onTouchMove(touch: TouchRaycastContainer): void {
    this.onTouchStart(touch);
  }

  /** シーンに追加するthree.jsオブジェクトを返す */
  getThreeJsObjectList(): THREE.Mesh[] {
    return this._view.getThreeJsObjectList();
  }
}