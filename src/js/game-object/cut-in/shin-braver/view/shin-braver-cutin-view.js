// @flow

import * as THREE from 'three';
import type {ShinBraverCutInModel} from "../model/shin-braver-cutin-model";
import type {PreRender} from "../../../../action/game-loop/pre-render";

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
   * @return シーンに追加するオブジェクト
   */
  getObject3D(): typeof THREE.Object3D;
}