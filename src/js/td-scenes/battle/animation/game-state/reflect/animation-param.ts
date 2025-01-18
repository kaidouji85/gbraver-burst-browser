import { PlayerState, Reflect } from "gbraver-burst-core";

import { ArmdozerSprite } from "../../../../../game-object/armdozer/armdozer-sprite";
import { ResultIndicator } from "../../../../../game-object/result-indicator/result-indicator";
import { HUDPlayer } from "../../../view/hud/player";
import { TDPlayer } from "../../../view/td/player";

/** ダメージ反射アニメーション パラメータ */
export type ReflectAnimationParam = {
  /** ダメージ反射効果 */
  readonly effect: Reflect;
  /** 引き分けのリザルトインジケーター */
  readonly drawIndicator: ResultIndicator;
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
