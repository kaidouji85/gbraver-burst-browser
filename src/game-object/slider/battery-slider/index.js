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
import { map, filter, distinctUntilChanged } from 'rxjs/operators';
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
  /** バッテリーメモリのTweenグループ */
  _batteryTween: Group;
  /** 透明度のTweenグループ */
  _opacityTween: Group;
  /** 目盛り当たり判定をキャッシュする */
  _lastOverlap: number[];
  /** 目盛り当たり判定を受け取り、目盛り値変更処理を行う */
  _overlapSubject: Subject<number[]>;

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

    this._lastOverlap = [];

    this._overlapSubject = new Subject();
    this._overlapSubject.pipe(
      filter(v => 0 < v.length),
      filter(() => !isGroupPlaying(this._opacityTween)),
      filter(() => this._model.opacity === 1),
      map(v => v.reduce((a, b) => Math.min(a, b))),
      distinctUntilChanged(),
    ).subscribe((battery: number) => {
      this._removeBatteryTween();
      this.changeBatteryAnimation(battery).start();
      param.onBatteryChange(battery);
    });
  }

  /** ゲームループの処理 */
  gameLoop(time: DOMHighResTimeStamp): void {
    this._batteryTween.update(time);
    this._opacityTween.update(time);
    this._overlapSubject.next(this._lastOverlap);
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


  /** 本クラスのスライダーTweenを全て削除する */
  _removeBatteryTween(): void {
    this._batteryTween.removeAll();
  }

  /** マウスダウンした際の処理 */
  onMouseDown(mouse: MouseRaycaster): void {
    const overlap = this._view.getMouseOverlap(mouse);
    this._lastOverlap = overlap;
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
    this._lastOverlap = overlap;
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