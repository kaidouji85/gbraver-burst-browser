import { Resources } from "../../../resource";
import { SEPlayer } from "../../../se/se-player";
import { createInitialValue } from "../model/initial-value";
import { DamageHalvedSounds } from "../sounds/damage-halved-sounds";
import { DamageHalvedView } from "../view/damage-halved-view";
import { DamageHalvedProps } from "./damage-halved-props";

/** ダメージ半減 プロパティ生成パラメータ */
export type PropsCreatorParams = {
  /** ビュー */
  view: DamageHalvedView;
  /** リソース管理オブジェクト */
  resources: Resources;
  /** SE再生オブジェクト */
  se: SEPlayer;
};

/**
 * ダメージ半減 プロパティを生成する
 * @param params パラメータ
 * @return 生成結果
 */
export function createDamageHalvedProps(
  params: PropsCreatorParams,
): DamageHalvedProps {
  const { resources } = params;
  return {
    ...params,
    model: createInitialValue(),
    sounds: new DamageHalvedSounds(resources),
  };
}
