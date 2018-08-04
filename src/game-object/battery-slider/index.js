// @flow

import {Observable, Subject} from 'rxjs';
import type {BatterySliderModel} from "./model/battery-slider-model";
import {BatterySliderView} from "./view/battery-slider-view";
import type {Resources} from "../../resource/index";
import * as THREE from "three";
import {change} from './model/change';
import {Group, Tween} from "@tweenjs/tween.js";
import type {TouchRaycastContainer, TouchRaycaster} from "../../screen-touch/touch/touch-raycaster";
import type {MouseRaycaster} from "../../screen-touch/mouse/mouse-raycaster";
import {getControllerScale} from "../../device-scale/controller-scale";
import {map, filter, distinctUntilChanged} from 'rxjs/operators';
import {visible} from './model/visible';
import {isGroupPlaying} from "../../tween/is-group-playing";

/** コンストラクタのパラメータ */
type Param = {
  resources: Resources,
  onBatteryChange: (battery: number) => void,
  isVisible: boolean
};

/** バッテリースライダー */
export class BatterySlider {
  /** バッテリースライダーのモデル */
  _model: BatterySliderModel;
  /** バッテリースライダーのビュー */
  _view: BatterySliderView;
  /** バッテリー目盛りのTweenグループ */
  _batteryTween: Group;
  /** 透明度のTweenグループ */
  _opacityTween: Group;
  /** マウス、指の当たり判定サブジェクト */
  _onOverlap: Subject<number[]>;


  constructor(param: Param) {
    const initialBattery = 3;
    this._model = {
      battery: initialBattery,
      maxBattery: 5,
      opacity: param.isVisible ? 1 : 0
    };
    this._view = new BatterySliderView({
      resources: param.resources,
      maxValue: this._model.maxBattery,
      scale: getControllerScale()
    });
    this._batteryTween = new Group();
    this._opacityTween = new Group();

    this._onOverlap = new Subject();
    this._onOverlap.pipe(
      filter(v => 0 < v.length),
      filter(() => this.canOperate()),
      map(v => v.reduce((a, b) => Math.max(a, b))),
      distinctUntilChanged()
    ).subscribe(v => {
      this.stopBatteryAnimation();
      this.changeBattery(v).start();
      param.onBatteryChange(v);
    });
  }

  /** ゲームループの処理 */
  gameLoop(time: DOMHighResTimeStamp): void {
    this._batteryTween.update(time);
    this._opacityTween.update(time);
    this._view.gameLoop(this._model);
  }

  /**
   * バッテリーゲージ目盛りを変更するアニメーション
   *
   * @param toBattery 変更する値
   * @return アニメーションTween
   */
  changeBattery(toBattery: number): Tween {
    return change(this._model, this._batteryTween, toBattery);
  }

  /** バッテリーアニメーションを停止させる */
  stopBatteryAnimation(): void {
    this._batteryTween.update();
    this._batteryTween.removeAll();
  }

  /**
   * スライダーの表示・非表示アニメーション
   *
   * @param isVisible スライダー表示フラグ、trueで表示する
   * @return アニメーションTween
   */
  visible(isVisible: boolean): Tween {
    return visible(this._model, this._opacityTween, isVisible);
  }

  /**
   * 操作可能か否かを返す
   *
   * @return 判定結果、trueで操作可能
   */
  canOperate(): boolean {
    const ret = !isGroupPlaying(this._opacityTween)
      && !isGroupPlaying(this._batteryTween)
      && this._model.opacity === 1;
    return ret;
  }

  /** マウスダウンした際の処理 */
  onMouseDown(mouse: MouseRaycaster): void {
    const overlap = this._view.getMouseOverlap(mouse);
    this._onOverlap.next(overlap);
  }

  /** マウスムーブした際の処理 */
  onMouseMove(mouse: MouseRaycaster, isLeftButtonPushed: boolean): void {
    if (!isLeftButtonPushed) {
      return;
    }

    const overlap = this._view.getMouseOverlap(mouse);
    this._onOverlap.next(overlap);
  }

  /** タッチスタートした際の処理 */
  onTouchStart(touch: TouchRaycastContainer): void {
    const overlap = this._view.getTouchOverlap(touch);
    this._onOverlap.next(overlap);
  }

  /** タッチムーブした際の処理 */
  onTouchMove(touch: TouchRaycastContainer): void {
    const overlap = this._view.getTouchOverlap(touch);
    this._onOverlap.next(overlap);
  }

  /** シーンに追加するthree.jsオブジェクトを返す */
  getThreeJsObjectList(): THREE.Mesh[] {
    return this._view.getThreeJsObjectList();
  }
}