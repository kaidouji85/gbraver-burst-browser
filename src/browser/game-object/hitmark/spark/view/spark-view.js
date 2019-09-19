// @flow
import * as THREE from 'three';
import type {SparkModel} from "../model/spark-model";

/** ヒットマークビュー */
export interface SparkView {
  /** デストラクタ */
  destructor(): void;

  /** モデルをビューに反映させる */
  engage(model: SparkModel): void;

  /** カメラ方向を向く */
  lookAt(camera: THREE.Camera): void;

  /** シーンに追加するオブジェクトを取得 */
  getObject3D(): THREE.Object3D;
}