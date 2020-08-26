// @flow

import * as THREE from 'three';
import type {HUDArmdozerObjects} from "./index";
import type {Player, PlayerId} from "gbraver-burst-core";
import type {Resources} from "../../../../../../resource";
import {Observable} from "rxjs";
import type {GameObjectAction} from "../../../../../../action/game-object-action";
import {WingDozerCutIn} from "../../../../../../game-object/cut-in/wing-dozer/wing-dozer-cutin";
import {enemyWingDozerCutIn, playerWingDozerCutIn} from "../../../../../../game-object/cut-in/wing-dozer";

/** コンストラクタのパラメータ */
type Param = {
  playerId: PlayerId,
  cutIn: WingDozerCutIn,
};

/**
 * HUDレイヤー ウィングドーザ固有のオブジェクトをあつめたもの
 */
export class WingDozerHUD implements HUDArmdozerObjects {
  playerId: PlayerId;
  cutIn: WingDozerCutIn;

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
  getObject3Ds(): typeof THREE.Object3D[] {
    return [
      this.cutIn.getObject3D(),
    ];
  }
}

/**
 * プレイヤー側 ウィングドーザHUD
 *
 * @param resources リソース管理オブジェクト
 * @param listener イベントリスナ
 * @param state プレイヤーの状態
 * @return ウィングドーザHUD
 */
export function playerWingDozerHUD(resources: Resources, listener: Observable<GameObjectAction>, state: Player): WingDozerHUD {
  return new WingDozerHUD({
    playerId: state.playerId,
    cutIn: playerWingDozerCutIn(resources, listener),
  });
}

/**
 * 敵側 ウィングドーザHUD
 *
 * @param resources リソース管理オブジェクト
 * @param listener イベントリスナ
 * @param state プレイヤーの状態
 * @return ウィングドーザHUD
 */
export function enemyWingDozerHUD(resources: Resources, listener: Observable<GameObjectAction>, state: Player): WingDozerHUD {
  return new WingDozerHUD({
    playerId: state.playerId,
    cutIn: enemyWingDozerCutIn(resources, listener)
  });
}