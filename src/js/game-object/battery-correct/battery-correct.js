// @flow

import * as THREE from "three";
import type {BatteryCorrectModel} from "./model/battery-correct-model";
import type {BatteryCorrectView} from "./view/battery-correct-view";
import {initialValue} from "./model/initial-value";

/** バッテリー補正 */
export class BatteryCorrect {
  _model: BatteryCorrectModel;
  _view: BatteryCorrectView;

  /**
   * コンストラクタ
   *
   * @param view ビュー
   */
  constructor(view: BatteryCorrectView) {
    this._model = initialValue();
    this._view = view;
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this._view.destructor();
  }

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @return シーンに追加するオブジェクト
   */
  getObject3D(): typeof THREE.Object3D {
    return this._view.getObject3D();
  }
}