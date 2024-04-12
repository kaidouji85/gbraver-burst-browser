import * as TWEEN from "@tweenjs/tween.js";

import { Resources } from "../../../../resource";
import { createInitialValue } from "../model/initial-value";
import { LightningBarrierSounds } from "../sounds/lightning-barrier-sounds";
import { LightningBarrierView } from "../view/lightning-barrier-view";
import { LightningBarrierProps } from "./lightning-barrier-props";

/** LightningBarrierProps生成パラメータ */
export type GenerateLightningBarrierPropsParams = {
  /** リソース管理オブジェクト */
  resources: Resources;
};

/**
 * LightningBarrierPropsを生成する
 * @param params 生成パラメータ
 * @return 生成結果
 */
export function createLightningBarrierProps(
  params: GenerateLightningBarrierPropsParams,
): LightningBarrierProps {
  const { resources } = params;
  return {
    model: createInitialValue(),
    view: new LightningBarrierView(resources),
    sounds: new LightningBarrierSounds(resources),
    tweenGroup: new TWEEN.Group(),
  };
}
