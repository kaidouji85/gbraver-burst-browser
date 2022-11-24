// @flow

import * as THREE from "three";

/** ジェネシスブレイバービュー */
export interface GenesisBraverView {
  /**
   * デストラクタ相当の処理
   */
  destructor(): void;

  /**
   * シーンに追加するオブジェクトを取得する
   * @return 取得結果
   */
  getObject3D(): typeof HREE.Object3D;

  /**
   * カメラの真正面を向く
   * @param camera カメラ
   */
  lookAt(camera: typeof THREE.Camera): void;
}
