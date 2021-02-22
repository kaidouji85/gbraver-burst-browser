// @flow

import * as THREE from 'three';
import type {GaiModel} from "../model/gai-model";
import type {PreRender} from "../../../../game-loop/pre-render";

/**
 * ガイ ビュー
 */
export interface GaiView {
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
  engage(model: GaiModel, preRender: PreRender): void;

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @return シーンに追加するオブジェクト
   */
  getObject3D(): typeof THREE.Object3D;
}