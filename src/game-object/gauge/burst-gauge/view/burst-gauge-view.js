// @flow

import type {BurstGaugeModel} from "../model/burst-gauge-model";
import * as THREE from "three";

/** バーストゲージビュー */
export interface BurstGaugeView {
  /** モデルをビューに反映する */
  gameLoop(model: BurstGaugeModel): void;
  /** シーンに追加するthree.jsオブジェクトを返す */
  getThreeJsObjectList(): THREE.Mesh[];
}