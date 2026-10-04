import * as THREE from "three";

import type { PreRender } from "../../../../game-loop/pre-render";
import type { NeoLandozerCutInModel } from "../model/neo-landozer-cutin-model";

/**
 * ネオランドーザ ビュー
 */
export interface NeoLandozerCutInView {
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
  engage(model: NeoLandozerCutInModel, preRender: PreRender): void;

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @returns シーンに追加するオブジェクト
   */
  getObject3D(): THREE.Object3D;
}
