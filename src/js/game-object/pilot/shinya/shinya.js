// @flow

import * as THREE from 'three';
import type {Resources} from "../../../resource";
import type {ShinyaModel} from "./model/shinya-model";
import {ShinyaView} from "./view/shinya-view";
import {createInitialValue} from "./model/initial-value";

/**
 * シンヤ カットイン
 */
export class Shinya {
  _model: ShinyaModel;
  _view: ShinyaView;

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    this._model = createInitialValue();
    this._view = new ShinyaView(resources);
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