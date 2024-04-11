import { Resources } from "../../../../resource";
import { createInitialValue } from "../model/initial-value";
import { createGenesisBraverSounds } from "../sounds/genesis-braver-sounds";
import { GenesisBraverView } from "../view/genesis-braver-view";
import { GenesisBraverProps } from "./genesis-braver-props";

/** GenesisBraverProps生成パラメータ */
export type GenerateGenesisBraverPropsParams = {
  /** ビュー */
  view: GenesisBraverView;
  /** リソース管理オブジェクト */
  resources: Resources;
};

/**
 * GenesisBraverPropsを生成する
 * @param params 生成パラメータ
 * @return 生成結果
 */
export function createGenesisBraverProps(
  params: GenerateGenesisBraverPropsParams,
): GenesisBraverProps {
  const { resources, view } = params;
  return {
    view,
    sounds: createGenesisBraverSounds(resources),
    model: createInitialValue(),
  };
}
