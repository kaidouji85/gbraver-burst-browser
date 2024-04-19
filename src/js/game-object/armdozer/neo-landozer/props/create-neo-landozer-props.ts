import { ResourcesContainer } from "../../../../resource";
import { SEPlayerContainer } from "../../../../se/se-player";
import { createInitialValue } from "../model/initial-value";
import { NeoLandozerSounds } from "../sounds/neo-landozer-sounds";
import { NeoLandozerView } from "../view/neo-landozer-view";
import { NeoLandozerProps } from "./neo-landozer-props";

/** NeoLandozerProps生成パラメータ */
export type PropsCreatorParams = ResourcesContainer &
  SEPlayerContainer & {
    /** ビュー */
    view: NeoLandozerView;
  };

/**
 * NeoLandozerPropsを生成する
 * @param params 生成パラメータ
 * @return 生成結果
 */
export function createNeoLandozerProps(
  params: PropsCreatorParams,
): NeoLandozerProps {
  const { resources } = params;
  return {
    ...params,
    model: createInitialValue(),
    sounds: new NeoLandozerSounds(resources),
  };
}
