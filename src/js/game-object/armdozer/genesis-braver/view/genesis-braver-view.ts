import * as THREE from "three";

import type { GenesisBraverModel } from "../model/genesis-braver-model";

/** ジェネシスブレイバービュー */
export interface GenesisBraverView {
  /**
   * デストラクタ相当の処理
   */
  destructor(): void;

  /**
   * シーンに追加するオブジェクトを取得する
   * @returns 取得結果
   */
  getObject3D(): THREE.Object3D;

  /**
   * モデルをビューに反映させる
   * @param model モデル
   */
  engage(model: GenesisBraverModel): void;

  /**
   * カメラの真正面を向く
   * @param camera カメラ
   */
  lookAt(camera: THREE.Camera): void;

  /**
   * スプライト配下のオブジェクトを追加する
   * @param object オブジェクト
   */
  addObject3D(object: THREE.Object3D): void;
}
