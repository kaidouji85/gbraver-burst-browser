import type { PlayerState, Reflect } from "gbraver-burst-core";

import type { ArmdozerSprite } from "../../../../../game-object/armdozer/armdozer-sprite";
import { HUDPlayer } from "../../../view/hud/player";
import type { TDPlayer } from "../../../view/td/player";

/** ダメージ反射アニメーション パラメータ */
export type ReflectAnimationParam = {
  /** ダメージ反射効果 */
  effect: Reflect;

  /** ダメージを受けた側 */
  damaged: {
    /** ダメージ反射後のステート */
    state: PlayerState;

    /** スプライト */
    sprite: ArmdozerSprite;

    /** 3Dプレイヤーオブジェクト */
    td: TDPlayer;

    /** HUDプレイヤーオブジェクト */
    hud: HUDPlayer;
  };

  /** ダメージ反射をした側 */
  reflecting: {
    /** HUDプレイヤーオブジェクト */
    hud: HUDPlayer;
  };
};
