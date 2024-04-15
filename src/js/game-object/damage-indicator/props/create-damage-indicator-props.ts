import { createInitialValue } from "../model/initial-value";
import { DamageIndicatorView } from "../view/damage-indicator-view";
import { DamageIndicatorProps } from "./damage-indicator-props";

/** DamageIndicatorProps生成パラメータ */
export type PropsCreatorParams = {
  /** ビュー */
  view: DamageIndicatorView;
};

/**
 * DamageIndicatorPropsを生成する
 * @param params 生成パラメータ
 * @return 生成結果
 */
export function createDamageIndicatorProps(
  params: PropsCreatorParams,
): DamageIndicatorProps {
  const { view } = params;
  return {
    model: createInitialValue(),
    view,
  };
}
