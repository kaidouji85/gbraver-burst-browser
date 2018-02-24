// @flow
import * as THREE from "three";
import type {TextureButtonModel} from "./model/texture-button-model";
import {TextureButtonView} from "./view/texture-button-view";
import {Button} from "../button";

type Param = {
  texture: THREE.Texture,
  width: number,
  height: number,
  posX: number,
  posY: number
};

/** ボタンのクラス */
export class TextureButton implements Button {
  _model: TextureButtonModel;
  _view: TextureButtonView;

  constructor(param: Param) {
    this._model = {
      isPushed: false,
      scale: 1,
      opacity: 1,
      pos: {
        x: param.posX,
        y: param.posY
      }
    };
    this._view = new TextureButtonView(param);
  }

  /** ゲームループ */
  gameLoop() {
    this._view.gameLoop(this._model);
  }

  /** シーンに追加するthree.jsオブジェクトを取得する */
  getThreeJsObjects(): THREE.Mesh[] {
    return this._view.getThreeJsObjects();
  }
}