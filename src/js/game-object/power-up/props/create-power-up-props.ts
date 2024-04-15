import { Resources } from "../../../resource";
import { SEPlayer } from "../../../se/se-player";
import { createInitialValue } from "../model/initial-value";
import { PowerUpSounds } from "../sounds/power-up-sounds";
import { PowerUpView } from "../view/power-up-view";
import { PowerUpProps } from "./power-up-props";

/** PowerUpProps 生成パラメータ */
export type PropsCreatorParams = {
  /** ビュー */
  view: PowerUpView;
  /** リソース管理オブジェクト */
  resources: Resources;
  /** SE再生オブジェクト */
  se: SEPlayer;
};

/**
 * PowerUpPropsを生成する
 * @param params 生成パラメータ
 * @return 生成したPowerUpProps
 */
export function createPowerUpProps(
  params: PropsCreatorParams,
): PowerUpProps {
  const { resources } = params;
  return {
    ...params,
    model: createInitialValue(),
    sounds: new PowerUpSounds(resources),
  };
}
