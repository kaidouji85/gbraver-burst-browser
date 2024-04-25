import * as THREE from "three";

import { TDLayerObjectCreatorParams } from "../creator-params";
import { createEnemyProps } from "./procedure/create-enemy-props";
import { createPlayerProps } from "./procedure/create-player-props";
import { destructor } from "./procedure/destructor";
import { getObject3Ds } from "./procedure/get-object-3d";
import { TDPlayerProps } from "./props";

/** 3Dレイヤー プレイヤーオブジェクト */
export type TDPlayer = TDPlayerProps & {
  /**
   * デストラクタ相当の処理
   */
  destructor(): void;

  /**
   * シーンに追加するオブジェクトを取得する
   * @returns シーンに追加するオブジェクト
   */
  getObject3Ds(): THREE.Object3D[];
};

/**
 * TDPlayer生成関数
 * @param props プロパティ
 * @returns 生成結果
 */
function createTDPlayer(props: TDPlayerProps): TDPlayer {
  return {
    ...props,
    destructor: () => destructor(props),
    getObject3Ds: () => getObject3Ds(props),
  };
}

/**
 * プレイヤー側の3Dプレイヤーオブジェクト
 * @param params プレイヤーオブジェクト生成パラメータ
 * @returns 3Dプレイヤーオブジェクト
 */
export function playerTDObjects(params: TDLayerObjectCreatorParams): TDPlayer {
  const props = createPlayerProps(params);
  return createTDPlayer(props);
}

/**
 * 敵側の3Dプレイヤーオブジェクト
 * @param params プレイヤーオブジェクト生成パラメータ
 * @returns 3Dプレイヤーオブジェクト
 */
export function enemyTDObject(params: TDLayerObjectCreatorParams): TDPlayer {
  const props = createEnemyProps(params);
  return createTDPlayer(props);
}
