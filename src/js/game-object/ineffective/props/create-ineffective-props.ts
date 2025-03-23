import { ResourcesContainer } from "../../../resource";
import { SEPlayerContainer } from "../../../se/se-player";
import { createInitialValue } from "../model/initial-value";
import { IneffectiveUpSounds } from "../sounds/ineffective-up-sounds";
import { IneffectiveView } from "../view/ineffective-view";
import { IneffectiveProps } from "./ineffective-props";

/** IneffectiveProps 生成パラメータ */
export type PropsCreatorParams = ResourcesContainer &
  SEPlayerContainer & {
    /** ビュー */
    view: IneffectiveView;
  };

/**
 * IneffectivePropsを生成する
 * @param params 生成パラメータ
 * @returns 生成したIneffectiveProps
 */
export function createIneffectiveProps(
  params: PropsCreatorParams,
): IneffectiveProps {
  const { resources } = params;
  return {
    ...params,
    model: createInitialValue(),
    sounds: new IneffectiveUpSounds(resources),
  };
}
