// @flow

import type {BatteryGaugeModel} from "../model/battery-gauge-model";
import * as THREE from "three";

/** バッテリーゲージのビュー */
export interface BatteryGaugeView {
  /** モデルの内容をViewに反映する */
  gameLoop(model: BatteryGaugeModel): void;

  /** シーンに追加するthree.jsオブジェクトを返す */
  getThreeJsObjectList(): THREE.Mesh[];
}