// @flow
import * as THREE from "three";

/** リザルト ビュー */
export interface ResultIndicatorView {
  /**
   * デストラクタ相当の処理
   */
  destructor(): void;

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @return 取得結果
   */
  getObject3D(): typeof THREE.Object3D;
}