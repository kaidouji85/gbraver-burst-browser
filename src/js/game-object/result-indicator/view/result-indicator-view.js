// @flow
import * as THREE from "three";
import type {ResultIndicatorModel} from "../model/result-indicator-model";

/** リザルト ビュー */
export interface ResultIndicatorView {
  /**
   * デストラクタ相当の処理
   */
  destructor(): void;

  /**
   * モデルをビューに反映させる
   *
   * @param model モデル
   */
  engage(model: ResultIndicatorModel): void;

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @return 取得結果
   */
  getObject3D(): typeof THREE.Object3D;
}