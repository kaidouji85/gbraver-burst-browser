// @flow
import * as THREE from "three";
import type {ButtonModel} from "./model/button-model";
import {TextureButtonView} from "./view/texture-button-view";
import {ButtonView} from "./view/button-view";
import {ClickChecker} from "../../../operation/mouse/click-checker";
import {TapChecker} from "../../../operation/touch/tap-checker";
import type {TouchOverlapContainer} from "../../../operation/touch/touch-overlap";
import type {TouchRaycastContainer} from "../../../operation/touch/touch-raycaster";
import {createTouchEventOverlap} from "../../../operation/touch/touch-overlap";

/** ボタンのクラス */
export class Button {
  _model: ButtonModel;
  _view: ButtonView;
  _clickChecker: ClickChecker;
  _tapChecker: TapChecker;

  constructor(view: TextureButtonView) {
    this._model = {
      depth: 1,
      opacity: 1
    };
    this._view = view;
    this._clickChecker = new ClickChecker({
      onClick: () => {
        // TODO テスト用なので削除する
        alert('クリックしたよ');
      },
      onClickStart: () => {
        console.log('click start');
      },
      onClickCancel: () => {
        console.log('click cancel');
      }
    });
    this._tapChecker = new TapChecker({
      onTap: () => {
        // TODO テスト用なので削除する
        alert('タップしたよ');
      }
    })
  }

  /** ゲームループ */
  gameLoop(time: DOMHighResTimeStamp) {
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
}