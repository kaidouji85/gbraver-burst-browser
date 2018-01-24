import * as THREE from "three";
import type {HpGaugeModel} from "../model/hp-gauge-model";

/** HPゲージのView */
export interface HpGaugeView {
  /** モデルの内容をViewに反映する */
  gameLoop(model: HpGaugeModel): void;

  /** シーンに追加するthree.jsオブジェクトを返す */
  getThreeJsObjectList(): THREE.Mesh[];
}