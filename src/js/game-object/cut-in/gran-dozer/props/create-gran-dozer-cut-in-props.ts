import { createInitialValue } from "../model/initial-value";
import { GranDozerCutInView } from "../view/gran-dozer-cut-in-view";
import { GranDozerCutInProps } from "./gran-dozer-cut-in-props";

/** GranDozerCutInProps生成オプション */
export type PropsCreatorOptions = {
  /** ビュー */
  view: GranDozerCutInView;
};

/**
 * GranDozerCutInPropsを生成する
 * @param options 生成オプション
 * @returns 生成結果
 */
export function createGranDozerCutInProps(
  options: PropsCreatorOptions,
): GranDozerCutInProps {
  const { view } = options;
  return {
    model: createInitialValue(),
    view,
  };
}
