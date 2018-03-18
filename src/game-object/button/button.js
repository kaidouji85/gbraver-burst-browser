// @flow
import * as THREE from "three";
import {Group, Tween} from '@tweenjs/tween.js';
import type {ButtonModel} from "./model/button-model";
import {TextureButtonView} from "./view/texture-button-view";
import {ButtonView} from "./view/button-view";
import {ClickChecker} from "../../operation/mouse/click-checker";
import {TapChecker} from "../../operation/touch/tap-checker";
import type {TouchOverlapContainer} from "../../operation/touch/touch-overlap";
import type {TouchRaycastContainer} from "../../operation/touch/touch-raycaster";
import {createTouchEventOverlap} from "../../operation/touch/touch-overlap";
import {pushStart} from "./model/push-start";
import {pushEnd} from "./model/push-end";

/** コンストラクタのパラメータ */
type Param = {
  /** ボタンで使うビュー */
  view: TextureButtonView,
  /** ボタンがクリックされた際のコールバック関数 */
  onPush: () => void
};

/** ボタンのクラス */
export class Button {
  _model: ButtonModel;
  _view: ButtonView;
  _depthGroup: Group;
  _clickChecker: ClickChecker;
  _tapChecker: TapChecker;

  constructor(param: Param) {
    this._model = {
      depth: 0,
      opacity: 1
    };
    this._view = param.view;
    this._depthGroup = new Group();
    this._clickChecker = new ClickChecker({
      onClick: () => {
        this._pushEnd();
        param.onPush();
      },
      onClickStart: () => this._pushStart(),
      onClickCancel: () => this._pushEnd()

    });
    this._tapChecker = new TapChecker({
      onTap: () => {
        this._pushEnd();
        param.onPush();
      },
      onTapStart: () => this._pushStart(),
      onTapCancel: () => this._pushEnd()
    })
  }

  /** ゲームループ */
  gameLoop(time: DOMHighResTimeStamp) {
    this._depthGroup.update(time);
    this._view.gameLoop(this._model);
  }

  /** シーンに追加するthree.jsオブジェクトを取得する */
  getThreeJsObjectList(): THREE.Mesh[] {
    return this._view.getThreeJsObjectList();
  }

  /** マウスダウンした際の処理 */
  onMouseDown(raycaster: THREE.Raycater): void {
    const isOverlap = this._view.isOverlap(raycaster);
    this._clickChecker.onMouseDown(isOverlap);
  }

  /** マウスアップした際の処理 */
  onMouseUp(raycaster: THREE.Raycater): void {
    const isOverlap = this._view.isOverlap(raycaster);
    this._clickChecker.onMouseUp(isOverlap);
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
    this._depthGroup.removeAll();
    pushStart(this._model, this._depthGroup).start();
  }

  /** ボタン押し込み終了アニメーションを再生する */
  _pushEnd() {
    this._depthGroup.removeAll();
    pushEnd(this._model, this._depthGroup).start();
  }
}