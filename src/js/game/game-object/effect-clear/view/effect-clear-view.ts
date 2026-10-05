import * as THREE from "three";

import { EffectClearModel } from "../model/effect-clear-model";

/** 効果消去 ビュー */
export interface EffectClearView {
  /**
   * デストラクタ相当の処理
   */
  destructor(): void;

  /**
   * モデルをビューに反映させる
   * @param model モデル
   */
  engage(model: EffectClearModel): void;

  /**
   * カメラの真正面を向く
   * @param camera カメラ
   */
  lookAt(camera: THREE.Camera): void;

  /**
   * シーンに追加するオブジェクトを取得する
   * @returns シーンに追加するオブジェクト
   */
  getObject3D(): THREE.Object3D;
}
