import type { PlayerId } from "gbraver-burst-core";
import * as THREE from "three";

import { enemyGauge, playerGauge } from "../../../../game-object/gauge";
import { Gauge } from "../../../../game-object/gauge/gauge";
import {
  loseIndicator,
  winIndicator,
} from "../../../../game-object/result-indicator";
import { ResultIndicator } from "../../../../game-object/result-indicator/result-indicator";
import {
  enemyTurnStart,
  playerTurnStart,
} from "../../../../game-object/turn-start";
import { TurnStart } from "../../../../game-object/turn-start/turn-start";
import { HUDLayerObjectCreatorParams } from "./creator-params";

/**
 * HUDレイヤー プレイヤー固有オブジェクト フィールド
 */
export interface HUDPlayerField {
  playerId: PlayerId;
  gauge: Gauge;
  turnStart: TurnStart;
  resultIndicator: ResultIndicator;
}

/**
 * HUDレイヤー プレイヤー固有オブジェクト
 */
export class HUDPlayer implements HUDPlayerField {
  playerId: PlayerId;
  gauge: Gauge;
  turnStart: TurnStart;
  resultIndicator: ResultIndicator;

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
  getObject3Ds(): THREE.Object3D[] {
    return [
      this.gauge.getObject3D(),
      this.turnStart.getObject3D(),
      this.resultIndicator.getObject3D(),
    ];
  }
}

/**
 * プレイヤー側 HUDレイヤープレイヤー固有オブジェクト
 * @param params 生成パラメータ
 * @return 生成結果
 */
export function playerHUDObjects(
  params: HUDLayerObjectCreatorParams,
): HUDPlayer {
  const { resources, player, gameObjectAction } = params;
  return new HUDPlayer({
    playerId: player.playerId,
    gauge: playerGauge({
      resources: resources,
      gameObjectAction: gameObjectAction,
      hp: player.armdozer.maxHp,
      battery: player.armdozer.maxBattery,
    }),
    turnStart: playerTurnStart(resources, gameObjectAction),
    resultIndicator: winIndicator(resources, gameObjectAction),
  });
}

/**
 * 敵側 HUDレイヤープレイヤー固有オブジェクト
 * @param params 生成パラメータ
 * @return 生成結果
 */
export function enemyHUDObjects(
  params: HUDLayerObjectCreatorParams,
): HUDPlayer {
  const { resources, enemy, gameObjectAction } = params;
  return new HUDPlayer({
    playerId: enemy.playerId,
    gauge: enemyGauge({
      resources: resources,
      gameObjectAction: gameObjectAction,
      hp: enemy.armdozer.maxHp,
      battery: enemy.armdozer.maxBattery,
    }),
    turnStart: enemyTurnStart(resources, gameObjectAction),
    resultIndicator: loseIndicator(resources, gameObjectAction),
  });
}
