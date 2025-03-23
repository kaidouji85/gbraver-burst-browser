import { createInitialValue } from "../model/initial-value";
import { IneffectiveView } from "../view/ineffective-view";
import { IneffectiveProps } from "./ineffective-props";

/** IneffectiveProps 生成オプション */
export type PropsCreatorOptions = {
  /** ビュー */
  view: IneffectiveView;
};

/**
 * IneffectivePropsを生成する
 * @param options 生成オプション
 * @returns 生成したIneffectiveProps
 */
export function createIneffectiveProps(
  options: PropsCreatorOptions,
): IneffectiveProps {
  return {
    ...options,
    model: createInitialValue(),
  };
}
