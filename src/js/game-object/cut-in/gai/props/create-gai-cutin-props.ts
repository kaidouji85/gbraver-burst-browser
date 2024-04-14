import { Resources } from "../../../../resource";
import { createInitialValue } from "../model/initial-value";
import { GaiSounds } from "../sounds/gai-sounds";
import { GaiView } from "../view/gai-view";
import { GaiCutInProps } from "./gai-cutin-props";

/** GaiCutInProps生成パラメータ */
export type GenerateGaiCutInPropsParams = {
  /** ビュー */
  view: GaiView;
  /** リソース管理オブジェクト */
  resources: Resources;
};

/**
 * GaiCutInPropsを生成する
 * @param params 生成パラメータ
 * @return 生成結果
 */
export function createGaiCutInProps(
  params: GenerateGaiCutInPropsParams,
): GaiCutInProps {
  const { resources, view } = params;
  return {
    model: createInitialValue(),
    view,
    sounds: new GaiSounds(resources),
  };
}
