import { Observable } from "rxjs";
import * as THREE from "three";

import { BattleSceneAction } from "../../../actions";
import { HUDLayerObjectCreatorParams } from "../creator-params";
import { createHUDGameObjectsProps } from "./procedure/create-hud-game-objects-props";
import { destructor } from "./procedure/destructor";
import { getObject3Ds } from "./procedure/get-object-3ds";
import { notifyBattleAction } from "./procedure/notify-battle-action";
import { HUDGameObjectsProps } from "./props";

/** HUDレイヤーのゲームオブジェクト */
export type HUDGameObjects = HUDGameObjectsProps & {
  /**
   * デスタラクタ相当の処理
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
  notifyBattleAction(): Observable<BattleSceneAction>;
};

/**
 * HUDGameObjectsを生成する
 * @param params 生成パラメータ
 * @returns 生成結果
 */
export function createHUDGameObjects(
  params: HUDLayerObjectCreatorParams,
): HUDGameObjects {
  const props = createHUDGameObjectsProps(params);
  return {
    ...props,
    destructor: () => destructor(props),
    getObject3Ds: () => getObject3Ds(props),
    notifyBattleAction: () => notifyBattleAction(props),
  };
}
