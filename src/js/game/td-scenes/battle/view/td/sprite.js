// @flow

import * as THREE from 'three';
import type {PlayerId} from "gbraver-burst-core/lib/player/player";
import type {ArmDozerSprite} from "../../../../../game-object/armdozer/armdozer-sprite";
import type {Resources} from "../../../../../resource";
import type {Player} from "gbraver-burst-core";
import {ArmdozerAppearances} from "gbraver-burst-core";
import {Observable} from "rxjs";
import type {GameObjectAction} from "../../../../../action/game-object-action";
import {EnemyNeoLandozer, PlayerNeoLandozer} from "../../../../../game-object/armdozer/neo-landozer";
import {EnemyLightningDozer, PlayerLightningDozer} from "../../../../../game-object/armdozer/lightning-dozer";
import {EnemyShinBraver, PlayerShinBraver} from "../../../../../game-object/armdozer/shin-braver";

/**
 * プレイヤーのスプライト
 */
export class TDSprite {
  playerId: PlayerId;
  sprite: ArmDozerSprite;

  constructor(playerId: PlayerId, sprite: ArmDozerSprite) {
    this.playerId = playerId;
    this.sprite = sprite;
  }

  /** デストラクタ相当の処理 */
  destructor(): void {
    this.sprite.destructor();
  }

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @return シーンに追加するオブジェクト
   */
  getObject3Ds(): THREE.Object3D[] {
    return [
      this.sprite.getObject3D()
    ];
  }
}

/**
 * プレイヤースプライを生成する
 *
 * @param resources リソース管理オブジェクト
 * @param listener イベントリスナ
 * @param playerInfo プレイヤー情報
 * @return スプライト
 */
export function playerSprite(resources: Resources, state: Player, listener: Observable<GameObjectAction>): TDSprite {
  return new TDSprite(state.playerId, createPlayerSprite(resources, listener, state));
}

/**
 * 諸条件から対応するプレイヤースプライトを返す
 *
 * @param resources リソース管理オブジェクト
 * @param listener イベントリスナ
 * @param playerInfo プレイヤー情報
 * @return スプライト
 */
function createPlayerSprite(resources: Resources, listener: Observable<GameObjectAction>, playerInfo: Player): ArmDozerSprite {
  switch (playerInfo.armdozer.appearance) {
    case ArmdozerAppearances.NEO_LANDOZER:
      return PlayerNeoLandozer(resources, listener);
    case ArmdozerAppearances.LIGHTNING_DOZER:
      return PlayerLightningDozer(resources, listener);
    case ArmdozerAppearances.SHIN_BRAVER:
    default:
      return PlayerShinBraver(resources, listener);
  }
}

/**
 * 敵スプライを生成する
 *
 * @param resources リソース管理オブジェクト
 * @param listener イベントリスナ
 * @param enemyInfo プレイヤー情報
 * @return スプライト
 */
export function enemySprite(resources: Resources, state: Player, listener: Observable<GameObjectAction>): TDSprite {
  return new TDSprite(state.playerId, createEnemySprite(resources, listener, state));
}

/**
 * 諸条件から対応する敵スプライトを返す
 *
 * @param resources リソース管理オブジェクト
 * @param listener イベントリスナ
 * @param enemyInfo プレイヤー情報
 * @return スプライト
 */
function createEnemySprite(resources: Resources, listener: Observable<GameObjectAction>, enemyInfo: Player): ArmDozerSprite {
  switch (enemyInfo.armdozer.appearance) {
    case ArmdozerAppearances.NEO_LANDOZER:
      return EnemyNeoLandozer(resources, listener);
    case ArmdozerAppearances.LIGHTNING_DOZER:
      return EnemyLightningDozer(resources, listener);
    case ArmdozerAppearances.SHIN_BRAVER:
    default:
      return EnemyShinBraver(resources, listener);
  }
}