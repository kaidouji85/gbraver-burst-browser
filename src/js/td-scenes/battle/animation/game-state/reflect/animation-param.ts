import type { PlayerState, Reflect } from "gbraver-burst-core";

import type { ArmdozerSprite } from "../../../../../game-object/armdozer/armdozer-sprite";
import { HUDPlayer } from "../../../view/hud/player";
import type { TDPlayer } from "../../../view/td/player";

/** ダメージ反射アニメーション パラメータ */
export type ReflectAnimationParam = {
  /** ダメージ反射効果 */
  readonly effect: Reflect;
  /** ダメージを受けた側 */
  readonly damaged: {
    /** ダメージ反射後のステート */
    readonly state: PlayerState;
    /** スプライト */
    readonly sprite: ArmdozerSprite;
    /** 3Dプレイヤーオブジェクト */
    readonly td: TDPlayer;
    /** HUDプレイヤーオブジェクト */
    readonly hud: HUDPlayer;
  };
  /** ダメージ反射をした側 */
  readonly reflecting: {
    /** HUDプレイヤーオブジェクト */
    readonly hud: HUDPlayer;
  };
};
