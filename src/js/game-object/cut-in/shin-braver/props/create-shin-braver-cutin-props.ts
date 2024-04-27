import { createInitialValue } from "../model/initial-value";
import { ShinBraverCutInView } from "../view/shin-braver-cutin-view";
import { ShinBraverCutInProps } from "./shin-braver-cutin-props";

/** 生成パラメータ */
export type PropsCreatorParams = {
  /** ビュー */
  view: ShinBraverCutInView;
};

/**
 * ShinBraverCutInPropsを生成する
 * @param params 生成パラメータ
 * @returns 生成結果
 */
export function createShinBraverCutInProps(
  params: PropsCreatorParams,
): ShinBraverCutInProps {
  const { view } = params;
  return {
    model: createInitialValue(),
    view,
  };
}
