import * as THREE from "three";

import { PreRender } from "../../../../game-loop/pre-render";
import { GenesisBraverCutInModel } from "../model/genesis-braver-cutin-model";

/** ジェネシスブレイバー カットイン ビュー */
export interface GenesisBraverCutInView {
  /**
   * デストラクタ相当の処理
   */
  destructor(): void;

  /**
   * モデルをビューに反映させる
   * @param model モデル
   * @param preRender プリレンダー
   */
  engage(model: GenesisBraverCutInModel, preRender: PreRender): void;

  /**
   * シーンに追加するオブジェクトを取得
   * @returns 取得結果
   */
  getObject3D(): THREE.Object3D;
}
