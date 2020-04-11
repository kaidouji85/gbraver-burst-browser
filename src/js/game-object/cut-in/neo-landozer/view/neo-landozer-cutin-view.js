// @flow

import * as THREE from 'three';
import type {NeoLandozerCutInModel} from "../model/neo-landozer-cutin-model";

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
   */
  engage(model: NeoLandozerCutInModel): void;

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @return シーンに追加するオブジェクト
   */
  getObject3D(): THREE.Object3D;
}