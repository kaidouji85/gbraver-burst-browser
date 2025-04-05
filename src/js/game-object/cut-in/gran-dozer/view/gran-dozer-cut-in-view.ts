import * as THREE from "three";

import { PreRender } from "../../../../game-loop/pre-render";
import { GranDozerCutInModel } from "../model/gran-dozer-cut-in-model";

/** グランドーザ カットイン ビュー */
export interface GranDozerCutInView {
  /**
   * デストラクタ相当の処理
   */
  destructor(): void;

  /**
   * モデルをビューに反映させる
   * @param model モデル
   * @param preRender プリレンダー
   */
  engage(model: GranDozerCutInModel, preRender: PreRender): void;

  /**
   * シーンに追加するオブジェクトを取得
   * @returns 取得結果
   */
  getObject3D(): THREE.Object3D;
}
