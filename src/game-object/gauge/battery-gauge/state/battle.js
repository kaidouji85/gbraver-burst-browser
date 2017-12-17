// @flow

import {BatteryGaugeState} from '../base';
import type {BatteryGaugeModel} from '../base';

/**
 * 戦闘画面での状態
 * 本状態ではHPが増減した場合、徐々に目的の値に近づいていく
 */
export class BattleState implements BatteryGaugeState {

  // TODO 詳細は後で実装する
  /** モデルを更新する */
  gameLoop(model: BatteryGaugeModel): BatteryGaugeModel {
    return Object.assign({}, model);
  }
}
