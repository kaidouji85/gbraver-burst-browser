import { ResourcesContainer } from "../../../resource";
import { SEPlayer } from "../../../se/se-player";
import { createInitialValue } from "../model/initial-value";
import { ContinuousAttackSounds } from "../sounds/continuous-attack-sounds";
import { ContinuousAttackView } from "../view/continuous-attack-view";
import { ContinuousAttackProps } from "./continuous-attack-props";

/** ContinuousAttackProps生成パラメータ */
export type PropsCreatorParams = ResourcesContainer & {
  /** ビュー */
  view: ContinuousAttackView;
  /** SE再生オブジェクト */
  se: SEPlayer;
};

/**
 * ContinuousAttackPropsを生成する
 * @param params 生成パラメータ
 * @return 生成したContinuousAttackProps
 */
export function createContinuousAttackProps(
  params: PropsCreatorParams,
): ContinuousAttackProps {
  const { resources } = params;
  return {
    ...params,
    model: createInitialValue(),
    sounds: new ContinuousAttackSounds(resources),
  };
}
