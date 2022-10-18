// @flow

import type {Player, PlayerId} from "gbraver-burst-core";
import * as THREE from 'three';
import type {GameObjectAction} from "../../../../game-object/action/game-object-action";
import {enemyGauge, playerGauge} from "../../../../game-object/gauge";
import {Gauge} from "../../../../game-object/gauge/gauge";
import {loseIndicator, winIndicator} from "../../../../game-object/result-indicator";
import {ResultIndicator} from "../../../../game-object/result-indicator/result-indicator";
import {enemyTurnStart, playerTurnStart} from "../../../../game-object/turn-start";
import {TurnStart} from "../../../../game-object/turn-start/turn-start";
import type {Resources} from "../../../../resource";
import type {Stream} from "../../../../stream/stream";

/**
 * HUDレイヤー プレイヤー固有オブジェクト フィールド
 */
export interface HUDPlayerField {
  playerId: PlayerId;
  gauge: Gauge;
  turnStart: TurnStart;
  resultIndicator: ResultIndicator,
}

/**
 * HUDレイヤー プレイヤー固有オブジェクト
 */
export class HUDPlayer implements HUDPlayerField{
  playerId: PlayerId;
  gauge: Gauge;
  turnStart: TurnStart;
  resultIndicator: ResultIndicator

  constructor(param: HUDPlayerField) {
    this.playerId = param.playerId;
    this.gauge = param.gauge;
    this.turnStart = param.turnStart;
    this.resultIndicator = param.resultIndicator;
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this.gauge.destructor();
    this.turnStart.destructor();
    this.resultIndicator.destructor();
  }

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @return シーンに追加するオブジェクト
   */
  getObject3Ds(): typeof THREE.Object3D[] {
    return [
      this.gauge.getObject3D(),
      this.turnStart.getObject3D(),
      this.resultIndicator.getObject3D(),
    ];
  }
}

/**
 * プレイヤー側 HUDレイヤープレイヤー固有オブジェクト
 *
 * @param resources リソース管理オブジェクト
 * @param state プレイヤー情報
 * @param gameObjectAction ゲームオブジェクトアクション
 * @return 生成結果
 */
export function playerHUDObjects(resources: Resources, state: Player, gameObjectAction: Stream<GameObjectAction>): HUDPlayer {
  return new HUDPlayer({
    playerId: state.playerId,
    gauge: playerGauge({
      resources: resources,
      gameObjectAction: gameObjectAction,
      hp: state.armdozer.maxHp,
      battery: state.armdozer.maxBattery
    }),
    turnStart: playerTurnStart(resources, gameObjectAction),
    resultIndicator: winIndicator(resources, gameObjectAction),
  });
}

/**
 * 敵側 HUDレイヤープレイヤー固有オブジェクト
 *
 * @param resources リソース管理オブジェクト
 * @param state プレイヤー情報
 * @param gameObjectAction ゲームオブジェクトアクション
 * @return 生成結果
 */
export function enemyHUDObjects(resources: Resources, state: Player, gameObjectAction: Stream<GameObjectAction>): HUDPlayer {
  return new HUDPlayer({
    playerId: state.playerId,
    gauge: enemyGauge({
      resources: resources,
      gameObjectAction: gameObjectAction,
      hp: state.armdozer.maxHp,
      battery: state.armdozer.maxBattery
    }),
    turnStart: enemyTurnStart(resources, gameObjectAction),
    resultIndicator: loseIndicator(resources, gameObjectAction),
  });
}