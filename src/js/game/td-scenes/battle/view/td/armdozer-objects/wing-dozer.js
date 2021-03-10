// @flow

import type {TDArmdozerObjects} from "./armdozer-objects";
import type {PlayerId, Player} from "gbraver-burst-core";
import type {Resources} from "../../../../../../resource";
import type {ArmDozerSprite} from "../../../../../../game-object/armdozer/armdozer-sprite";
import * as THREE from "three";
import {WingDozer} from "../../../../../../game-object/armdozer/wing-dozer/wing-dozer";
import {EnemyWingDozer, PlayerWingDozer} from "../../../../../../game-object/armdozer/wing-dozer";
import type {GameObjectAction} from "../../../../../../game-object/action/game-object-action";
import type {Stream} from "../../../../../../stream/core";

/**
 * 3Dレイヤー ウィングドーザ 3Dレイヤー フィールド
 */
interface WingDozerTDField {
  /** ウィングドーザ */
  wingDozer: WingDozer;
}

/**
 * 3Dレイヤー ウィングドーザ 3Dレイヤー
 */
export class WingDozerTD implements WingDozerTDField, TDArmdozerObjects {
  playerId: PlayerId;
  wingDozer: WingDozer;

  /**
   * コンストラクタ
   *
   * @param playerId プレイヤーID
   * @param field フィールド
   */
  constructor(playerId: PlayerId, field: WingDozerTDField) {
    this.playerId = playerId;
    this.wingDozer = field.wingDozer;
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this.wingDozer.destructor();
  }

  /**
   * アームドーザスプライトにダウンキャストする
   *
   * @return アームドーザスプライト
   */
  sprite(): ArmDozerSprite {
    return this.wingDozer;
  }

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @return シーンに追加するオブジェクト
   */
  getObject3Ds(): typeof THREE.Object3D[] {
    return [
      this.wingDozer.getObject3D()
    ];
  }
}

/**
 * プレイヤー 3Dレイヤー ウィングドーザ 3Dレイヤー
 *
 * @param resources リソース管理オブジェクト
 * @param listener イベントリスナ
 * @param state プレイヤー情報
 * @return 生成結果
 */
export function playerWingDozerTD(resources: Resources, listener: Stream<GameObjectAction>, state: Player): WingDozerTD {
  return new WingDozerTD(state.playerId, {
    wingDozer: PlayerWingDozer(resources, listener)
  });
}

/**
 * 敵 3Dレイヤー ウィングドーザ 3Dレイヤー
 *
 * @param resources リソース管理オブジェクト
 * @param listener イベントリスナ
 * @param state プレイヤー情報
 * @return 生成結果
 */
export function enemyWingDozerTD(resources: Resources, listener: Stream<GameObjectAction>, state: Player): WingDozerTD {
  return new WingDozerTD(state.playerId, {
    wingDozer: EnemyWingDozer(resources, listener)
  });
}