// @flow

import type {BatteryNumberModel} from "../model/battery-number-model";
import * as THREE from 'three';

/** バッテリー数字のビュー */
export interface BatteryNumberView {
  /** デストラクタ */
  destructor(): void;

  /** モデルをビューに反映させる */
  engage(model: BatteryNumberModel): void;

  /** カメラの方向を向く */
  lookAt(camera: typeof THREE.Camera): void;

  /** シーンに追加するオブジェクトを返す */
  getObject3D(): typeof THREE.Object3D;
}