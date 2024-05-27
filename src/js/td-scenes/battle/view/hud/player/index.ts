import { Observable, Subject } from "rxjs";
import * as THREE from "three";

import { BattleSceneAction } from "../../../actions";
import { HUDLayerObjectCreatorParams } from "../creator-params";
import { bindEventListener } from "./procedure/bind-event-listenr";
import { createEnemyProps } from "./procedure/create-enemy-props";
import { createPlayerProps } from "./procedure/create-player-props";
import { destructor } from "./procedure/destructor";
import { getObject3Ds } from "./procedure/get-object-3ds";
import { HUDPlayerProps } from "./props";

/** HUDプレイヤーブジェクト */
export type HUDPlayer = HUDPlayerProps & {
  /**
   * デストラクタ相当の処理
   */
  destructor(): void;

  /**
   * シーンに追加するオブジェクトを取得する
   * @returns シーンに追加するオブジェクト
   */
  getObject3Ds(): THREE.Object3D[];

  /**
   * 戦闘シーンアクションを通知する
   * @returns 通知ストリーム
   */
  battleActionNotifier(): Observable<BattleSceneAction>;
};

/**
 * HUDPlayerを生成する
 * @param props プロパティ
 * @returns 生成結果
 */
function createHUDPlayer(props: HUDPlayerProps): HUDPlayer {
  const battleAction = new Subject<BattleSceneAction>();
  const unsubscrribers = bindEventListener(props, battleAction);
  return {
    ...props,
    destructor: () => {
      destructor(props);
      unsubscrribers.forEach((u) => {
        u.unsubscribe();
      });
    },
    getObject3Ds: () => getObject3Ds(props),
    battleActionNotifier: () => battleAction,
  };
}

/**
 * プレイヤー側 HUDプレイヤーオブジェクト
 * @param params 生成パラメータ
 * @returns 生成結果
 */
export function playerHUDObjects(
  params: HUDLayerObjectCreatorParams,
): HUDPlayer {
  const props = createPlayerProps(params);
  return createHUDPlayer(props);
}

/**
 * 敵側 HUDプレイヤーオブジェクト
 * @param params 生成パラメータ
 * @returns 生成結果
 */
export function enemyHUDObjects(
  params: HUDLayerObjectCreatorParams,
): HUDPlayer {
  const props = createEnemyProps(params);
  return createHUDPlayer(props);
}
