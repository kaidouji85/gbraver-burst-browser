import * as THREE from "three";

/**
 * アームドーザアイコン
 */
export interface ArmdozerIcon {
  /**
   * デストラクタ相当の処理
   */
  destructor(): void;

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @returns シーンに追加するオブジェクト
   */
  getObject3D(): THREE.Object3D;

  /**
   * 不透明度を設定する
   *
   * @param opacity 不透明度
   */
  setOpacity(opacity: number): void;
}
