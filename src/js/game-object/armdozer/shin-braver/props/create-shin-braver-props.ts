import { ResourcesContainer } from "../../../../resource";
import { SEPlayerContainer } from "../../../../se/se-player";
import { createInitialValue } from "../model/initial-value";
import { ShinBraverSounds } from "../sounds/shin-braver-sounds";
import { ShinBraverView } from "../view/shin-braver-view";
import { ShinBraverProps } from "./shin-braver-props";

/** ShinBraverProps生成パラメータ */
export type PropsCreatorParams = ResourcesContainer & SEPlayerContainer & {
  /** ビュー */
  view: ShinBraverView;
};

/**
 * ShinBraverPropsを生成する
 * @param params 生成パラメータ
 * @return 生成結果
 */
export function createShinBraverProps(
  params: PropsCreatorParams,
): ShinBraverProps {
  const { resources } = params;
  return {
    ...params,
    model: createInitialValue(),
    sounds: new ShinBraverSounds(resources),
  };
}
