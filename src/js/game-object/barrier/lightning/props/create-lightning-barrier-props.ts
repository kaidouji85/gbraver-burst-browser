import { Group } from "@tweenjs/tween.js";

import { ResourcesContainer } from "../../../../resource";
import { SEPlayerContainer } from "../../../../se/se-player";
import { createInitialValue } from "../model/initial-value";
import { LightningBarrierSounds } from "../sounds/lightning-barrier-sounds";
import { LightningBarrierView } from "../view/lightning-barrier-view";
import { LightningBarrierProps } from "./lightning-barrier-props";

/** LightningBarrierProps生成パラメータ */
export type PropsCreatorParams = ResourcesContainer & SEPlayerContainer;

/**
 * LightningBarrierPropsを生成する
 * @param params 生成パラメータ
 * @returns 生成結果
 */
export function createLightningBarrierProps(
  params: PropsCreatorParams,
): LightningBarrierProps {
  const { resources } = params;
  return {
    ...params,
    model: createInitialValue(),
    view: new LightningBarrierView(resources),
    sounds: new LightningBarrierSounds(resources),
    tweenGroup: new Group(),
  };
}
