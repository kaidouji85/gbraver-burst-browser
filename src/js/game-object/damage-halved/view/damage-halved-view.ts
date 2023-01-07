import * as THREE from "three";
import type { DamageHalvedModel } from "../model/damage-halved-model";

/** ダメージ半減ビュー */
export interface DamageHalvedView {
  /**
   * デストラクタ相当の処理
   */
  destructor(): void;

  /**
   * モデルをビューに反映させる
   *
   * @param model モデル
   */
  engage(model: DamageHalvedModel): void;

  /**
   * カメラの真正面を向く
   *
   * @param camera カメラ
   */
  lookAt(camera: typeof THREE.Camera): void;

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @return シーンに追加するオブジェクト
   */
  getObject3D(): typeof THREE.Object3D;
}