// @flow

import {BatteryNumber} from "../../../../../../../../game-object/battery-number/battery-number";
import {RecoverBattery} from "../../../../../../../../game-object/recover-battery/recover-battery";
import {DamageIndicator} from "../../../../../../../../game-object/damage-indicator/damage-indicator";
import type {PlayerId} from "gbraver-burst-core/lib/player/player";
import {Spark} from "../../../../../../../../game-object/hitmark/spark/spark";
import * as THREE from "three";
import type {ArmDozerSprite} from "../../../../../../../../game-object/armdozer/armdozer-sprite";
import {TurnStart} from "../../../../../../../../game-object/turn-start/turn-start";

/**
 * 3Dレイヤーのプレイヤー関係オブジェクト
 *
 * @type T アームドーザスプライト
 */
export type TDPlayer<T: ArmDozerSprite> = {
  playerId: PlayerId,
  sprite: T,
  hitMark: {
    spark: Spark
  },
  batteryNumber: BatteryNumber,
  recoverBattery: RecoverBattery,
  damageIndicator: DamageIndicator,
  attackerIndicator: TurnStart,
};

/**
 * 3Dプレイヤーゲームオブジェクトをシーンに追加するヘルパー関数
 *
 * @param scene シーン
 * @param player シーンに追加するオブジェクト群
 */
export function appendTDPlayer<T: ArmDozerSprite>(scene: THREE.Scene, player: TDPlayer<T>): void {
  scene.add(player.sprite.getObject3D());
  scene.add(player.hitMark.spark.getObject3D());
  scene.add(player.batteryNumber.getObject3D());
  scene.add(player.recoverBattery.getObject3D());
  scene.add(player.damageIndicator.getObject3D());
  scene.add(player.attackerIndicator.getObject3D());
}

/**
 * 3Dレイヤーのプレイヤー関係オブジェクトのリソースを破棄する
 * リソース解放等を行う
 *
 * @param target リソース破棄対象
 */
export function disposeTDPlayer<T: ArmDozerSprite>(target: TDPlayer<T>): void {
  target.sprite.destructor();
  target.batteryNumber.destructor();
  target.damageIndicator.destructor();
  target.hitMark.spark.destructor();
  target.recoverBattery.destructor();
  target.attackerIndicator.destructor();
}