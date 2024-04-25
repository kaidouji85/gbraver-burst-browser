import * as THREE from "three";

import type { PreRender } from "../../../../game-loop/pre-render";
import type { ShinyaModel } from "../model/shinya-model";

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
   * @param preRender プリレンダー情報
   */
  engage(model: ShinyaModel, preRender: PreRender): void;

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @returns シーンに追加するオブジェクト
   */
  getObject3D(): THREE.Object3D;
}
