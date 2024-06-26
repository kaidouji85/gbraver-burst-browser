import { ResourcesContainer } from "../../../../resource";
import { SEPlayerContainer } from "../../../../se/se-player";
import { createInitialValue } from "../model/initial-value";
import { createGenesisBraverSounds } from "../sounds/genesis-braver-sounds";
import { GenesisBraverView } from "../view/genesis-braver-view";
import { GenesisBraverProps } from "./genesis-braver-props";

/** GenesisBraverProps生成パラメータ */
export type PropsCreatorParams = ResourcesContainer &
  SEPlayerContainer & {
    /** ビュー */
    view: GenesisBraverView;
  };

/**
 * GenesisBraverPropsを生成する
 * @param params 生成パラメータ
 * @returns 生成結果
 */
export function createGenesisBraverProps(
  params: PropsCreatorParams,
): GenesisBraverProps {
  return {
    ...params,
    sounds: createGenesisBraverSounds(params),
    model: createInitialValue(),
  };
}
