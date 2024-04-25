import * as THREE from "three";

import type { PreRender } from "../../../../game-loop/pre-render";
import type { TsubasaModel } from "../model/tsubasa-model";

/**
 * ツバサ ビュー
 */
export interface TsubasaView {
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
  engage(model: TsubasaModel, preRender: PreRender): void;

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @returns シーンに追加するオブジェクト
   */
  getObject3D(): THREE.Object3D;
}
