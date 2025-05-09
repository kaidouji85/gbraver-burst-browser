import { createInitialValue } from "../model/initial-value";
import { EffectClearView } from "../view/effect-clear-view";
import { EffectClearProps } from "./effect-clear-props";

/** EffectClearProps 生成オプション */
export type PropsCreatorOptions = {
  /** ビュー */
  view: EffectClearView;
};

/**
 * EffectClearPropsを生成する
 * @param options 生成オプション
 * @returns 生成したEffectClearProps
 */
export function createEffectClearProps(
  options: PropsCreatorOptions,
): EffectClearProps {
  return {
    ...options,
    model: createInitialValue(),
  };
}
