import type { Player, PlayerId } from "gbraver-burst-core";
import { Observable } from "rxjs";
import * as THREE from "three";

import type { GameObjectAction } from "../../../../../game-object/action/game-object-action";
import type { ArmdozerSprite } from "../../../../../game-object/armdozer/armdozer-sprite";
import {
  EnemyWingDozer,
  PlayerWingDozer,
} from "../../../../../game-object/armdozer/wing-dozer";
import { WingDozer } from "../../../../../game-object/armdozer/wing-dozer/wing-dozer";
import type { Resources } from "../../../../../resource";
import type { TDArmdozerObjects } from "./armdozer-objects";

/** ウィングドーザ 3Dレイヤー フィールド */
interface WingDozerTDField {
  /** ウィングドーザ */
  wingDozer: WingDozer;
}

/** ウィングドーザ 3Dレイヤー */
export class WingDozerTD implements WingDozerTDField, TDArmdozerObjects {
  /** @override */
  playerId: PlayerId;

  /** @override */
  wingDozer: WingDozer;

  /**
   * コンストラクタ
   * @param playerId プレイヤーID
   * @param field フィールド
   */
  constructor(playerId: PlayerId, field: WingDozerTDField) {
    this.playerId = playerId;
    this.wingDozer = field.wingDozer;
  }

  /** @override */
  destructor(): void {
    this.wingDozer.destructor();
  }

  /** @override */
  sprite(): ArmdozerSprite {
    return this.wingDozer;
  }

  /** @override */
  getObject3Ds(): THREE.Object3D[] {
    return [this.wingDozer.getObject3D()];
  }
}

/**
 * プレイヤー 3Dレイヤー ウィングドーザ 3Dレイヤー
 * @param resources リソース管理オブジェクト
 * @param gameObjectAction ゲームオブジェクトアクション
 * @param state プレイヤー情報
 * @return 生成結果
 */
export function playerWingDozerTD(
  resources: Resources,
  gameObjectAction: Observable<GameObjectAction>,
  state: Player,
): WingDozerTD {
  return new WingDozerTD(state.playerId, {
    wingDozer: PlayerWingDozer({ resources, gameObjectAction }),
  });
}

/**
 * 敵 3Dレイヤー ウィングドーザ 3Dレイヤー
 * @param resources リソース管理オブジェクト
 * @param gameObjectAction ゲームオブジェクトアクション
 * @param state プレイヤー情報
 * @return 生成結果
 */
export function enemyWingDozerTD(
  resources: Resources,
  gameObjectAction: Observable<GameObjectAction>,
  state: Player,
): WingDozerTD {
  return new WingDozerTD(state.playerId, {
    wingDozer: EnemyWingDozer({ resources, gameObjectAction }),
  });
}
