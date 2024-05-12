import * as THREE from "three";

import type { BatteryEnhancementModel } from "../model/battery-enhancement-model";

/**
 * バッテリー増強 ビュー
 */
export interface BatteryEnhancementView {
  /** デストラクタ相当の処理 */
  destructor(): void;

  /**
   * モデルをビューに反映させる
   */
  engage(model: BatteryEnhancementModel): void;

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
