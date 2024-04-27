import * as THREE from "three";

/** ステージ */
export interface Stage {
  /** デストラクタ */
  destructor(): void;

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @returns シーンに追加するオブジェクト
   */
  getThreeJsObjects(): THREE.Object3D[];
}
