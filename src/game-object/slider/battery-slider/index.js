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
import {getControllerScale} from "../../../device-scale/controller-scale";
import { map, filter, distinctUntilChanged, withLatestFrom } from 'rxjs/operators';
import {visible} from './model/visible';
import {isGroupPlaying} from "../../../tween/is-group-playing";

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
  /** バッテリースライダー目盛りと指、マウスの当たり判定結果 */
  _overlapSource: Subject<number[]>;
  /** バッテリースライダー目盛りTweenが更新された後に実行される処理 */
  _onBatteryTweenUpdated: Subject<void>;

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

    this._overlapSource = new Subject();
    this._onBatteryTweenUpdated = new Subject();
    this._onBatteryTweenUpdated
      .pipe(
        withLatestFrom(this._overlapSource)
      ).pipe(
        map(([_, overlap]) => overlap),
        distinctUntilChanged(),
        filter(overlap => 0 < overlap.length),
        map(overlap => overlap.reduce((a, b) => Math.min(a, b))),
        distinctUntilChanged()
      ).subscribe((battery: number) => {
        this._batteryTween.removeAll();
        this.changeBatteryAnimation(battery).start();
    })
  }

  /** ゲームループの処理 */
  gameLoop(time: DOMHighResTimeStamp): void {
    this._batteryTween.update(time);
    this._onBatteryTweenUpdated.next();
    this._opacityTween.update(time);
    this._view.gameLoop(this._model);
  }

  /** 現在のバッテリー値を返す */
  getBattery(): number {
    return Math.floor(this._model.battery);
  }

  /**
   * バッテリーゲージ目盛りを変更するアニメーション
   *
   * @param toBattery 変更する値
   * @return アニメーションTween
   */
  changeBatteryAnimation(toBattery: number): Tween {
    return change(this._model, this._batteryTween, toBattery);
  }

  /**
   * スライダーの表示・非表示アニメーション
   *
   * @param isVisible スライダー表示フラグ、trueで表示する
   * @return アニメーションTween
   */
  visibleAnimation(isVisible: boolean): Tween {
    return visible(this._model, this._opacityTween, isVisible);
  }

  /** マウスダウンした際の処理 */
  onMouseDown(mouse: MouseRaycaster): void {
    const overlap = this._view.getMouseOverlap(mouse);
    this.onOverlap(overlap);
  }

  /** マウスムーブした際の処理 */
  onMouseMove(mouseRaycaster: MouseRaycaster, isLeftButtonPushed: boolean): void {
    if (isLeftButtonPushed) {
      const overlap = this._view.getMouseOverlap(mouseRaycaster);
      this.onOverlap(overlap);
    }
  }

  /** タッチスタートした際の処理 */
  onTouchStart(touch: TouchRaycastContainer): void {
    const overlap = this._view.getTouchOverlap(touch);
    this.onOverlap(overlap);
  }

  /** タッチムーブした際の処理 */
  onTouchMove(touch: TouchRaycastContainer): void {
    const overlap = this._view.getTouchOverlap(touch);
    this.onOverlap(overlap);
  }

  /** 指、マウスがバッテリースライダー目盛りに接触した際の処理 */
  onOverlap(overlap: number[]): void {
    if (overlap.length <= 0 || isGroupPlaying(this._opacityTween) || this._model.opacity !== 1) {
      return;
    }
    this._overlapSource.next(overlap);
  }

  /** シーンに追加するthree.jsオブジェクトを返す */
  getThreeJsObjectList(): THREE.Mesh[] {
    return this._view.getThreeJsObjectList();
  }
}