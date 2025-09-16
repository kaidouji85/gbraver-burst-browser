import * as THREE from "three";

/** バッテリーセレクタのアイコン */
export type BatterySelectorIcon = {
  /** メッシュ */
  mesh: THREE.Mesh;
  /** アイコ位置（ローカル座標） */
  position: {
    /** x座標 */
    x: number;
    /** y座標 */
    y: number;
  };
};
