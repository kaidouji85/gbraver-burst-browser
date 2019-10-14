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
  
  // TODO 削除する
  /**
   * スプライトを指定したクラスでキャストする
   * 本メソッドで生成したクラスは、呼び出し元クラスと同じリソースである
   *
   * @param castClass キャストするクラス
   * @return キャスト結果、キャストできない場合はnullを返す
   */
  cast<NEW: ArmDozerSprite>(castClass: Class<NEW>): ?TDPlayer<NEW> {
    if (this.sprite instanceof  castClass) {
      const ignoreSprite: $Diff<TDPlayer<T>, {sprite: T}> = this;
      return new TDPlayer<NEW>({
        ...ignoreSprite,
        sprite: this.sprite
      });
    }

    return null;
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