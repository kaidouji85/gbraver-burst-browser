// @flow

import type {TDArmdozerObjects} from "./armdozer-objects";
import type {PlayerId} from "gbraver-burst-core/lib/player/player";
import type {Resources} from "../../../../../../resource";
import {Observable} from "rxjs";
import type {GameObjectAction} from "../../../../../../action/game-object-action";
import type {ArmDozerSprite} from "../../../../../../game-object/armdozer/armdozer-sprite";
import * as THREE from "three";
import type {Player} from "gbraver-burst-core";
import {WingDozer} from "../../../../../../game-object/armdozer/wing-dozer/wing-dozer";
import {EnemyWingDozer, PlayerWingDozer} from "../../../../../../game-object/armdozer/wing-dozer";

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
export class WingDpzerTD implements WingDozerTDField, TDArmdozerObjects {
  playerId: PlayerId;
  wingDozer: WingDozer;

  /**
   * コンストラクタ
   *
   * @param playerId プレイヤーID
   * @param field　フィールド
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
export function playerWingDozerTD(resources: Resources, listener: Observable<GameObjectAction>, state: Player): WingDpzerTD {
  return new WingDpzerTD(state.playerId, {
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
export function enemyWingDozerTD(resources: Resources, listener: Observable<GameObjectAction>, state: Player): WingDpzerTD {
  return new WingDpzerTD(state.playerId, {
    wingDozer: EnemyWingDozer(resources, listener)
  });
}