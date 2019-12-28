//@flow

import * as THREE from 'three';
import type {BurstIndicatorModel} from "./model/burst-indicator-model";
import type {BurstIndicatorView} from "./view/burst-indicator-view";

/**
 * バーストインジケータ
 */
export class BurstIndicator {
  _model: BurstIndicatorModel;
  _view:  BurstIndicatorView;

  constructor(view: BurstIndicatorView) {
    this._model = {}; // TODO 初期化関数を追加する
    this._view = view;
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
