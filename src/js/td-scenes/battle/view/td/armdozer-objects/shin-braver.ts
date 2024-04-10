import type { Player, PlayerId } from "gbraver-burst-core";
import { Observable } from "rxjs";
import * as THREE from "three";

import type { GameObjectAction } from "../../../../../game-object/action/game-object-action";
import type { ArmdozerSprite } from "../../../../../game-object/armdozer/armdozer-sprite";
import {
  EnemyShinBraver,
  PlayerShinBraver,
} from "../../../../../game-object/armdozer/shin-braver";
import { ShinBraver } from "../../../../../game-object/armdozer/shin-braver/shin-braver";
import type { Resources } from "../../../../../resource";
import type { TDArmdozerObjects } from "./armdozer-objects";

/**3Dレイヤー シンブレイバー 3Dレイヤー フィールド */
interface ShinBraverTDField {
  /** シンブレイバー */
  shinBraver: ShinBraver;
}

/** シンブレイバー 3Dレイヤー */
export class ShinBraverTD implements ShinBraverTDField, TDArmdozerObjects {
  /** @override */
  playerId: PlayerId;

  /** @override */
  shinBraver: ShinBraver;

  /**
   * コンストラクタ
   * @param playerId プレイヤーID
   * @param field フィールド
   */
  constructor(playerId: PlayerId, field: ShinBraverTDField) {
    this.playerId = playerId;
    this.shinBraver = field.shinBraver;
  }

  /** @override */
  destructor(): void {
    this.shinBraver.destructor();
  }

  /** @override */
  sprite(): ArmdozerSprite {
    return this.shinBraver;
  }

  /** @override */
  getObject3Ds(): THREE.Object3D[] {
    return [this.shinBraver.getObject3D()];
  }
}

/**
 * プレイヤー シンブレイバー 3Dレイヤー
 * @param resources リソース管理オブジェクト
 * @param gameObjectAction ゲームオブジェクトアクション
 * @param state プレイヤー情報
 * @return 生成結果
 */
export function playerShinBraverTD(
  resources: Resources,
  gameObjectAction: Observable<GameObjectAction>,
  state: Player,
): ShinBraverTD {
  return new ShinBraverTD(state.playerId, {
    shinBraver: PlayerShinBraver({ resources, gameObjectAction }),
  });
}

/**
 * 敵 シンブレイバー 3Dレイヤー
 * @param resources リソース管理オブジェクト
 * @param gameObjectAction ゲームオブジェクトアクション
 * @param state プレイヤー情報
 * @return 生成結果
 */
export function enemyShinBraverTD(
  resources: Resources,
  gameObjectAction: Observable<GameObjectAction>,
  state: Player,
): ShinBraverTD {
  return new ShinBraverTD(state.playerId, {
    shinBraver: EnemyShinBraver({ resources, gameObjectAction }),
  });
}
