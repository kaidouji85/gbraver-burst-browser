import { createInitialValue } from "../model/initial-value";
import { NeoLandozerCutInView } from "../view/neo-landozer-cutin-view";
import { NeoLandozerCutInProps } from "./neo-landozer-cutin-props";

/** NeoLandozerCutInProps生成パラメータ */
export type PropsCreatorParams = {
  /** ビュー */
  view: NeoLandozerCutInView;
};

/**
 * NeoLandozerCutInPropsを生成する
 * @param params 生成パラメータ
 * @returns 生成結果
 */
export function createNeoLandozerCutInProps(
  params: PropsCreatorParams,
): NeoLandozerCutInProps {
  const { view } = params;
  return {
    model: createInitialValue(),
    view,
  };
}
