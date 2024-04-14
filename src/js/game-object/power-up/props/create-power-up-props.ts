import { Resources } from "../../../resource";
import { createInitialValue } from "../model/initial-value";
import { PowerUpSounds } from "../sounds/power-up-sounds";
import { PowerUpView } from "../view/power-up-view";
import { PowerUpProps } from "./power-up-props";

/** PowerUpProps 生成パラメータ */
export type GeneratePowerUpPropsParams = {
  /** ビュー */
  view: PowerUpView;
  /** リソース管理オブジェクト */
  resources: Resources;
};

/**
 * PowerUpPropsを生成する
 * @param params 生成パラメータ
 * @return 生成したPowerUpProps
 */
export function createPowerUpProps(
  params: GeneratePowerUpPropsParams,
): PowerUpProps {
  const { view, resources } = params;
  return {
    model: createInitialValue(),
    view,
    sounds: new PowerUpSounds(resources),
  };
}
