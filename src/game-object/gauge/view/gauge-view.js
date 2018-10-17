// @flow

import type {GaugeModel} from "../model/gauge-model";
import * as THREE from "three";

/** ゲージのビュー */
export interface GaugeView {
  /** モデルをビューに反映させる */
  engage(model: GaugeModel): void;

  /** ビューで使われているthree.jsオブジェクトを取得する */
  getObject3D(): THREE.Object3D;
}