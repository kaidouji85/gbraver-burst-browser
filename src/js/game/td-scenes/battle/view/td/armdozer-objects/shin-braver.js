// @flow

import type {Player, PlayerId} from "gbraver-burst-core";
import * as THREE from "three";
import type {GameObjectAction} from "../../../../../../game-object/action/game-object-action";
import type {ArmDozerSprite} from "../../../../../../game-object/armdozer/armdozer-sprite";
import {EnemyShinBraver, PlayerShinBraver} from "../../../../../../game-object/armdozer/shin-braver";
import {ShinBraver} from "../../../../../../game-object/armdozer/shin-braver/shin-braver";
import type {Resources} from "../../../../../../resource";
import type {Stream} from "../../../../../../stream/stream";
import type {TDArmdozerObjects} from "./armdozer-objects";

/**
 * 3Dレイヤー シンブレイバー 3Dレイヤー フィールド
 */
interface ShinBraverTDField {
  /** シンブレイバー */
  shinBraver: ShinBraver;
}

/**
 * 3Dレイヤー シンブレイバー 3Dレイヤー
 */
export class ShinBraverTD implements ShinBraverTDField, TDArmdozerObjects {
  playerId: PlayerId;
  shinBraver: ShinBraver;

  /**
   * コンストラクタ
   *
   * @param playerId プレイヤーID
   * @param field フィールド
   */
  constructor(playerId: PlayerId, field: ShinBraverTDField) {
    this.playerId = playerId;
    this.shinBraver = field.shinBraver;
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this.shinBraver.destructor();
  }

  /**
   * アームドーザスプライトにダウンキャストする
   *
   * @return アームドーザスプライト
   */
  sprite(): ArmDozerSprite {
    return this.shinBraver;
  }

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @return シーンに追加するオブジェクト
   */
  getObject3Ds(): typeof THREE.Object3D[] {
    return [
      this.shinBraver.getObject3D()
    ];
  }
}

/**
 * プレイヤー 3Dレイヤー シンブレイバー 3Dレイヤー
 *
 * @param resources リソース管理オブジェクト
 * @param gameObjectAction ゲームオブジェクトアクション
 * @param state プレイヤー情報
 * @return 生成結果
 */
export function playerShinBraverTD(resources: Resources, gameObjectAction: Stream<GameObjectAction>, state: Player): ShinBraverTD {
  return new ShinBraverTD(state.playerId, {
    shinBraver: PlayerShinBraver(resources, gameObjectAction)
  });
}

/**
 * 敵 3Dレイヤー シンブレイバー 3Dレイヤー
 *
 * @param resources リソース管理オブジェクト
 * @param gameObjectAction ゲームオブジェクトアクション
 * @param state プレイヤー情報
 * @return 生成結果
 */
export function enemyShinBraverTD(resources: Resources, gameObjectAction: Stream<GameObjectAction>, state: Player): ShinBraverTD {
  return new ShinBraverTD(state.playerId, {
    shinBraver: EnemyShinBraver(resources, gameObjectAction)
  });
}