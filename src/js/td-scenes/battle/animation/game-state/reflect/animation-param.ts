import { PlayerState, Reflect } from "gbraver-burst-core";

import { BGMManagerContainer } from "../../../../../bgm/bgm-manager";
import { ArmdozerSprite } from "../../../../../game-object/armdozer/armdozer-sprite";
import { TDCamera } from "../../../../../game-object/camera/td";
import { ResultIndicator } from "../../../../../game-object/result-indicator/result-indicator";
import { SoundResource } from "../../../../../resource/sound/resource";
import { SEPlayerContainer } from "../../../../../se/se-player";
import { HUDPlayer } from "../../../view/hud/player";
import { TDPlayer } from "../../../view/td/player";

/** ダメージ反射アニメーション パラメータ */
export type ReflectAnimationParam = BGMManagerContainer &
  SEPlayerContainer & {
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
      /** ダメージ反射後のステート */
      readonly state: PlayerState;
      /** HUDプレイヤーオブジェクト */
      readonly hud: HUDPlayer;
    };

    /** 3Dカメラ */
    readonly tdCamera: TDCamera;

    /** 大爆発SE */
    readonly bigExplosion: SoundResource;
  };
