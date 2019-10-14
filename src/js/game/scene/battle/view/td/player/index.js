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
}

/**
 * 3Dプレイヤーゲームオブジェクトをシーンに追加するヘルパー関数
 *
 * @param scene シーン
 * @param player シーンに追加するオブジェクト群
 */
export function appendTDPlayer(scene: THREE.Scene, player: TDPlayer<ArmDozerSprite>): void {
  scene.add(player.sprite.getObject3D());
  scene.add(player.hitMark.spark.getObject3D());
  scene.add(player.batteryNumber.getObject3D());
  scene.add(player.recoverBattery.getObject3D());
  scene.add(player.damageIndicator.getObject3D());
}

/**
 * 3Dレイヤーのプレイヤー関係オブジェクトのデストラクタ相当処理
 * リソース解放等を行う
 *
 * @param target リソース解放を行う対象
 */
export function destructorTDPlayer(target: TDPlayer<ArmDozerSprite>): void {
  target.sprite.destructor();
  target.batteryNumber.destructor();
  target.damageIndicator.destructor();
  target.hitMark.spark.destructor();
  target.recoverBattery.destructor();
}