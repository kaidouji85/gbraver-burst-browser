// @flow

import * as THREE from 'three';
import type {ShinyaModel} from "../model/shinya-model";

/**
 * シンヤ ビュー
 */
export interface ShinyaView {
  /**
   * デストラクタ相当の処理
   */
  destructor(): void;

  /**
   * モデルをビューに反映させる
   *
   * @param model モデル
   */
  engage(model: ShinyaModel): void;

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @return シーンに追加するオブジェクト
   */
  getObject3D(): THREE.Object3D;
}