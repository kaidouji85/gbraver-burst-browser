// @flow

import * as THREE from 'three';
import type {RaitoModel} from "../model/raito-model";
import type {PreRender} from "../../../../game-loop/pre-render";

/**
 * ライト ビュー
 */
export interface RaitoView {
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
  engage(model: RaitoModel, preRender: PreRender): void;

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @return シーンに追加するオブジェクト
   */
  getObject3D(): typeof THREE.Object3D;
}