import { createInitialValue } from "../model/initial-value";
import { WingDozerCutInView } from "../view/wing-dozer-cutin-view";
import { WingDozerCutInProps } from "./wing-dozer-cutin-props";

/** ウィングドーザ カットイン プロパティ 生成パラメータ */
export type PropsCreatorParams = {
  /** ビュー */
  view: WingDozerCutInView;
};

/**
 * WingDozerCutInPropsを生成する
 * @param params 生成パラメータ
 * @returns 生成結果
 */
export function createWingDozerCutInProps(
  params: PropsCreatorParams,
): WingDozerCutInProps {
  const { view } = params;
  return {
    model: createInitialValue(),
    view,
  };
}
