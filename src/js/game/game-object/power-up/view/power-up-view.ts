import * as THREE from "three";

import { PowerUpModel } from "../model/power-up-model";

/** 攻撃アップ ビュー */
export interface PowerUpView {
  /**
   * デストラクタ相当の処理
   */
  destructor(): void;

  /**
   * モデルをビューに反映させる
   * @param model モデル
   */
  engage(model: PowerUpModel): void;

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
