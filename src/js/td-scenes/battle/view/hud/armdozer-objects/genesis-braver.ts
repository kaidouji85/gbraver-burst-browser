import type { Player, PlayerId } from "gbraver-burst-core";
import { Observable } from "rxjs";
import * as THREE from "three";

import type { GameObjectAction } from "../../../../../game-object/action/game-object-action";
import {
  enemyGenesisBraverCutIn,
  playerGenesisBraverCutIn,
} from "../../../../../game-object/cut-in/genesis-braver";
import { GenesisBraverCutIn } from "../../../../../game-object/cut-in/genesis-braver/genesis-braver-cutin";
import type { Resources } from "../../../../../resource";
import type { HUDArmdozerObjects } from "./hud-armdozer-ibjects";

/** コンストラクタのパラメータ */
type Param = {
  /** プレイヤーID */
  playerId: PlayerId;
  /** カットイン */
  cutIn: GenesisBraverCutIn;
};

/** HUDレイヤー ジェネシスブレイバー固有オブジェクト */
export class GenesisBraverHUD implements HUDArmdozerObjects {
  /** @override */
  playerId: PlayerId;
  /** カットイン */
  cutIn: GenesisBraverCutIn;

  /**
   * コンストラクタ
   * @param param パラメータ
   */
  constructor(param: Param) {
    this.playerId = param.playerId;
    this.cutIn = param.cutIn;
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
 * プレイヤー ジェネシスブレイバーHUD を生成する
 * @param resources リソース管理オブジェクト
 * @param gameObjectAction ゲームオブジェクトアクション
 * @param state プレイヤーの状態
 * @return 生成結果
 */
export function playerGenesisBraverHUD(
  resources: Resources,
  gameObjectAction: Observable<GameObjectAction>,
  state: Player,
): HUDArmdozerObjects {
  return new GenesisBraverHUD({
    playerId: state.playerId,
    cutIn: playerGenesisBraverCutIn(resources, gameObjectAction),
  });
}

/**
 * 敵 ジェネシスブレイバーHUD を生成する
 * @param resources リソース管理オブジェクト
 * @param gameObjectAction ゲームオブジェクトアクション
 * @param state プレイヤーの状態
 * @return 生成結果
 */
export function enemyGenesisBraverHUD(
  resources: Resources,
  gameObjectAction: Observable<GameObjectAction>,
  state: Player,
): HUDArmdozerObjects {
  return new GenesisBraverHUD({
    playerId: state.playerId,
    cutIn: enemyGenesisBraverCutIn(resources, gameObjectAction),
  });
}
