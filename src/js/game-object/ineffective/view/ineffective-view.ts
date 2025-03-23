import * as THREE from "three";

import type { IneffectiveModel } from "../model/ineffective-model";

/**
 * ポップアップ ビュー
 */
export interface IneffectiveView {
  /** デストラクタ相当の処理 */
  destructor(): void;

  /**
   * モデルをビューに反映させる
   */
  engage(model: IneffectiveModel): void;

  /**
   * カメラの真正面を向く
   */
  lookAt(camera: THREE.Camera): void;

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @returns シーンに追加するオブジェクト
   */
  getObject3D(): THREE.Object3D;
}
