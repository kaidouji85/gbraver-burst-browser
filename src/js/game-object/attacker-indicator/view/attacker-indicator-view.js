// @flow

import * as THREE from 'three';
import type {AttackerIndicatorModel} from "../model/attacker-indicator-model";

/** アタッカーインジケータービュー */
export interface AttackerIndicatorView {
  /** デストラクタ相当の処理 */
  destructor(): void;

  /** モデルをビューに反映させる */
  engage(model: AttackerIndicatorModel): void;

  /** カメラの真正面を向く */
  lookAt(camera: THREE.Camera): void;

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @return シーンに追加するオブジェクト
   */
  getObject3D(): THREE.Object3D;
}