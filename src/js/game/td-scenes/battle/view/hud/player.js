// @flow

import * as THREE from 'three';
import type {Player, PlayerId} from "gbraver-burst-core";
import {Gauge} from "../../../../../game-object/gauge/gauge";
import type {Resources} from "../../../../../resource";
import {Observable} from "rxjs";
import type {GameObjectAction} from "../../../../../action/game-object-action";
import {enemyGauge, playerGauge} from "../../../../../game-object/gauge";

/**
 * HUDレイヤー プレイヤー固有オブジェクト フィールド
 */
export interface HUDPlayerField {
  playerId: PlayerId;
  gauge: Gauge;
}

/**
 * HUDレイヤー プレイヤー固有オブジェクト
 */
export class HUDPlayer implements HUDPlayerField{
  playerId: PlayerId;
  gauge: Gauge;

  constructor(param: HUDPlayerField) {
    this.playerId = param.playerId;
    this.gauge = param.gauge;
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this.gauge.destructor();
  }

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @return シーンに追加するオブジェクト
   */
  getObject3Ds(): THREE.Object3D[] {
    return [
      this.gauge.getObject3D(),
    ];
  }
}

/**
 * プレイヤー側 HUDレイヤープレイヤー固有オブジェクト
 *
 * @param resources リソース管理オブジェクト
 * @param state プレイヤー情報
 * @param listener イベントリスナ
 * @return 生成結果
 */
export function playerHUDObjects(resources: Resources, state: Player, listener: Observable<GameObjectAction>): HUDPlayer {
  return new HUDPlayer({
    playerId: state.playerId,
    gauge: playerGauge({
      resources: resources,
      listener: listener,
      hp: state.armdozer.maxHp,
      battery: state.armdozer.maxBattery
    }),
  });
}

/**
 * 敵側 HUDレイヤープレイヤー固有オブジェクト
 *
 * @param resources リソース管理オブジェクト
 * @param state プレイヤー情報
 * @param listener イベントリスナ
 * @return 生成結果
 */
export function enemyHUDObjects(resources: Resources, state: Player, listener: Observable<GameObjectAction>): HUDPlayer {
  return new HUDPlayer({
    playerId: state.playerId,
    gauge: enemyGauge({
      resources: resources,
      listener: listener,
      hp: state.armdozer.maxHp,
      battery: state.armdozer.maxBattery
    }),
  });
}