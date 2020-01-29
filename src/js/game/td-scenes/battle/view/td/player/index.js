// @flow

import {BatteryNumber} from "../../../../../../game-object/battery-number/battery-number";
import {RecoverBattery} from "../../../../../../game-object/recover-battery/recover-battery";
import {DamageIndicator} from "../../../../../../game-object/damage-indicator/damage-indicator";
import type {PlayerId} from "gbraver-burst-core/lib/player/player";
import {Spark} from "../../../../../../game-object/hitmark/spark/spark";
import * as THREE from "three";
import type {ArmDozerSprite} from "../../../../../../game-object/armdozer/armdozer-sprite";
import {TurnStart} from "../../../../../../game-object/turn-start/turn-start";
import {Gauge} from "../../../../../../game-object/gauge/gauge";
import {BurstIndicator} from "../../../../../../game-object/burst-indicator/burst-indicator";

/**
 * 3Dレイヤーのプレイヤー関係オブジェクト
 *
 * @type T アームドーザスプライト
 */
export type TDPlayer<T: ArmDozerSprite> = {
  playerId: PlayerId,
  sprite: T,
  gauge: Gauge,
  hitMark: {
    spark: Spark
  },
  batteryNumber: BatteryNumber,
  recoverBattery: RecoverBattery,
  damageIndicator: DamageIndicator,
  turnStart: TurnStart,
  burstIndicator: BurstIndicator,
};

/**
 * 3Dプレイヤーゲームオブジェクトをシーンに追加するヘルパー関数
 *
 * @param scene シーン
 * @param player シーンに追加するオブジェクト群
 */
export function appendTDPlayer<T: ArmDozerSprite>(scene: THREE.Scene, player: TDPlayer<T>): void {
  scene.add(player.sprite.getObject3D());
  scene.add(player.gauge.getObject3D());
  scene.add(player.hitMark.spark.getObject3D());
  scene.add(player.batteryNumber.getObject3D());
  scene.add(player.recoverBattery.getObject3D());
  scene.add(player.damageIndicator.getObject3D());
  scene.add(player.turnStart.getObject3D());
  scene.add(player.burstIndicator.getObject3D());
}

/**
 * 3Dレイヤーのプレイヤー関係オブジェクトのリソースを破棄する
 * リソース解放等を行う
 *
 * @param target リソース破棄対象
 */
export function disposeTDPlayer<T: ArmDozerSprite>(target: TDPlayer<T>): void {
  target.sprite.destructor();
  target.gauge.destructor();
  target.batteryNumber.destructor();
  target.damageIndicator.destructor();
  target.hitMark.spark.destructor();
  target.recoverBattery.destructor();
  target.turnStart.destructor();
  target.burstIndicator.destructor();
}