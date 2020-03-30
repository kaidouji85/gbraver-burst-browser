// @flow

import type {Player, PlayerId} from "gbraver-burst-core/lib/player/player";
import * as THREE from "three";
import type {Resources} from "../../../../../../resource";
import {Observable} from "rxjs";
import type {GameObjectAction} from "../../../../../../action/game-object-action";
import {EmptyTDArmdozer} from "./empty";

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
    default:
      return new EmptyTDArmdozer(state);
  }
}