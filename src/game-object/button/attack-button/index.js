// @flow
import {Subject} from 'rxjs';
import * as THREE from "three";
import {Group, Tween} from '@tweenjs/tween.js';
import type {ButtonModel} from "./model/button-model";
import type {TouchRaycastContainer} from "../../../operation/touch/touch-raycaster";import type {Resources} from "../../../resource";
import {AttackButtonView} from "./attack-button-view";
import {push} from "./model/push";
import {isGroupPlaying} from "../../../tween/is-group-playing";
import {isTouch} from "../../../operation/touch/touch-checker";

/** コンストラクタのパラメータ */
type Param = {
  /** ボタンで使うビュー */
  resources: Resources,
  /** ボタンがクリックされた際のコールバック関数 */
  onPush: () => void
};

/** コウゲキボタン */
export class AttackButton {
  _model: ButtonModel;
  _view: AttackButtonView;
  _tweenGroup: Group;
  _pushSubject: Subject;

  constructor(param: Param) {
    this._model = {
      scale: 1,
      opacity: 1
    };
    this._view = new AttackButtonView(param.resources);
    this._tweenGroup = new Group();

    this._pushSubject = new Subject();
    this._pushSubject
      .filter(() => this._canPush())
      .subscribe(() => param.onPush());
  }

  /** ゲームループ */
  gameLoop(time: DOMHighResTimeStamp) {
    this._tweenGroup.update(time);
    this._view.gameLoop(this._model);
  }

  /** シーンに追加するthree.jsオブジェクトを取得する */
  getThreeJsObjectList(): THREE.Mesh[] {
    return this._view.getThreeJsObjectList();
  }

  /** マウスダウンした際の処理 */
  onMouseDown(raycaster: THREE.Raycater): void {
    const isMouseOverLap = this._view.isOverlap(raycaster);
    isMouseOverLap && this._pushSubject.next();
  }

  /** ゲーム画面でタッチスタートした際の処理 */
  onTouchStart(touchRaycaster: TouchRaycastContainer): void {
    const isFingerTouch = isTouch(touchRaycaster, this._view);
    isFingerTouch && this._pushSubject.next();
  }

  /** ボタン押下アニメーション */
  push(): Tween.TWEEN {
    return push(this._model, this._tweenGroup);
  }

  /** 本オブジェクトで再生中のTweenを全て破棄する */
  removeAllTween(): void {
    this._tweenGroup.removeAll();
  }

  /** ボタン押下可能か否かを判定する */
  _canPush(): boolean {
    return !isGroupPlaying(this._tweenGroup);
  }
}