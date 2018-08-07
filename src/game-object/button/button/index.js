// @flow
import * as THREE from "three";
import {Group, Tween} from '@tweenjs/tween.js';
import type {ButtonModel} from "./model/button-model";
import type {TouchRaycastContainer} from "../../../overlap/check/touch/touch-raycaster";
import type {Resources} from "../../../resource/index";
import {ButtonView} from "./button-view";
import {push} from "./model/push";
import {isGroupPlaying} from "../../../tween/is-group-playing";
import {isTouchOverlap} from "../../../overlap/check/touch/touch-overlap";
import type {MouseRaycaster} from "../../../overlap/check/mouse/mouse-raycaster";
import {isMouseOverlap} from "../../../overlap/check/mouse/mouse-overlap";
import {visible} from './model/visible';

/** コンストラクタのパラメータ */
type Param = {
  /** ボタンで使うビュー */
  resources: Resources,
  /** ボタンがクリックされた際のコールバック関数 */
  onPush: () => void,
  /** ビュー */
  view: ButtonView,
  /** 表示フラグ、trueで表示する */
  visible: boolean,
};

/** ボタン */
export class Button {
  _model: ButtonModel;
  _view: ButtonView;
  _depthTween: Group;
  _opacityTween: Group;
  _onPush: () => void;

  constructor(param: Param) {
    this._model = {
      depth: 0,
      opacity: param.visible ? 1 : 0
    };
    this._view = param.view;
    this._depthTween = new Group();
    this._opacityTween = new Group();
    this._onPush = param.onPush;
  }

  /** ゲームループ */
  gameLoop(time: DOMHighResTimeStamp) {
    this._depthTween.update(time);
    this._opacityTween.update(time);
    this._view.gameLoop(this._model);
  }

  /**ボタン表示・非表示アニメーション */
  visibleAnimation(isVisible: boolean): Tween {
    return visible(this._model, this._opacityTween, isVisible);
  }

  /** ボタン押下アニメーション */
  pushAnimation(): Tween.TWEEN {
    return push(this._model, this._depthTween);
  }

  /** マウスダウンした際の処理 */
  onMouseDown(mouse: MouseRaycaster): void {
    if(isMouseOverlap(mouse, this._view)) {
      this.onOverlap();
    }
  }

  /** ゲーム画面でタッチスタートした際の処理 */
  onTouchStart(touchRaycaster: TouchRaycastContainer): void {
    const isFingerOverlay = isTouchOverlap(touchRaycaster, this._view);
    if (isFingerOverlay) {
      this.onOverlap();
    }
  }

  /** 指、マウスがボタンと重なった際の処理 */
  onOverlap(): void {
    if (isGroupPlaying(this._depthTween) || isGroupPlaying(this._opacityTween) || this._model.opacity !== 1) {
      return;
    }

    this._depthTween.update();
    this._depthTween.removeAll();
    this.pushAnimation().start();
    this._onPush();
  }

  /** シーンに追加するthree.jsオブジェクトを取得する */
  getThreeJsObjectList(): THREE.Mesh[] {
    return this._view.getThreeJsObjectList();
  }
}