import type { Player, PlayerId } from "gbraver-burst-core";
import { Observable } from "rxjs";
import * as THREE from "three";

import type { GameObjectAction } from "../../../../../game-object/action/game-object-action";
import type { ArmdozerSprite } from "../../../../../game-object/armdozer/armdozer-sprite";
import {
  EnemyGenesisBraver,
  PlayerGenesisBraver,
} from "../../../../../game-object/armdozer/genesis-braver";
import { GenesisBraver } from "../../../../../game-object/armdozer/genesis-braver/genesis-braver";
import type { Resources } from "../../../../../resource";
import type { TDArmdozerObjects } from "./armdozer-objects";

/** ジェネシスブレイバー 3Dレイヤー フィールド */
interface GenesisBraverTDField {
  /** スプライト */
  genesisBraver: GenesisBraver;
}

/** ジェネシスブレイバー 3Dレイヤー */
export class GenesisBraverTD
  implements GenesisBraverTDField, TDArmdozerObjects
{
  /** @override */
  playerId: PlayerId;

  /** @override */
  genesisBraver: GenesisBraver;

  /**
   * コンストラクタ
   * @param playerId プレイヤーID
   * @param field フィールド
   */
  constructor(playerId: PlayerId, field: GenesisBraverTDField) {
    this.playerId = playerId;
    this.genesisBraver = field.genesisBraver;
  }

  /** @override */
  destructor(): void {
    this.genesisBraver.destructor();
  }

  /** @override */
  sprite(): ArmdozerSprite {
    return this.genesisBraver;
  }

  /** @override */
  getObject3Ds(): THREE.Object3D[] {
    return [this.genesisBraver.getObject3D()];
  }
}

/**
 * プレイヤー ジェネシスブレイバー 3Dレイヤー
 * @param resources リソース管理オブジェクト
 * @param gameObjectAction ゲームオブジェクトアクション
 * @param state プレイヤー情報
 * @return 生成結果
 */
export function playerGenesisBraverTD(
  resources: Resources,
  gameObjectAction: Observable<GameObjectAction>,
  state: Player,
): GenesisBraverTD {
  return new GenesisBraverTD(state.playerId, {
    genesisBraver: PlayerGenesisBraver({ resources, gameObjectAction }),
  });
}

/**
 * 敵 ジェネシスブレイバー 3Dレイヤー
 * @param resources リソース管理オブジェクト
 * @param gameObjectAction ゲームオブジェクトアクション
 * @param state プレイヤー情報
 * @return 生成結果
 */
export function enemyGenesisBraverTD(
  resources: Resources,
  gameObjectAction: Observable<GameObjectAction>,
  state: Player,
): GenesisBraverTD {
  return new GenesisBraverTD(state.playerId, {
    genesisBraver: EnemyGenesisBraver({ resources, gameObjectAction }),
  });
}
