import { Resources } from "../../../../resource";
import { createInitialValue } from "../model/initial-value";
import { NeoLandozerSounds } from "../sounds/neo-landozer-sounds";
import { NeoLandozerView } from "../view/neo-landozer-view";
import { NeoLandozerProps } from "./neo-landozer-props";

/** NeoLandozerProps生成パラメータ */
export type GenerateNeoLandozerPropsParams = {
  /** リソース管理オブジェクト */
  resources: Resources;
  /** ビュー */
  view: NeoLandozerView;
};

/**
 * NeoLandozerPropsを生成する
 * @param params 生成パラメータ
 * @return 生成結果
 */
export function createNeoLandozerProps(
  params: GenerateNeoLandozerPropsParams,
): NeoLandozerProps {
  const { resources, view } = params;
  return {
    view,
    model: createInitialValue(),
    sounds: new NeoLandozerSounds(resources),
  };
}
