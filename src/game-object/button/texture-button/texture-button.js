// @flow
import * as THREE from "three";
import type {TextureButtonModel} from "./model/texture-button-model";
import {TextureButtonView} from "./view/texture-button-view";
import {Button} from "../button";

/** ボタンのクラス */
export class TextureButton implements Button {
  _model: TextureButtonModel;
  _view: TextureButtonView;

  constructor(view: TextureButtonView) {
    this._model = {
      isPushed: false,
      scale: 1,
      opacity: 1
    };
    this._view = view;
  }

  /** ゲームループ */
  gameLoop(time: DOMHighResTimeStamp) {
    this._view.gameLoop(this._model);
  }

  /** シーンに追加するthree.jsオブジェクトを取得する */
  getThreeJsObjects(): THREE.Mesh[] {
    return this._view.getThreeJsObjects();
  }

  /** mousedownイベント発行時に呼び出される関数 */
  mouseDown(raycaster: THREE.Raycater): void {
    const isOverlap = this._view.isOverlap(raycaster);
    if (isOverlap) {
      console.log('attack button push on!!');
    }
  }
}