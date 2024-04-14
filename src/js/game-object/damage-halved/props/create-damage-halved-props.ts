import { Resources } from "../../../resource";
import { createInitialValue } from "../model/initial-value";
import { DamageHalvedSounds } from "../sounds/damage-halved-sounds";
import { DamageHalvedView } from "../view/damage-halved-view";
import { DamageHalvedProps } from "./damage-halved-props";

/** ダメージ半減 プロパティ生成パラメータ */
export type GenerateDamageHalvedPropsParams = {
  /** ビュー */
  view: DamageHalvedView;
  /** リソース管理オブジェクト */
  resources: Resources;
};

/**
 * ダメージ半減 プロパティを生成する
 * @param params パラメータ
 * @return 生成結果
 */
export function createDamageHalvedProps(
  params: GenerateDamageHalvedPropsParams,
): DamageHalvedProps {
  const { resources, view } = params;
  return {
    model: createInitialValue(),
    view,
    sounds: new DamageHalvedSounds(resources),
  };
}
