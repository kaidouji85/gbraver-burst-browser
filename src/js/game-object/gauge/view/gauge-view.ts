import * as THREE from "three";

import type { PreRender } from "../../../game-loop/pre-render";
import type { GaugeModel } from "../model/gauge-model";

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
   * @returns 取得結果
   */
  getObject3D(): THREE.Object3D;
}
