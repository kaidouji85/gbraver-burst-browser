import { ResourcesContainer } from "../../../resource";
import { SEPlayerContainer } from "../../../se/se-player";
import { createInitialValue } from "../model/initial-value";
import { PowerUpSounds } from "../sounds/power-up-sounds";
import { PowerUpView } from "../view/power-up-view";
import { PowerUpProps } from "./power-up-props";

/** PowerUpProps 生成パラメータ */
export type PropsCreatorParams = ResourcesContainer &
  SEPlayerContainer & {
    /** ビュー */
    view: PowerUpView;
  };

/**
 * PowerUpPropsを生成する
 * @param params 生成パラメータ
 * @returns 生成したPowerUpProps
 */
export function createPowerUpProps(params: PropsCreatorParams): PowerUpProps {
  const { resources } = params;
  return {
    ...params,
    model: createInitialValue(),
    sounds: new PowerUpSounds(resources),
  };
}
