// @flow
import * as THREE from "three";
import type {ButtonModel} from "./model/button-model";
import {TextureButtonView} from "./view/texture-button-view";
import {ButtonView} from "./view/button-view";
import {ClickChecker} from "../../../operation/mouse/click-checker";
import {TapChecker} from "../../../operation/touch/tap-checker";
import type {TouchEventOverlap} from "../../../operation/touch/touch-overlap";
import type {TouchEventRaycaster} from "../../../operation/touch/touch-raycaster";
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

  /** マウス、指がスクリーンにタッチダウンした際の処理 */
  onMouseDown(raycaster: THREE.Raycater): void {
    const isOverlap = this._view.isOverlap(raycaster);
    this._clickChecker.onMouseDown(isOverlap);
  }

  /** マウス、指がスクリーンにタッチアップした際の処理 */
  onMouseUp(raycaster: THREE.Raycater): void {
    const isOverlap = this._view.isOverlap(raycaster);
    this._clickChecker.onMouseUp(isOverlap);
  }

  onTouchStart(touchRaycaster: TouchEventRaycaster): void {
    const touchOverlap: TouchEventOverlap = createTouchEventOverlap(touchRaycaster, this._view);
    this._tapChecker.onTouchStart(touchOverlap);
  }

  onTouchEnd(touchRaycaster: TouchEventRaycaster): void {
    const touchOverlap: TouchEventOverlap = createTouchEventOverlap(touchRaycaster, this._view);
    this._tapChecker.onTouchEnd(touchOverlap);
  }
}