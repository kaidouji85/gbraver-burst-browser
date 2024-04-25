import { ResourcesContainer } from "../../../../resource";
import { SEPlayerContainer } from "../../../../se/se-player";
import { createInitialValue } from "../model/initial-value";
import { GaiSounds } from "../sounds/gai-sounds";
import { GaiView } from "../view/gai-view";
import { GaiCutInProps } from "./gai-cutin-props";

/** GaiCutInProps生成パラメータ */
export type PropsCreatorParams = ResourcesContainer &
  SEPlayerContainer & {
    /** ビュー */
    view: GaiView;
  };

/**
 * GaiCutInPropsを生成する
 * @param params 生成パラメータ
 * @returns 生成結果
 */
export function createGaiCutInProps(params: PropsCreatorParams): GaiCutInProps {
  const { resources } = params;
  return {
    ...params,
    model: createInitialValue(),
    sounds: new GaiSounds(resources),
  };
}
