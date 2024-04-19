import { ResourcesContainer } from "../../../../resource";
import { SEPlayerContainer } from "../../../../se/se-player";
import { createInitialValue } from "../model/initial-value";
import { LightningSounds } from "../sounds/lightning-sounds";
import { LightningView } from "../view/lightning-view";
import { LightningProps } from "./lightning-props";

/** 電撃ヒットマークプロパティ生成パラメータ */
export type PropsCreatorParams = ResourcesContainer & SEPlayerContainer & {
  /** ビュー */
  view: LightningView;
};

/**
 * 電撃ヒットマークプロパティを生成する
 * @param params 生成パラメータ
 * @return 生成結果
 */
export function createLightningProps(
  params: PropsCreatorParams,
): LightningProps {
  const { resources } = params;
  return {
    ...params,
    model: createInitialValue(),
    sounds: new LightningSounds(resources),
  };
}
