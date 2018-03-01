// @flow
import * as THREE from "three";
import type {ButtonModel} from "./model/button-model";
import {TextureButtonView} from "./view/texture-button-view";
import {ButtonView} from "./view/button-view";
import {ClickChecker} from "../../../operation/mouse/click-checker";

/** ボタンのクラス */
export class Button {
  _model: ButtonModel;
  _view: ButtonView;
  _mouseClickChecker: ClickChecker;

  constructor(view: TextureButtonView) {
    this._model = {
      depth: 1,
      opacity: 1
    };
    this._view = view;
    this._mouseClickChecker = new ClickChecker({
      onClick: () => {
        // TODO テスト用なので削除する
        alert('クリックしたよ');
      }
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
  onMouseDown(raycaster: THREE.Raycater): void {
    const isOverlap = this._view.isOverlap(raycaster);
    this._mouseClickChecker.onMouseDown(isOverlap);
  }

  /** マウス、指がスクリーンにタッチアップした際の処理 */
  onMouseUp(raycaster: THREE.Raycater): void {
    const isOverlap = this._view.isOverlap(raycaster);
    this._mouseClickChecker.onMouseUp(isOverlap);
  }
}