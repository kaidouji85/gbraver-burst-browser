// @flow

import * as THREE from 'three';
import type {HUDArmdozer} from "./index";
import type {Player, PlayerId} from "gbraver-burst-core/lib/player/player";
import {ShinBraverCutIn} from "../../../../../../game-object/cut-in/shin-braver/shin-braver-cutin";
import type {Resources} from "../../../../../../resource";
import {Observable} from "rxjs";
import type {GameObjectAction} from "../../../../../../action/game-object-action";

/** コンストラクタのパラメータ */
type Param = {
  playerId: PlayerId,
  cutIn: ShinBraverCutIn,
};

/**
 * HUDレイヤー シンブレイバー固有のオブジェクトをあつめたもの
 */
export class ShinBraverHUD implements HUDArmdozer {
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
    return [
      this.cutIn.getObject3D(),
    ];
  }
}

/**
 * プレイヤー側 シンブレイバーHUD
 *
 * @param resources リソース管理オブジェクト
 * @param listener イベントリスナ
 * @param state プレイヤーの状態
 * @return シンブレイバーHUD
 */
export function playerShinBraverHUD(resources: Resources, listener: Observable<GameObjectAction>, state: Player): HUDArmdozer {
  return new ShinBraverHUD({
    playerId: state.playerId,
    cutIn: new ShinBraverCutIn(resources, listener),
  });
}

/**
 * 敵側 シンブレイバーHUD
 *
 * @param resources リソース管理オブジェクト
 * @param listener イベントリスナ
 * @param state プレイヤーの状態
 * @return シンブレイバーHUD
 */
export function enemyShinBraverHUD(resources: Resources, listener: Observable<GameObjectAction>, state: Player): HUDArmdozer {
  return new ShinBraverHUD({
    playerId: state.playerId,
    cutIn: new ShinBraverCutIn(resources, listener),
  });
}