// @flow

import * as THREE from 'three';
import type {PopUpModel} from "./model/pop-up-model";

/**
 * ポップアップ ビュー
 */
export interface PopUpView {
  /** デストラクタ相当の処理 */
  destructor(): void;

  /**
   * モデルをビューに反映させる
   */
  engage(model: PopUpModel): void;

  /**
   * カメラの真正面を向く
   */
  lookAt(camera: THREE.Camera): void;

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @return シーンに追加するオブジェクト
   */
  getObject3D(): THREE.Object3D;
}