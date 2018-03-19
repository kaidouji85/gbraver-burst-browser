// @flow
import * as THREE from "three";
import {Group, Tween} from '@tweenjs/tween.js';
import type {ButtonModel} from "./model/button-model";
import {TapChecker} from "../../../operation/touch/tap-checker";
import type {TouchOverlapContainer} from "../../../operation/touch/touch-overlap";
import type {TouchRaycastContainer} from "../../../operation/touch/touch-raycaster";
import {createTouchEventOverlap} from "../../../operation/touch/touch-overlap";
import {pushStart} from "./model/push-start";
import {pushEnd} from "./model/push-end";
import type {Resources} from "../../../resource";
import {AttackButtonView} from "./attack-button-view";
import {push} from "./model/push";
import {isGroupPlaying} from "../../../tween/is-group-playing";

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
  _onPush: () => void;
  // TODO 廃止予定
  _tapChecker: TapChecker;

  constructor(param: Param) {
    this._model = {
      depth: 0,
      opacity: 1
    };
    this._view = new AttackButtonView(param.resources);
    this._tweenGroup = new Group();
    this._onPush = param.onPush;

    // TODO 廃止予定
    this._tapChecker = new TapChecker({
      onTap: () => {
        this._pushEnd();
        param.onPush();
      },
      onTapStart: () => this._pushStart(),
      onTapCancel: () => this._pushEnd()
    });
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
    if (isMouseOverLap && this._canPush()) {
      this._onPush();
    }
  }

  /** ゲーム画面でタッチスタートした際の処理 */
  onTouchStart(touchRaycaster: TouchRaycastContainer): void {
    const touchOverlap: TouchOverlapContainer = createTouchEventOverlap(touchRaycaster, this._view);
    this._tapChecker.onTouchStart(touchOverlap);
  }

  /** ゲーム画面でタッチスエンドした際の処理 */
  onTouchEnd(touchRaycaster: TouchRaycastContainer): void {
    const touchOverlap: TouchOverlapContainer = createTouchEventOverlap(touchRaycaster, this._view);
    this._tapChecker.onTouchEnd(touchOverlap);
  }

  /** ボタン押し込み開始アニメーションを再生する */
  _pushStart() {
    this._tweenGroup.removeAll();
    pushStart(this._model, this._tweenGroup).start();
  }

  /** ボタン押し込み終了アニメーションを再生する */
  _pushEnd() {
    this._tweenGroup.removeAll();
    pushEnd(this._model, this._tweenGroup).start();
  }

  /** ボタン押下アニメーション */
  push(): Tween.TWEEN {
    return push(this._model, this._tweenGroup);
  }

  /** ボタン押下可能か否かを判定する */
  _canPush(): boolean {
    return !isGroupPlaying(this._tweenGroup);
  }
}