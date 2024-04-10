import type { Player, PlayerId } from "gbraver-burst-core";
import { Observable } from "rxjs";
import * as THREE from "three";

import type { GameObjectAction } from "../../../../../game-object/action/game-object-action";
import type { ArmdozerSprite } from "../../../../../game-object/armdozer/armdozer-sprite";
import {
  EnemyNeoLandozer,
  PlayerNeoLandozer,
} from "../../../../../game-object/armdozer/neo-landozer";
import { NeoLandozer } from "../../../../../game-object/armdozer/neo-landozer/neo-landozer";
import type { Resources } from "../../../../../resource";
import type { TDArmdozerObjects } from "./armdozer-objects";

/** ネオランドーザ 3Dレイヤー フィールド */
interface NeoLandozerTDField {
  /** ネオランドーザ */
  neoLandozer: NeoLandozer;
}

/** ネオランドーザ 3Dレイヤー */
export class NeoLandozerTD implements NeoLandozerTDField, TDArmdozerObjects {
  /** @override */
  playerId: PlayerId;

  /** @override */
  neoLandozer: NeoLandozer;

  /**
   * コンストラクタ
   * @param playerId プレイヤーID
   * @param field フィールド
   */
  constructor(playerId: PlayerId, field: NeoLandozerTDField) {
    this.playerId = playerId;
    this.neoLandozer = field.neoLandozer;
  }

  /** @override */
  destructor(): void {
    this.neoLandozer.destructor();
  }

  /** @override */
  sprite(): ArmdozerSprite {
    return this.neoLandozer;
  }

  /** @override */
  getObject3Ds(): THREE.Object3D[] {
    return [this.neoLandozer.getObject3D()];
  }
}

/**
 * プレイヤー 3Dレイヤー ネオランドーザ 3Dレイヤー
 * @param resources リソース管理オブジェクト
 * @param gameObjectAction ゲームオブジェクトアクション
 * @param state プレイヤー情報
 * @return 生成結果
 */
export function playerNeoLandozerTD(
  resources: Resources,
  gameObjectAction: Observable<GameObjectAction>,
  state: Player,
): NeoLandozerTD {
  return new NeoLandozerTD(state.playerId, {
    neoLandozer: PlayerNeoLandozer({ resources, gameObjectAction }),
  });
}

/**
 * 敵 3Dレイヤー ネオランドーザ 3Dレイヤー
 * @param resources リソース管理オブジェクト
 * @param gameObjectAction ゲームオブジェクトアクション
 * @param state プレイヤー情報
 * @return 生成結果
 */
export function enemyNeoLandozerTD(
  resources: Resources,
  gameObjectAction: Observable<GameObjectAction>,
  state: Player,
): NeoLandozerTD {
  return new NeoLandozerTD(state.playerId, {
    neoLandozer: EnemyNeoLandozer({ resources, gameObjectAction }),
  });
}
