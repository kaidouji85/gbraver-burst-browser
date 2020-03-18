// @flow

import * as THREE from 'three';
import type {Player, PlayerId} from "gbraver-burst-core/lib/player/player";
import type {Resources} from "../../../../../../resource";
import {Observable} from "rxjs";
import type {GameObjectAction} from "../../../../../../action/game-object-action";
import {playerShinBraverHUD, enemyShinBraverHUD} from "./shin-braver";

/**
 * HUDレイヤー アームドーザ固有のオブジェクトを集めたもの
 */
export interface HUDArmdozer {
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
 * プレイヤー側 HUDアームドーザ
 *
 * @param resources リソース管理オブジェクト
 * @param listener イベントリスナ
 * @param state プレイヤー状態
 * @return HUDアームドーザ
 */
export function playerArmdozerHUD(resources: Resources, listener: Observable<GameObjectAction>, state: Player): HUDArmdozer {
  return playerShinBraverHUD(resources, listener, state);
}

/**
 * 敵側 HUDアームドーザ
 *
 * @param resources リソース管理オブジェクト
 * @param listener イベントリスナ
 * @param state プレイヤー状態
 * @return HUDアームドーザ
 */
export function enemyArmdozerHUD(resources: Resources, listener: Observable<GameObjectAction>, state: Player): HUDArmdozer {
  return enemyShinBraverHUD(resources, listener, state);
}