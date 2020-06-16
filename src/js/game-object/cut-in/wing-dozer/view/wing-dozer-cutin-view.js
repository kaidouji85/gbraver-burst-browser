// @flow

import * as THREE from 'three';
import type {WingDozerCutInModel} from "../model/wing-dozer-cutin-model";

/**
 * ウィングドーザ カットイン ビュー
 */
export interface WingDozerCutInView {
  /**
   * デストラクタ相当の処理
   */
  destructor(): void;

  /**
   * モデルをビューに反映させる
   *
   * @param model モデル
   */
  engage(model: WingDozerCutInModel): void;

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @return シーンに追加するオブジェクト
   */
  getObject3D(): THREE.Object3D;
}