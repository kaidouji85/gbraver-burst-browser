import * as THREE from "three";
import type { ReflectIndocatorModel } from "../model/reflect-indocator-model";

/**
 * ダメージ反射 ビュー
 */
export interface ReflectIndicatorView {
  /** デストラクタ相当の処理 */
  destructor(): void;

  /**
   * モデルをビューに反映させる
   */
  engage(model: ReflectIndocatorModel): void;

  /**
   * カメラの真正面を向く
   */
  lookAt(camera: typeof THREE.Camera): void;

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @return シーンに追加するオブジェクト
   */
  getObject3D(): typeof THREE.Object3D;
}