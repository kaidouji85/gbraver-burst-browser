// @flow

import type {GaugeModel} from "../model/gauge-model";
import * as THREE from "three";
import type {PreRender} from "../../../action/game-loop/pre-render";

/** ゲージのビュー */
export interface GaugeView {
  /** デストラクタ */
  destructor(): void;
  
  /**
   * モデルをビューに反映させる
   *
   * @param model モデル
   * @param preRender プリレンダーアクション
   */
  engage(model: GaugeModel, preRender: PreRender): void;

  /**
   * ビューで使われているthree.jsオブジェクトを取得する
   *
   * @return 取得結果
   */
  getObject3D(): typeof THREE.Object3D;
}