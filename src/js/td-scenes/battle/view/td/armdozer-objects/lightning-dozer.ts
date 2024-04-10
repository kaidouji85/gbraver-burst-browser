import type { Player, PlayerId } from "gbraver-burst-core";
import { Observable } from "rxjs";
import * as THREE from "three";

import type { GameObjectAction } from "../../../../../game-object/action/game-object-action";
import type { ArmdozerSprite } from "../../../../../game-object/armdozer/armdozer-sprite";
import {
  EnemyLightningDozer,
  PlayerLightningDozer,
} from "../../../../../game-object/armdozer/lightning-dozer";
import { LightningDozer } from "../../../../../game-object/armdozer/lightning-dozer/lightning-dozer";
import { LightningBarrierGameEffect } from "../../../../../game-object/barrier/lightning/lightning-barrier";
import type { Resources } from "../../../../../resource";
import type { TDArmdozerObjects } from "./armdozer-objects";

/** ライトニングドーザ 3Dレイヤー フィールド */
interface LightningDozerTDField {
  /** ライトニングドーザ */
  lightningDozer: LightningDozer;

  /** 電撃バリア */
  lightningBarrier: LightningBarrierGameEffect;
}

/** ライトニングドーザ 3Dレイヤー */
export class LightningDozerTD
  implements TDArmdozerObjects, LightningDozerTDField
{
  /** @override */
  playerId: PlayerId;

  /** @override */
  lightningDozer: LightningDozer;

  /** @override */
  lightningBarrier: LightningBarrierGameEffect;

  /**
   * コンストラクタ
   * @param playerId プレイヤーID
   * @param filed フィールド
   */
  constructor(playerId: PlayerId, filed: LightningDozerTDField) {
    this.playerId = playerId;
    this.lightningDozer = filed.lightningDozer;
    this.lightningBarrier = filed.lightningBarrier;
    this.lightningDozer.addObject3D(this.lightningBarrier.getObject3D());
  }

  /** @override */
  destructor(): void {
    this.lightningDozer.destructor();
    this.lightningBarrier.destructor();
  }

  /** @override */
  sprite(): ArmdozerSprite {
    return this.lightningDozer;
  }

  /** @override */
  getObject3Ds(): THREE.Object3D[] {
    return [this.lightningDozer.getObject3D()];
  }
}

/**
 * プレイヤー 3Dレイヤー ライトニングドーザ固有オブジェクト
 * @param resources リソース管理オブジェクト
 * @param gameObjectAction ゲームオブジェクトアクション
 * @param state プレイヤー情報
 * @return 生成結果
 */
export function playerLightningDozerTD(
  resources: Resources,
  gameObjectAction: Observable<GameObjectAction>,
  state: Player,
): LightningDozerTD {
  return new LightningDozerTD(state.playerId, {
    lightningDozer: PlayerLightningDozer({ resources, gameObjectAction }),
    lightningBarrier: new LightningBarrierGameEffect(
      resources,
      gameObjectAction,
    ),
  });
}

/**
 * 敵 3Dレイヤー ライトニングドーザ固有オブジェクト
 * @param resources リソース管理オブジェクト
 * @param gameObjectAction ゲームオブジェクトアクション
 * @param state プレイヤー情報
 * @return 生成結果
 */
export function enemyLightningDozerTD(
  resources: Resources,
  gameObjectAction: Observable<GameObjectAction>,
  state: Player,
): LightningDozerTD {
  return new LightningDozerTD(state.playerId, {
    lightningDozer: EnemyLightningDozer({ resources, gameObjectAction }),
    lightningBarrier: new LightningBarrierGameEffect(
      resources,
      gameObjectAction,
    ),
  });
}
