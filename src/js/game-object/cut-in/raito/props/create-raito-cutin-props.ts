import { Resources } from "../../../../resource";
import { createInitialValue } from "../model/initial-value";
import { RaitoSounds } from "../sounds/raito-sounds";
import { RaitoView } from "../view/raito-view";
import { RaitoCutInProps } from "./raito-cutin-props";

/** 生成パラメータ */
export type GenerateRaitoCutInPropsParams = {
  /** ビュー */
  view: RaitoView;
  /** リソース管理オブジェクト */
  resources: Resources;
};

/**
 * RaitoCutInPropsを生成する
 * @param params 生成パラメータ
 * @return 生成結果
 */
export function createRaitoCutInProps(
  params: GenerateRaitoCutInPropsParams,
): RaitoCutInProps {
  const { view, resources } = params;
  return {
    model: createInitialValue(),
    view,
    sounds: new RaitoSounds(resources),
  };
}
