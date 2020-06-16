// @flow

import type {Resources} from "../../../resource";
import * as THREE from "three";
import type {WingDozerCutInModel} from "./model/wing-dozer-cutin-model";
import type {WingDozerCutInView} from "./view/wing-dozer-cutin-view";
import {createInitialValue} from "./model/initial-value";
import {PlayerWingDozerCutInView} from "./view/player-wing-dozer-cutin-view";

/**
 * ウィングドーザ カットイン
 */
export class WingDozerCutIn {
  _model: WingDozerCutInModel;
  _view: WingDozerCutInView;

  constructor(resources: Resources) {
    this._model = createInitialValue();
    this._view = new PlayerWingDozerCutInView(resources);
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