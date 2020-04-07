// @flow

import type {GaugeModel} from "./gauge-model";

/**
 * 3Dレイヤーのオブジェクトをトラッキングする
 *
 * @param model モデル
 * @param x x座標
 * @return 更新結果
 */
export function tracking(model: GaugeModel, x: number): GaugeModel {
  return {
    ...model,
    tracking: {
      x: x
    }
  };
}