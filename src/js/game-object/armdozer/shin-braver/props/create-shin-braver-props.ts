import { Resources } from "../../../../resource";
import { createInitialValue } from "../model/initial-value";
import { ShinBraverSounds } from "../sounds/shin-braver-sounds";
import { ShinBraverView } from "../view/shin-braver-view";
import { ShinBraverProps } from "./shin-braver-props";

/** ShinBraverProps生成パラメータ */
export type GenerateShinBraverPropsParams = {
  /** ビュー */
  view: ShinBraverView;
  /** リソース管理オブジェクト */
  resources: Resources;
};

/**
 * ShinBraverPropsを生成する
 * @param params 生成パラメータ
 * @return 生成結果
 */
export function createShinBraverProps(params: GenerateShinBraverPropsParams): ShinBraverProps {
  const { view, resources } = params;
  return {
    view,
    model: createInitialValue(),
    sounds: new ShinBraverSounds(resources),
  };
}