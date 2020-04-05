// @flow

import type {PlayerState, Reflect} from "gbraver-burst-core";
import type {ArmDozerSprite} from "../../../../../../game-object/armdozer/armdozer-sprite";
import type {TDPlayer} from "../../../view/td/player";

/**
 * ダメージ反射アニメーション パラメータ
 */
export type ReflectAnimationParam = {
  effect: Reflect,
  state: PlayerState,
  sprite: ArmDozerSprite,
  tdPlayer: TDPlayer,
};