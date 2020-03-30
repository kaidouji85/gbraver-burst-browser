// @flow

import type {Player, PlayerId} from "gbraver-burst-core/lib/player/player";
import * as THREE from "three";
import type {Resources} from "../../../../../../resource";
import {Observable} from "rxjs";
import type {GameObjectAction} from "../../../../../../action/game-object-action";
import {EmptyTDArmdozer} from "./empty";
import {ArmdozerAppearances} from "gbraver-burst-core/lib/master/armdozers";
import {enemyLightningDozerTD, playerLightningDozerTD} from "./lightning-dozer";

/**
 * 3Dレイヤー アームドーザ固有のオブジェクトを集めたもの
 */
export interface TDArmdozer {
  /** プレイヤーID */
  playerId: PlayerId;

  /** デストラクタ相当の処理 */
  destructor(): void;

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @return シーンに追加するオブジェクト
   */
  getObject3Ds(): THREE.Object3D[];

  /**
   * アームドーザスプライト配下に置かれるオブジェクトを取得する
   *
   * @return アームドーザスプライト配下に置かれるオブジェクト
   */
  getUnderSprite(): THREE.Object3D[];
}

/**
 * プレイヤー側  3Dレイヤー アームドーザ固有オブジェクト
 *
 * @param resources リソース管理オブジェクト
 * @param listener イベントリスナ
 * @param state プレイヤーの状態
 * @return 生成結果
 */
export function playerTDArmdozer(resources: Resources, listener: Observable<GameObjectAction>, state: Player): TDArmdozer {
  switch (state.armdozer.appearance) {
    case ArmdozerAppearances.LIGHTNING_DOZER:
      return playerLightningDozerTD(resources, listener, state);
    default:
      return new EmptyTDArmdozer(state);
  }
}

/**
 * 敵側  3Dレイヤー アームドーザ固有オブジェクト
 *
 * @param resources リソース管理オブジェクト
 * @param listener イベントリスナ
 * @param state プレイヤーの状態
 * @return 生成結果
 */
export function enemyTDArmdozer(resources: Resources, listener: Observable<GameObjectAction>, state: Player): TDArmdozer {
  switch (state.armdozer.appearance) {
    case ArmdozerAppearances.LIGHTNING_DOZER:
      return enemyLightningDozerTD(resources, listener, state);
    default:
      return new EmptyTDArmdozer(state);
  }
}