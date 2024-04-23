import { Observable } from "rxjs";
import * as THREE from "three";

import { BattleSceneAction } from "../../../actions";
import { HUDLayerObjectCreatorParams } from "../creator-params";
import { bindEventListener } from "./procedure/bind-event-listener";
import { createHUDGameObjectsProps } from "./procedure/create-hud-game-objects-props";
import { destructor } from "./procedure/destructor";
import { getObject3Ds } from "./procedure/get-object-3ds";
import { HUDGameObjectsProps } from "./props";

/** HUDレイヤーのゲームオブジェクト */
export type HUDGameObjects = Omit<HUDGameObjectsProps, "battleAction"> & {
  /**
   * デスタラクタ相当の処理
   */
  destructor(): void;

  /**
   * シーンに追加するオブジェクトを取得する
   * @return シーンに追加するオブジェクト
   */
  getObject3Ds(): THREE.Object3D[];

  /**
   * 戦闘シーンアクションを通知する
   * @return 通知ストリーム
   */
  battleActionNotifier(): Observable<BattleSceneAction>;
};

/**
 * HUDGameObjectsを生成する
 * @param params 生成パラメータ
 * @return 生成結果
 */
export function createHUDGameObjects(
  params: HUDLayerObjectCreatorParams,
): HUDGameObjects {
  const props = createHUDGameObjectsProps(params);
  const unsubscrribers = bindEventListener(props);
  return {
    ...props,
    destructor: () => {
      destructor(props);
      unsubscrribers.forEach((u) => {
        u.unsubscribe();
      });
    },
    getObject3Ds: () => getObject3Ds(props),
    battleActionNotifier: () => props.battleAction,
  };
}
