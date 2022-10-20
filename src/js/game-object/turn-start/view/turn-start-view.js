// @flow

import * as THREE from "three";
import type { PreRender } from "../../../game-loop/pre-render";
import type { TurnStartModel } from "../model/turn-start-model";

/**
 * ターンスタート ビュー
 */
export interface TurnStartView {
  /** デストラクタ相当の処理 */
  destructor(): void;

  /**
   * モデルをビューに反映させる
   *
   * @param model モデル
   * @param preRender プリレンダー情報
   */
  engage(model: TurnStartModel, preRender: PreRender): void;

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @return シーンに追加するオブジェクト
   */
  getObject3D(): typeof THREE.Object3D;
}
