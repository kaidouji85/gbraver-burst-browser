import * as THREE from "three";

import type { PreRender } from "../../../../game-loop/pre-render";
import type { ShinBraverCutInModel } from "../model/shin-braver-cutin-model";

/**
 * シンブレイバーカットインのビュー
 */
export interface ShinBraverCutInView {
  /**
   * デストラクタ相当の処理
   */
  destructor(): void;

  /**
   * モデルをビューに反映させる
   * 本メソッドはプリレンダー時に呼ばれることを想定している
   *
   * @param model モデル
   * @param preRender プリレンダーのアクション
   */
  engage(model: ShinBraverCutInModel, preRender: PreRender): void;

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @returns シーンに追加するオブジェクト
   */
  getObject3D(): THREE.Object3D;
}
