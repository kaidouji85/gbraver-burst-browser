import { Resources } from "../../../../resource";
import { createInitialValue } from "../model/initial-value";
import { LightningDozerSounds } from "../sounds/lightning-dozer-sounds";
import { LightningDozerView } from "../view/lightning-dozer-view";
import { LightningDozerProps } from "./lightning-dozer-props";
import {SEPlayer} from "../../../../se/se-player";

/** LightningDozerProps生成パラメータ */
export type GenerateLightningDozerPropsParams = {
  /** リソース管理オブジェクト */
  resources: Resources;
  /** SE再生 */
  se: SEPlayer;
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
  const { view, resources, se } = params;
  return {
    view,
    se,
    model: createInitialValue(),
    sounds: new LightningDozerSounds(resources),
  };
}
