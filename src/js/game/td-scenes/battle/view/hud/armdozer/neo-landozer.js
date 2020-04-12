// @flow

import * as THREE from 'three';
import type {HUDArmdozer} from "./index";
import type {PlayerId} from "gbraver-burst-core";
import {NeoLandozerCutIn} from "../../../../../../game-object/cut-in/neo-landozer/neo-landozer-cutin";
import type {Resources} from "../../../../../../resource";
import {Observable} from "rxjs";
import type {GameObjectAction} from "../../../../../../action/game-object-action";
import type {Player} from "gbraver-burst-core";
import {enemyNeoLandozerCutIn, playerNeoLandozerCutIn} from "../../../../../../game-object/cut-in/neo-landozer";

/**
 * HUDレイヤー ネオランドーザ固有オブジェクト フィールド
 */
interface NeoLandozerHUDField {
  cutIn: NeoLandozerCutIn;
}

/**
 * HUDレイヤー ネオランドーザ固有のオブジェクトをあつめたもの
 */
export class NeoLandozerHUD implements HUDArmdozer, NeoLandozerHUDField {
  playerId: PlayerId;
  cutIn: NeoLandozerCutIn;

  constructor(playerId: PlayerId, field: NeoLandozerHUDField) {
    this.playerId = playerId;
    this.cutIn = field.cutIn;
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
  getObject3Ds(): THREE.Object3D {
    return [
      this.cutIn.getObject3D()
    ];
  }
}

/**
 * プレイヤー側 HUDレイヤー ネオランドーザ固有オブジェクト
 *
 * @param resources リソース管理オブジェクト
 * @param listener イベントリスナ
 * @param state プレイヤー情報
 * @return 生成結果
 */
export function playerNeoLandozerHUD(resources: Resources, listener: Observable<GameObjectAction>, state: Player): NeoLandozerHUD {
  return new NeoLandozerHUD(state.playerId, {
    cutIn: playerNeoLandozerCutIn(resources, listener)
  });
}

/**
 * 敵側 HUDレイヤー ネオランドーザ固有オブジェクト
 *
 * @param resources リソース管理オブジェクト
 * @param listener イベントリスナ
 * @param state プレイヤー情報
 * @return 生成結果
 */
export function enemyNeoLandozerHUD(resources: Resources, listener: Observable<GameObjectAction>, state: Player): NeoLandozerHUD {
  return new NeoLandozerHUD(state.playerId, {
    cutIn: enemyNeoLandozerCutIn(resources, listener)
  });
}