import { Resources } from "../../../../resource";
import { createInitialValue } from "../model/initial-value";
import { createGenesisBraverSounds } from "../sounds/genesis-braver-sounds";
import { GenesisBraverView } from "../view/genesis-braver-view";
import { GenesisBraverProps } from "./genesis-braver-props";
import {SEPlayer} from "../../../../se/se-player";

/** GenesisBraverProps生成パラメータ */
export type GenerateGenesisBraverPropsParams = {
  /** ビュー */
  view: GenesisBraverView;
  /** リソース管理オブジェクト */
  resources: Resources;
  /** SE再生 */
  se: SEPlayer;
};

/**
 * GenesisBraverPropsを生成する
 * @param params 生成パラメータ
 * @return 生成結果
 */
export function createGenesisBraverProps(
  params: GenerateGenesisBraverPropsParams,
): GenesisBraverProps {
  const { resources, view, se } = params;
  return {
    view,
    se,
    sounds: createGenesisBraverSounds(resources),
    model: createInitialValue(),
  };
}
