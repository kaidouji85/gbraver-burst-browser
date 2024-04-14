import { Resources } from "../../../../resource";
import { SEPlayer } from "../../../../se/se-player";
import { createInitialValue } from "../model/initial-value";
import { LightningSounds } from "../sounds/lightning-sounds";
import { LightningView } from "../view/lightning-view";
import { LightningProps } from "./lightning-props";

/** 電撃ヒットマークプロパティ生成パラメータ */
export type GenerateLightningPropsParams = {
  /** ビュー */
  view: LightningView;
  /** リソース管理オブジェクト */
  resources: Resources;
  /** SE再生オブジェクト */
  se: SEPlayer;
};

/**
 * 電撃ヒットマークプロパティを生成する
 * @param params 生成パラメータ
 * @return 生成結果
 */
export function createLightningProps(
  params: GenerateLightningPropsParams,
): LightningProps {
  const { resources } = params;
  return {
    ...params,
    model: createInitialValue(),
    sounds: new LightningSounds(resources),
  };
}
