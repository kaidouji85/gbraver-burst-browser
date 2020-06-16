// @flow

import * as THREE from 'three';
import type {WingDozerCutInModel} from "../model/wing-dozer-cutin-model";
import type {PreRender} from "../../../../action/game-loop/pre-render";

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
   * @param preRender プリレンダー情報
   */
  engage(model: WingDozerCutInModel, preRender: PreRender): void;

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @return シーンに追加するオブジェクト
   */
  getObject3D(): THREE.Object3D;
}