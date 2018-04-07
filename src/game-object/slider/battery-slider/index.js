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

/** コンストラクタのパラメータ */
type Param = {
  resources: Resources,
  onBatteryChange: (battery: number) => void
};

/** バッテリースライダー */
export class BatterySlider {
  /** バッテリースライダーのモデル */
  _model: BatterySliderModel;
  /** バッテリースライダーのビュー */
  _view: BatterySliderView;
  /** 本オブジェクトに関するTweenのグループ */
  _tweenGroup: Group;
  /**
   * マウス、指と目盛りの重なり判定の結果を受け取り、
   * 条件が整い次第、目盛りの値を変更する
   */
  _overlap: Subject<number[]>;

  constructor(param: Param) {
    const initialBattery = 3;
    this._model = {
      battery: initialBattery,
      maxBattery: 5
    };
    this._view = new BatterySliderView({
      resources: param.resources,
      maxValue: this._model.maxBattery
    });
    this._tweenGroup = new Group();

    this._overlap = new Subject();
    this._overlap
      .filter(v => v.length > 0)
      .map(v => v.reduce((a, b) => Math.max(a, b)))
      .distinctUntilChanged()
      .subscribe((battery: number) => {
        this.removeAllTween();
        this.change(battery).start();
        param.onBatteryChange(battery);
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
    const overlap = this._view.getMouseOverlap(mouse);
    this._overlap.next(overlap);
  }

  /** マウスムーブした際の処理 */
  onMouseMove(mouseRaycaster: MouseRaycaster, isLeftButtonPushed: boolean): void {
    if (isLeftButtonPushed) {
      this.onMouseDown(mouseRaycaster);
    }
  }

  /** タッチスタートした際の処理 */
  onTouchStart(touch: TouchRaycastContainer): void {
    const overlap = this._view.getTouchOverlap(touch);
    this._overlap.next(overlap);
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