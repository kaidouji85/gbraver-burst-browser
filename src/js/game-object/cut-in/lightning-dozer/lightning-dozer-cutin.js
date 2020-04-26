// @flow

import * as THREE from "three";
import type {LightningDozerCutInModel} from "./model/lightning-dozer-cutin-model";
import type {LightningDozerCutInView} from "./view/lightning-dozer-cutin-view";
import {createInitialValue} from "./model/initial-value";

/**
 * ライトニングドーザ カットイン
 */
export class LightningDozerCutIn {
  _model: LightningDozerCutInModel;
  _view: LightningDozerCutInView;

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   */
  constructor(view: LightningDozerCutInView) {
    this._model = createInitialValue();
    this._view = view;
    this._view.engage(this._model);
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
  getObject3D(): THREE.Object3D {
    return this._view.getObject3D();
  }
}