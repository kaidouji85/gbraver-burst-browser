import { createInitialValue } from "../model/initial-value";
import { LightningDozerCutInView } from "../view/lightning-dozer-cutin-view";
import { LightningDozerCutInProps } from "./lightning-dozer-cutin-props";

/** LightningDozerCutInProps生成パラメータ */
export type PropsCreatorParams = {
  /** ビュー */
  view: LightningDozerCutInView;
};

/**
 * LightningDozerCutInPropsを生成する
 * @param params 生成パラメータ
 * @return 生成したLightningDozerCutInProps
 */
export function createLightningDozerCutInProps(
  params: PropsCreatorParams,
): LightningDozerCutInProps {
  const { view } = params;
  return {
    model: createInitialValue(),
    view,
  };
}
