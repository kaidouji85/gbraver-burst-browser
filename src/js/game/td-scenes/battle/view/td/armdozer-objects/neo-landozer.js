// @flow

import type {TDArmdozerObjects} from "./armdozer-objects";
import type {PlayerId, Player} from "gbraver-burst-core";
import type {Resources} from "../../../../../../resource";
import type {ArmDozerSprite} from "../../../../../../game-object/armdozer/armdozer-sprite";
import * as THREE from "three";
import {NeoLandozer} from "../../../../../../game-object/armdozer/neo-landozer/neo-landozer";
import {EnemyNeoLandozer, PlayerNeoLandozer} from "../../../../../../game-object/armdozer/neo-landozer";
import type {GameObjectAction} from "../../../../../../game-object/action/game-object-action";
import type {Stream} from "../../../../../../stream/core";

/**
 * 3Dレイヤー ネオランドーザ 3Dレイヤー フィールド
 */
interface NeoLandozerTDField {
  /** ネオランドーザ */
  neoLandozer: NeoLandozer;
}

/**
 * 3Dレイヤー ネオランドーザ 3Dレイヤー
 */
export class NeoLandozerTD implements NeoLandozerTDField, TDArmdozerObjects {
  playerId: PlayerId;
  neoLandozer: NeoLandozer;

  /**
   * コンストラクタ
   *
   * @param playerId プレイヤーID
   * @param field フィールド
   */
  constructor(playerId: PlayerId, field: NeoLandozerTDField) {
    this.playerId = playerId;
    this.neoLandozer = field.neoLandozer;
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this.neoLandozer.destructor();
  }

  /**
   * アームドーザスプライトにダウンキャストする
   *
   * @return アームドーザスプライト
   */
  sprite(): ArmDozerSprite {
    return this.neoLandozer;
  }

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @return シーンに追加するオブジェクト
   */
  getObject3Ds(): typeof THREE.Object3D[] {
    return [
      this.neoLandozer.getObject3D()
    ];
  }
}

/**
 * プレイヤー 3Dレイヤー ネオランドーザ 3Dレイヤー
 *
 * @param resources リソース管理オブジェクト
 * @param listener イベントリスナ
 * @param state プレイヤー情報
 * @return 生成結果
 */
export function playerNeoLandozerTD(resources: Resources, listener: Stream<GameObjectAction>, state: Player): NeoLandozerTD {
  return new NeoLandozerTD(state.playerId, {
    neoLandozer: PlayerNeoLandozer(resources, listener)
  });
}

/**
 * 敵 3Dレイヤー ネオランドーザ 3Dレイヤー
 *
 * @param resources リソース管理オブジェクト
 * @param listener イベントリスナ
 * @param state プレイヤー情報
 * @return 生成結果
 */
export function enemyNeoLandozerTD(resources: Resources, listener: Stream<GameObjectAction>, state: Player): NeoLandozerTD {
  return new NeoLandozerTD(state.playerId, {
    neoLandozer: EnemyNeoLandozer(resources, listener)
  });
}