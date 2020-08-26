// @flow

import * as THREE from 'three';
import type {RecoverBatteryModel} from "../model/recover-battery-model";

/** バッテリー回復 */
export interface RecoverBatteryView {
  /** デストラクタ */
  destructor(): void;

  /**
   * モデルをビューに反映させる
   *
   * @param model モデル
   */
  engage(model: RecoverBatteryModel): void;

  /**
   * カメラの方向を向く
   * 
   * @param camera カメラ
   */
  lookAt(camera: typeof THREE.Camera): void;

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @return オブジェクト
   */
  getObject3D(): typeof THREE.Object3D;
}