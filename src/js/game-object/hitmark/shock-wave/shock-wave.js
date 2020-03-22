// @flow

import * as THREE from 'three';
import type {ShockWaveView} from "./view/shock-wave-view";

/**
 * 衝撃波
 */
export class ShockWave {
  _view: ShockWaveView;

  constructor(view: ShockWaveView) {
    this._view = view;
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this._view.destructor();
  }

  /**
   * シーンに追加するオブジェクトを返す
   *
   * @return シーンに追加するオブジェクト
   */
  getObject3D(): THREE.Object3D {
    return this._view.getObject3D();
  }
}