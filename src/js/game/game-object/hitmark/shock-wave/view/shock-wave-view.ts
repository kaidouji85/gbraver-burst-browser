import * as THREE from "three";

import type { ShockWaveModel } from "../model/shock-wave-model";

/**
 * 衝撃波のビュー
 */
export interface ShockWaveView {
  /**
   * デストラクタ相当の処理
   */
  destructor(): void;

  /**
   * モデルをビューに反映させる
   *
   * @param model モデル
   */
  engage(model: ShockWaveModel): void;

  /**
   * 指定したカメラの真正面を向く
   *
   * @param camera カメラ
   */
  lookAt(camera: THREE.Camera): void;

  /**
   * シーンに追加するオブジェクトを返す
   *
   * @returns シーンに追加するオブジェクト
   */
  getObject3D(): THREE.Object3D;
}
