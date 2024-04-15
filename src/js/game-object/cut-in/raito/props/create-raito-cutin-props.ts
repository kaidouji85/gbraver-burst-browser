import { Resources } from "../../../../resource";
import { SEPlayer } from "../../../../se/se-player";
import { createInitialValue } from "../model/initial-value";
import { RaitoSounds } from "../sounds/raito-sounds";
import { RaitoView } from "../view/raito-view";
import { RaitoCutInProps } from "./raito-cutin-props";

/** 生成パラメータ */
export type PropsCreatorParams = {
  /** ビュー */
  view: RaitoView;
  /** リソース管理オブジェクト */
  resources: Resources;
  /** SE再生オブジェクト */
  se: SEPlayer;
};

/**
 * RaitoCutInPropsを生成する
 * @param params 生成パラメータ
 * @return 生成結果
 */
export function createRaitoCutInProps(
  params: PropsCreatorParams,
): RaitoCutInProps {
  const { resources } = params;
  return {
    ...params,
    model: createInitialValue(),
    sounds: new RaitoSounds(resources),
  };
}
