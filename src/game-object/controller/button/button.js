// @flow
import * as THREE from "three";
import type {ButtonModel} from "./model/button-model";
import {TextureButtonView} from "./view/texture-button-view";
import {ButtonView} from "./view/button-view";
import {ClickChecker} from "../../../touch/click-checker";

/** ボタンのクラス */
export class Button {
  _model: ButtonModel;
  _view: ButtonView;
  _clickChecker: ClickChecker;

  constructor(view: TextureButtonView) {
    this._model = {
      depth: 1,
      opacity: 1
    };
    this._view = view;
    this._clickChecker = new ClickChecker(() => {
      console.log('onClick');
    });
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
    this._clickChecker.touchDownScreen(isOverlap);
  }

  /** マウス、指がスクリーンにタッチアップした際の処理 */
  touchUpScreen(raycaster: THREE.Raycater): void {
    const isOverlap = this._view.isOverlap(raycaster);
    this._clickChecker.touchUpScreen(isOverlap);
  }
}