// @flow

import * as THREE from "three";
import type { BatteryEnchantmentModel } from "../model/battery-enchantment-model";

/**
 * バッテリー増強 ビュー
 */
export interface BatteryEnchantmentView {
  /** デストラクタ相当の処理 */
  destructor(): void;

  /**
   * モデルをビューに反映させる
   */
  engage(model: BatteryEnchantmentModel): void;

  /**
   * カメラの真正面を向く
   */
  lookAt(camera: typeof THREE.Camera): void;

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @return シーンに追加するオブジェクト
   */
  getObject3D(): typeof THREE.Object3D;
}
