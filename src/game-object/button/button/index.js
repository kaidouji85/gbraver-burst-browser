// @flow
import * as THREE from "three";
import {Group, Tween} from '@tweenjs/tween.js';
import type {ButtonModel} from "./model/button-model";
import type {TouchRaycastContainer} from "../../../screen-touch/touch/touch-raycaster";
import type {Resources} from "../../../resource/index";
import {ButtonView} from "./button-view";
import {push} from "./model/push";
import {isGroupPlaying} from "../../../tween/is-group-playing";
import {isTouchOverlap} from "../../../screen-touch/touch/touch-overlap";
import type {MouseRaycaster} from "../../../screen-touch/mouse/mouse-raycaster";
import {isMouseOverlap} from "../../../screen-touch/mouse/mouse-overlap";
import {visible} from './model/visible';
import {Subject} from 'rxjs';
import { filter } from 'rxjs/operators';

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

//TODO 表示・非表示、コントロール可能・不可の設定を追加する
/** コウゲキボタン */
export class Button {
  _model: ButtonModel;
  _view: ButtonView;
  _depthTween: Group;
  _opacityTween: Group;
  _onOverlap: Subject<void>;

  constructor(param: Param) {
    this._model = {
      depth: 0,
      opacity: param.visible ? 1 : 0
    };
    this._view = param.view;
    this._depthTween = new Group();
    this._opacityTween = new Group();

    this._onOverlap = new Subject();
    this._onOverlap.pipe(
      filter(() => !isGroupPlaying(this._depthTween)),
      filter(() => !isGroupPlaying(this._opacityTween)),
      filter(() => this._model.opacity === 1)
    ).subscribe(() => {
      param.onPush();
      this.pushAnimation().start();
    });
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
      this._onOverlap.next();
    }
  }

  /** ゲーム画面でタッチスタートした際の処理 */
  onTouchStart(touchRaycaster: TouchRaycastContainer): void {
    const isFingerOverlay = isTouchOverlap(touchRaycaster, this._view);
    if (isFingerOverlay) {
      this._onOverlap.next();
    }
  }

  /** シーンに追加するthree.jsオブジェクトを取得する */
  getThreeJsObjectList(): THREE.Mesh[] {
    return this._view.getThreeJsObjectList();
  }
}