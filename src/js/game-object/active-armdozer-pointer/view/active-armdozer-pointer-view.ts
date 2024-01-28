import * as THREE from "three";

import { ActiveArmdozerPointerModel } from "../model/active-armdozer-pointer-model";

/** アクティブアームドーザポインターのビュー */
export interface ActiveArmdozerPointerView {
  /**
   * デストラクタ相当の処理
   */
  destructor(): void;

  /**
   * シーンに追加するオブジェクトを返す
   * @return シーンに追加するオブジェクト
   */
  getObject3D(): THREE.Object3D;

  /**
   * モデルをビューに反映させる
   * @param model モデル
   */
  engage(model: ActiveArmdozerPointerModel): void;
}
