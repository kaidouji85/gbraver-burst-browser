// @flow

import type {Player, PlayerId} from "gbraver-burst-core";
import type {Resources} from "../../../../../../resource";
import {LightningBarrierGameEffect} from "../../../../../../game-object/barrier/lightning/lightning-barrier";
import * as THREE from "three";
import type {TDArmdozerObjects} from "./armdozer-objects";
import {LightningDozer} from "../../../../../../game-object/armdozer/lightning-dozer/lightning-dozer";
import {EnemyLightningDozer, PlayerLightningDozer} from "../../../../../../game-object/armdozer/lightning-dozer";
import type {ArmDozerSprite} from "../../../../../../game-object/armdozer/armdozer-sprite";
import type {GameObjectAction} from "../../../../../../game-object/action/game-object-action";
import type {Stream} from "../../../../../../stream/core";

/**
 * 3Dレイヤー ライトニングドーザ 固有オブジェクト フィールド
 */
interface LightningDozerTDField {
  /** ライトニングドーザ */
  lightningDozer: LightningDozer;

  /** 電撃バリア */
  lightningBarrier: LightningBarrierGameEffect;
}

/**
 * 3Dレイヤー ライトニングドーザ 固有オブジェクト 実装
 */
export class LightningDozerTD implements TDArmdozerObjects, LightningDozerTDField {
  playerId: PlayerId;
  lightningDozer: LightningDozer;
  lightningBarrier: LightningBarrierGameEffect;

  /**
   * コンストラクタ
   *
   * @param playerId プレイヤーID
   * @param filed フィールド
   */
  constructor(playerId: PlayerId, filed: LightningDozerTDField) {
    this.playerId = playerId;

    this.lightningDozer = filed.lightningDozer;

    this.lightningBarrier = filed.lightningBarrier;
    this.lightningDozer.addObject3D(this.lightningBarrier.getObject3D());
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this.lightningDozer.destructor();
    this.lightningBarrier.destructor();
  }

  /**
   * アームドーザスプライトにダウンキャストする
   *
   * @return アームドーザスプライト
   */
  sprite(): ArmDozerSprite {
    return this.lightningDozer;
  }

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @return シーンに追加するオブジェクト
   */
  getObject3Ds(): typeof THREE.Object3D[] {
    return [
      this.lightningDozer.getObject3D()
    ];
  }
}

/**
 * プレイヤー 3Dレイヤー ライトニングドーザ固有オブジェクト
 *
 * @param resources リソース管理オブジェクト
 * @param gameObjectAction ゲームオブジェクトアクション
 * @param state プレイヤー情報
 * @return 生成結果
 */
export function playerLightningDozerTD(resources: Resources, gameObjectAction: Stream<GameObjectAction>, state: Player): LightningDozerTD {
  return new LightningDozerTD(state.playerId, {
    lightningDozer: PlayerLightningDozer(resources, gameObjectAction),
    lightningBarrier: new LightningBarrierGameEffect(resources, gameObjectAction)
  });
}

/**
 * 敵 3Dレイヤー ライトニングドーザ固有オブジェクト
 *
 * @param resources リソース管理オブジェクト
 * @param gameObjectAction ゲームオブジェクトアクション
 * @param state プレイヤー情報
 * @return 生成結果
 */
export function enemyLightningDozerTD(resources: Resources, gameObjectAction: Stream<GameObjectAction>, state: Player): LightningDozerTD {
  return new LightningDozerTD(state.playerId, {
    lightningDozer: EnemyLightningDozer(resources, gameObjectAction),
    lightningBarrier: new LightningBarrierGameEffect(resources, gameObjectAction)
  });
}
