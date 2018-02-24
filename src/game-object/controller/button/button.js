// @flow
import * as THREE from "three";
import type {ButtonModel} from "./model/button-model";
import {TextureButtonView} from "./view/texture-button-view";
import {ButtonView} from "./view/button-view";

/** ボタンのクラス */
export class Button {
  _model: ButtonModel;
  _view: ButtonView;

  constructor(view: TextureButtonView) {
    this._model = {
      depth: 1,
      opacity: 1,
      isTouchDown: false,
    };
    this._view = view;
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
  touchDownScreen(raycaster: THREE.Raycater): void {
    const isOverlap = this._view.isOverlap(raycaster);
    this._model.isTouchDown = isOverlap;
  }

  /** マウス、指がスクリーンにタッチアップした際の処理 */
  touchUpScreen(raycaster: THREE.Raycater): void {
    const isOverlap = this._view.isOverlap(raycaster);
    if (isOverlap && this._model.isTouchDown) {
      console.log('on push!!');
    }
    this._model.isTouchDown = false;
  }
}