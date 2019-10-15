// @flow

import {BatteryNumber} from "../../../../../../game-object/battery-number/battery-number";
import {RecoverBattery} from "../../../../../../game-object/recover-battery/recover-battery";
import {DamageIndicator} from "../../../../../../game-object/damage-indicator/damage-indicator";
import type {PlayerId} from "gbraver-burst-core/lib/player/player";
import {Spark} from "../../../../../../game-object/hitmark/spark/spark";
import * as THREE from "three";
import type {ArmDozerSprite} from "../../../../../../game-object/armdozer/armdozer-sprite";

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
}

/**
 * 3Dプレイヤーオブジェクトのスプライトを、引数で上書きする
 * その際にスプライトのデータ型も変更する
 * 本関数はスプライトの型キャストに使用する想定である
 *
 * 例)
 * const target: TDPlayer<ArmdozerSprite> = {...}
 * const sprite = target.sprite;
 * if (sprite instanceof ShinBraver) {
 *   const cast: TDPlayer<ShinBraver> = overWriteTDSprite(target, sprite);
 * }
 *
 * @param target 上書き対象の3Dプレイヤー
 * @param sprite 上書きするスプライト
 * @return 上書き結果
 */
export function overWriteTDSprite<OLD: ArmDozerSprite, NEW: ArmDozerSprite>(target: TDPlayer<OLD>, sprite: NEW): TDPlayer<NEW> {
  const ignoreSprite: $Diff<TDPlayer<OLD>, {sprite: OLD}> = target;
  return {
    ...ignoreSprite,
    sprite: sprite
  };
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
}