// @flow

import * as THREE from 'three';
import type {TsubasaModel} from "../model/tsubasa-model";
import type {PreRender} from "../../../../game-loop/pre-render";

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
   * @return シーンに追加するオブジェクト
   */
  getObject3D(): typeof THREE.Object3D;
}