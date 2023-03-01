import * as THREE from "three";

/** ジェネシスブレイバー カットイン ビュー */
export interface GenesisBraverCutInView {
  /**
   * シーンに追加するオブジェクトを取得
   */
  getObject3D(): THREE.Object3D;
}