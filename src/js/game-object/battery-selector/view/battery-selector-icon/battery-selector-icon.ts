import * as THREE from "three";

/** バッテリーセレクタのアイコン */
export type BatterySelectorIcon = {
  /** デストラクタ相当の処理 */
  destructor: () => void;

  /** シーンに追加するオブジェクトを取得する */
  getObject3D: () => THREE.Object3D;

  /** 不透明度を設定する */
  opacity: (value: number) => void;

  /** アイコン位置（ローカル座標） */
  position: {
    /** x座標 */
    x: number;
    /** y座標 */
    y: number;
  };
};
