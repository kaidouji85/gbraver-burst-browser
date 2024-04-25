import {
  createTDLayerProps,
  TDLayerPropsCreatorParams,
} from "./procedure/create-td-layer-props";
import { destructor } from "./procedure/destructor";
import { TDLayerProps } from "./props";

/** 3Dレイヤー */
export type TDLayer = Omit<TDLayerProps, "overlap" | "gameObjectAction"> & {
  /**
   * デストラクタ相当の処理
   */
  destructor(): void;
};

/** 生成パラメータ */
export type TDLayerCreatorParams = TDLayerPropsCreatorParams;

/**
 * TDLayerを生成する
 * @param params 生成パラメータ
 * @returns 生成結果
 */
export function createTDLayer(params: TDLayerCreatorParams): TDLayer {
  const props = createTDLayerProps(params);
  return {
    ...props,
    destructor: () => destructor(props),
  };
}
