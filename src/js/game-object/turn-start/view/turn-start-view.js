// @flow

import * as THREE from 'three';
import type {TurnStartModel} from "../model/turn-start-model";

/** ターンスタートビュー */
export interface TurnStartView {
  /** デストラクタ相当の処理 */
  destructor(): void;

  /** モデルをビューに反映させる */
  engage(model: TurnStartModel): void;

  /** カメラの真正面を向く */
  lookAt(camera: THREE.Camera): void;

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @return シーンに追加するオブジェクト
   */
  getObject3D(): THREE.Object3D;
}