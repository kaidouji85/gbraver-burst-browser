// @flow

import type {GaugeModel} from "../model/gauge-model";
import * as THREE from "three";
import type {PreRender} from "../../../action/game-loop/pre-render";

/** ゲージのビュー */
export interface GaugeView {
  /** デストラクタ */
  destructor(): void;
  
  /** モデルをビューに反映させる */
  engage(model: GaugeModel): void;

  /** プリレンダー */
  preRender(action: PreRender): void;

  /** ビューで使われているthree.jsオブジェクトを取得する */
  getObject3D(): THREE.Object3D;
}