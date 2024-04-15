import { Resources } from "../../../../resource";
import { SEPlayer } from "../../../../se/se-player";
import { createInitialValue } from "../model/initial-value";
import { LightningDozerSounds } from "../sounds/lightning-dozer-sounds";
import { LightningDozerView } from "../view/lightning-dozer-view";
import { LightningDozerProps } from "./lightning-dozer-props";

/** LightningDozerProps生成パラメータ */
export type PropsCreatorParams = {
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
  params: PropsCreatorParams,
): LightningDozerProps {
  const { resources } = params;
  return {
    ...params,
    model: createInitialValue(),
    sounds: new LightningDozerSounds(resources),
  };
}
