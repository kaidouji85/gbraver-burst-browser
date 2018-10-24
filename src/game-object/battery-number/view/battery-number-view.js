// @flow

import type {BatteryNumberModel} from "../model/battery-number-model";
import * as THREE from 'three';

/** バッテリー数字のビュー */
export interface BatteryNumberView {
  /** モデルをビューに反映させる */
  engage(model: BatteryNumberModel): void;

  /** カメラの方向を向く */
  lookAt(camera: THREE.Camera): void;

  /** シーンに追加するオブジェクトを返す */
  getObject3D(): THREE.Object3D;
}