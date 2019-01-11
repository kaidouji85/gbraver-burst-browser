// @flow
import {Gauge} from "../../../../../game-object/gauge/gauge";
import {BatteryNumber} from "../../../../../game-object/battery-number/battery-number";
import {RecoverBattery} from "../../../../../game-object/recover-battery/recover-battery";
import {DamageIndicator} from "../../../../../game-object/damage-indicator/damage-indicator";
import {Observable} from "rxjs";
import type {PlayerId} from "gbraver-burst-core/lib/player/player";


/**
 * アームドーザに関連するオブジェクトを集めたもの
 *
 * @type T アームドーザスプライト
 */
export type ArmdozerObjects<T> = {
  playerId: PlayerId,
  sprite: T;
  gauge: Gauge;
  batteryNumber: BatteryNumber;
  recoverBattery: RecoverBattery;
  damageIndicator: DamageIndicator;
};
