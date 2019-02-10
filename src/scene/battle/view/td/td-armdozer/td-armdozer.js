// @flow
import {Gauge} from "../../../../../game-object/gauge/gauge";
import {BatteryNumber} from "../../../../../game-object/battery-number/battery-number";
import {RecoverBattery} from "../../../../../game-object/recover-battery/recover-battery";
import {DamageIndicator} from "../../../../../game-object/damage-indicator/damage-indicator";
import {Observable} from "rxjs";
import type {PlayerId} from "gbraver-burst-core/lib/player/player";
import type {ArmDozerSprite} from "../../../../../game-object/armdozer/armdozer-sprite";
import {Spark} from "../../../../../game-object/hitmark/spark/spark";


/**
 * 3Dレイヤーでアームドーザ関連オブジェクトを集めたもの
 *
 * @type T アームドーザスプライト
 */
export type TDArmdozer<T> = {
  playerId: PlayerId,
  sprite: T,
  hitMark: {
    spark: Spark
  },
  gauge: Gauge,
  batteryNumber: BatteryNumber,
  recoverBattery: RecoverBattery,
  damageIndicator: DamageIndicator,
};
