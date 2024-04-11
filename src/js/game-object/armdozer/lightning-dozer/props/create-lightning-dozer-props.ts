import { Resources } from "../../../../resource";
import { createInitialValue } from "../model/initial-value";
import { LightningDozerSounds } from "../sounds/lightning-dozer-sounds";
import { LightningDozerView } from "../view/lightning-dozer-view";
import { LightningDozerProps } from "./lightning-dozer-props";

/** LightningDozerProps生成パラメータ */
export type GenerateLightningDozerPropsParams = {
  /** リソース管理オブジェクト */
  resources: Resources;
  /** ビュー */
  view: LightningDozerView;
};

/**
 * LightningDozerPropsを生成する
 * @param params 生成パラメータ
 * @return 生成結果
 */
export function createLightningDozerProps(
  params: GenerateLightningDozerPropsParams,
): LightningDozerProps {
  const { view, resources } = params;
  return {
    view,
    model: createInitialValue(),
    sounds: new LightningDozerSounds(resources),
  };
}
