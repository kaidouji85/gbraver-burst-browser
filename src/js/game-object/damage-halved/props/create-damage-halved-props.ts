import { ResourcesContainer } from "../../../resource";
import { SEPlayerContainer } from "../../../se/se-player";
import { createInitialValue } from "../model/initial-value";
import { DamageHalvedSounds } from "../sounds/damage-halved-sounds";
import { DamageHalvedView } from "../view/damage-halved-view";
import { DamageHalvedProps } from "./damage-halved-props";

/** ダメージ半減 プロパティ生成パラメータ */
export type PropsCreatorParams = ResourcesContainer &
  SEPlayerContainer & {
    /** ビュー */
    view: DamageHalvedView;
  };

/**
 * ダメージ半減 プロパティを生成する
 * @param params パラメータ
 * @returns 生成結果
 */
export function createDamageHalvedProps(
  params: PropsCreatorParams,
): DamageHalvedProps {
  const { resources } = params;
  return {
    ...params,
    model: createInitialValue(),
    sounds: new DamageHalvedSounds(resources),
  };
}
