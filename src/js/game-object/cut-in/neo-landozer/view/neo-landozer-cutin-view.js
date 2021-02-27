// @flow

import * as THREE from 'three';
import type {NeoLandozerCutInModel} from "../model/neo-landozer-cutin-model";
import type {PreRender} from "../../../../game-loop/pre-render";

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
   * @return シーンに追加するオブジェクト
   */
  getObject3D(): typeof THREE.Object3D;
}