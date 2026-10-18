import * as THREE from "three";

import type { ContinuousAttackModel } from "../model/continuous-attack-model";

/**
 * 連続攻撃 ビュー
 */
export interface ContinuousAttackView {
  /** デストラクタ相当の処理 */
  destructor(): void;

  /**
   * モデルをビューに反映させる
   */
  engage(model: ContinuousAttackModel): void;

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
