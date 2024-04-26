import { ResourcesContainer } from "../../../../resource";
import { SEPlayerContainer } from "../../../../se/se-player";
import { createInitialValue } from "../model/initial-value";
import { createLightningDozerSounds } from "../sounds/lightning-dozer-sounds";
import { LightningDozerView } from "../view/lightning-dozer-view";
import { LightningDozerProps } from "./lightning-dozer-props";

/** LightningDozerProps生成パラメータ */
export type PropsCreatorParams = ResourcesContainer &
  SEPlayerContainer & {
    /** ビュー */
    view: LightningDozerView;
  };

/**
 * LightningDozerPropsを生成する
 * @param params 生成パラメータ
 * @returns 生成結果
 */
export function createLightningDozerProps(
  params: PropsCreatorParams,
): LightningDozerProps {
  return {
    ...params,
    model: createInitialValue(),
    sounds: createLightningDozerSounds(params),
  };
}
