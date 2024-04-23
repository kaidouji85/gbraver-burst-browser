import * as THREE from "three";

import { TDLayerObjectCreatorParams } from "../creator-params";
import { createTDGameObjectProps } from "./procedure/create-td-game-objects-props";
import { destructor } from "./procedure/destructor";
import { getObject3Ds } from "./procedure/get-object-3ds";
import { TDGameObjectsProps } from "./props";

/** 3Dレイヤー その他ゲームオブジェクト */
export type TDGameObjects = TDGameObjectsProps & {
  /**
   * デストラクタ相当の処理
   */
  destructor(): void;

  /**
   * シーンに追加するオブジェクトを取得する
   * @return シーンに追加するオブジェクト
   */
  getObject3Ds(): THREE.Object3D[];
};

/**
 * TDGameObjectsを生成する
 * @params 生成パラメータ
 * @return 生成結果
 */
export function createTDGameObjects(
  params: TDLayerObjectCreatorParams,
): TDGameObjects {
  const props = createTDGameObjectProps(params);
  return {
    ...props,
    destructor: () => destructor(props),
    getObject3Ds: () => getObject3Ds(props),
  };
}
