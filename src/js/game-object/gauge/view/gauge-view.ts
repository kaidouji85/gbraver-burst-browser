import * as THREE from "three";

import { PreRender } from "../../../game-loop/pre-render";
import { GaugeModel } from "../model/gauge-model";

/** ゲージのビュー */
export interface GaugeView {
  /**
   * デストラクタ相当の処理
   */
  destructor(): void;

  /**
   * モデルをビューに反映させる
   * @param model モデル
   * @param preRender プリレンダーアクション
   */
  engage(model: GaugeModel, preRender: PreRender): void;

  /**
   * ビューで使われているthree.jsオブジェクトを取得する
   * @returns 取得結果
   */
  getObject3D(): THREE.Object3D;

  /**
   * ビュー配下にオブジェクトを追加する
   * @param object 追加対象のオブジェクト
   */
  addObject3D(object: THREE.Object3D): void;
}
