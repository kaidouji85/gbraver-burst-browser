// @flow

import * as THREE from 'three';
import type {DamageDecreaseModel} from "../model/damage-decrease-model";

/**
 * ポップアップ ビュー
 */
export interface DamageDecreaseView {
  /** デストラクタ相当の処理 */
  destructor(): void;

  /**
   * モデルをビューに反映させる
   */
  engage(model: DamageDecreaseModel): void;

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