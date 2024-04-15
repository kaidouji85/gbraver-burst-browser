import { Resources } from "../../../../resource";
import { SEPlayer } from "../../../../se/se-player";
import { createInitialValue } from "../model/initial-value";
import { GaiSounds } from "../sounds/gai-sounds";
import { GaiView } from "../view/gai-view";
import { GaiCutInProps } from "./gai-cutin-props";

/** GaiCutInProps生成パラメータ */
export type PropsCreatorParams = {
  /** ビュー */
  view: GaiView;
  /** リソース管理オブジェクト */
  resources: Resources;
  /** 効果音再生オブジェクト */
  se: SEPlayer;
};

/**
 * GaiCutInPropsを生成する
 * @param params 生成パラメータ
 * @return 生成結果
 */
export function createGaiCutInProps(
  params: PropsCreatorParams,
): GaiCutInProps {
  const { resources } = params;
  return {
    ...params,
    model: createInitialValue(),
    sounds: new GaiSounds(resources),
  };
}
