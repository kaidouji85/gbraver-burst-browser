// @flow

import * as THREE from "three";
import type {SkyBrightnessModel} from "./model/sky-brightness-model";
import {SkyBrightnessView} from "./view/sky-brightness-view";
import {createInitialValue} from "./model/initial-value";

/** 空の明るさ */
export class SkyBrightness {
  _model: SkyBrightnessModel;
  _view: SkyBrightnessView;

  constructor() {
    this._model = createInitialValue();

    this._view = new SkyBrightnessView();
    this._view.engage(this._model);
  }

  /** デストラクタ相当の処理 */
  destructor(): void {
    this._view.destructor();
  }

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @return シーンに追加するオブジェクト
   */
  getObject3D(): THREE.Object3D {
    return this._view.getObject3D();
  }
}
