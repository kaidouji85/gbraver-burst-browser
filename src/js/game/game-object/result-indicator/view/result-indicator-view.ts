import * as THREE from "three";

import type { PreRender } from "../../../game-loop/pre-render";
import type { ResultIndicatorModel } from "../model/result-indicator-model";

/** リザルト ビュー */
export interface ResultIndicatorView {
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
  engage(model: ResultIndicatorModel, preRender: PreRender): void;

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @returns 取得結果
   */
  getObject3D(): THREE.Object3D;
}
