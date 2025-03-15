import * as THREE from "three";

import { LightningShotModel } from "../model/lightning-shot-model";

/** 電撃ショットビュー */
export interface LightningShotView {
  /**
   * デストラクタ相当の処理
   */
  destructor(): void;

  /**
   * モデルをビューに反映させる
   * @param model モデル
   */
  engage(model: LightningShotModel): void;

  /**
   * カメラの真正面を向く
   * @param camera カメラ
   */
  lookAt(camera: THREE.Camera): void

  /**
   * シーンに追加するオブジェクトを取得する
   * @returns シーンに追加するオブジェクト
   */
  getObject3D(): THREE.Object3D;
}
