// @flow

import {BatteryNumber} from "../../../../../../game-object/battery-number/battery-number";
import {RecoverBattery} from "../../../../../../game-object/recover-battery/recover-battery";
import {DamageIndicator} from "../../../../../../game-object/damage-indicator/damage-indicator";
import type {PlayerId} from "gbraver-burst-core/lib/player/player";
import {Spark} from "../../../../../../game-object/hitmark/spark/spark";
import * as THREE from "three";
import type {ArmDozerSprite} from "../../../../../../game-object/armdozer/armdozer-sprite";

/** ヒットマークをまとめたもの */
type HitMark = {
  spark: Spark
};

/** コンストラクタのパラメータ */
type Param<T: ArmDozerSprite> = {
  playerId: PlayerId,
  sprite: T,
  hitMark: HitMark,
  batteryNumber: BatteryNumber,
  recoverBattery: RecoverBattery,
  damageIndicator: DamageIndicator,
};

/**
 * 3Dレイヤーのプレイヤー関係オブジェクト
 *
 * @type T アームドーザスプライト
 */
export class TDPlayer<T: ArmDozerSprite> {
  playerId: PlayerId;
  sprite: T;
  hitMark: HitMark;
  batteryNumber: BatteryNumber;
  recoverBattery: RecoverBattery;
  damageIndicator: DamageIndicator;

  constructor(param: Param<T>) {
    this.playerId = param.playerId;
    this.sprite = param.sprite;
    this.hitMark = param.hitMark;
    this.batteryNumber = param.batteryNumber;
    this.recoverBattery = param.recoverBattery;
    this.damageIndicator = param.damageIndicator;
  }

  /** デストラクタ相当の処理 */
  destructor(): void {
    this.sprite.destructor();
    this.batteryNumber.destructor();
    this.damageIndicator.destructor();
    this.hitMark.spark.destructor();
    this.recoverBattery.destructor();
  }

  /**
   * スプライトを上書きする
   * 本メソッドはスプライトをキャストした結果を上書きすることを想定している
   * 例)
   *
   * const player: TDPlayer<ArmdozerSprite> = ...;
   * const sprite = player.sprite;
   * if (sprite instanceof ShinBraver) {
   *   const shinBraver: TDPlayer<ShinBraver> = player.overWriteSprite(sprite);
   * }
   *
   * @param sprite 上書き内容
   * @return 上書き結果
   */
  overWriteSprite<NEW: ArmDozerSprite>(sprite: NEW): TDPlayer<NEW> {
    const ignoreSprite: $Diff<TDPlayer<T>, {sprite: T}> = this;
    return new TDPlayer<NEW>({
      ...ignoreSprite,
      sprite: sprite
    });
  }

  /**
   * 3Dレイヤープレイヤーをシーンに追加する
   *
   * @param scene 追加対象のシーン
   */
  appendScene(scene: THREE.Scene): void {
    scene.add(this.sprite.getObject3D());
    scene.add(this.hitMark.spark.getObject3D());
    scene.add(this.batteryNumber.getObject3D());
    scene.add(this.recoverBattery.getObject3D());
    scene.add(this.damageIndicator.getObject3D());
  }
}