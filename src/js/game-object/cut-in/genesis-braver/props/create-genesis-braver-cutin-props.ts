import { createInitialValue } from "../model/initial-value";
import { GenesisBraverCutInView } from "../view/genesis-braver-cutin-view";
import { GenesisBraverCutInProps } from "./genesis-braver-cutin-props";

/** GenesisBraverCutInProps生成パラメータ */
export type PropsCreatorParams = {
  /** ビュー */
  view: GenesisBraverCutInView;
};

/**
 * GenesisBraverCutInPropsを生成する
 * @param params 生成パラメータ
 * @returns 生成結果
 */
export function createGenesisBraverCutInProps(
  params: PropsCreatorParams,
): GenesisBraverCutInProps {
  const { view } = params;
  return {
    model: createInitialValue(),
    view,
  };
}
