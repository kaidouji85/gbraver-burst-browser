import type { Player, PlayerId } from "gbraver-burst-core";
import * as THREE from "three";

import type { GameObjectAction } from "../../../../../game-object/action/game-object-action";
import { enemyShinBraverCutIn, playerShinBraverCutIn } from "../../../../../game-object/cut-in/shin-braver";
import { ShinBraverCutIn } from "../../../../../game-object/cut-in/shin-braver/shin-braver-cutin";
import type { Resources } from "../../../../../resource";
import type { Stream } from "../../../../../stream/stream";
import type { HUDArmdozerObjects } from "./hud-armdozer-ibjects";

/** コンストラクタのパラメータ */
type Param = {
  playerId: PlayerId;
  cutIn: ShinBraverCutIn;
};

/**
 * HUDレイヤー シンブレイバー固有のオブジェクトをあつめたもの
 */
export class ShinBraverHUD implements HUDArmdozerObjects {
  playerId: PlayerId;
  cutIn: ShinBraverCutIn;

  constructor(param: Param) {
    this.playerId = param.playerId;
    this.cutIn = param.cutIn;
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this.cutIn.destructor();
  }

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @return シーンに追加するオブジェクト
   */
  getObject3Ds(): THREE.Object3D[] {
    return [this.cutIn.getObject3D()];
  }

}

/**
 * プレイヤー側 シンブレイバーHUD
 *
 * @param resources リソース管理オブジェクト
 * @param gameObjectAction ゲームオブジェクトアクション
 * @param state プレイヤーの状態
 * @return シンブレイバーHUD
 */
export function playerShinBraverHUD(resources: Resources, gameObjectAction: Stream<GameObjectAction>, state: Player): HUDArmdozerObjects {
  return new ShinBraverHUD({
    playerId: state.playerId,
    cutIn: playerShinBraverCutIn(resources, gameObjectAction)
  });
}

/**
 * 敵側 シンブレイバーHUD
 *
 * @param resources リソース管理オブジェクト
 * @param gameObjectAction ゲームオブジェクトアクション
 * @param state プレイヤーの状態
 * @return シンブレイバーHUD
 */
export function enemyShinBraverHUD(resources: Resources, gameObjectAction: Stream<GameObjectAction>, state: Player): HUDArmdozerObjects {
  return new ShinBraverHUD({
    playerId: state.playerId,
    cutIn: enemyShinBraverCutIn(resources, gameObjectAction)
  });
}