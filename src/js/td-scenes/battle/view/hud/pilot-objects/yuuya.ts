import type { Player, PlayerId } from "gbraver-burst-core";
import { Observable } from "rxjs";
import * as THREE from "three";

import type { GameObjectAction } from "../../../../../game-object/action/game-object-action";
import { enemyYuuyaCutIn, playerYuuyaCutIn } from "../../../../../game-object/cut-in/yuuya";
import { YuuyaCutIn } from "../../../../../game-object/cut-in/yuuya/yuuya";
import type { Resources } from "../../../../../resource";
import type { HUDPilotObjects } from "./hud-pilot-objects";

/** コンストラクタのパラメータ */
type Params = {
  /** プレイヤーID */
  playerId: PlayerId;
  /** カットイン */
  cutIn: YuuyaCutIn;
};

/** HUDレイヤー ユウヤ固有のオブジェクトをあつめたもの */
export class YuuyaHUD implements HUDPilotObjects {
  /** @override */
  playerId: PlayerId;
  /** カットイン */
  cutIn: YuuyaCutIn;

  /**
   * コンストラクタ
   * @param params パラメータ
   */
  constructor(params: Params) {
    this.playerId = params.playerId;
    this.cutIn = params.cutIn;
  }

  /** @override */
  destructor(): void {
    this.cutIn.destructor();
  }

  /** @override */
  getObject3Ds(): THREE.Object3D[] {
    return [this.cutIn.getObject3D()];
  }
}

/**
 * プレイヤー側 ユウヤHUD
 * @param resources リソース管理オブジェクト
 * @param gameObjectAction ゲームオブジェクトアクション
 * @param state プレイヤーの状態
 * @return ユウヤHUD
 */
export function playerYuuyaHUD(
  resources: Resources,
  gameObjectAction: Observable<GameObjectAction>,
  state: Player,
): YuuyaHUD {
  return new YuuyaHUD({
    playerId: state.playerId,
    cutIn: playerYuuyaCutIn(resources, gameObjectAction),
  });
}

/**
 * 敵側 ユウヤHUD
 * @param resources リソース管理オブジェクト
 * @param gameObjectAction ゲームオブジェクトアクション
 * @param state プレイヤーの状態
 * @return ユウヤHUD
 */
export function enemyYuuyaHUD(
  resources: Resources,
  gameObjectAction: Observable<GameObjectAction>,
  state: Player,
): YuuyaHUD {
  return new YuuyaHUD({
    playerId: state.playerId,
    cutIn: enemyYuuyaCutIn(resources, gameObjectAction),
  });
}
