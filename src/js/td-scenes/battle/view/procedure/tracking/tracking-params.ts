import { PlayerId } from "gbraver-burst-core";

import { HUDLayer } from "../../hud";
import { TDLayer } from "../../td";

/** トラッキングのパラメータ */
export type TrackingParams = {
  /** 3Dレイヤー */
  readonly td: TDLayer;
  /** HUDレイヤー */
  readonly hud: HUDLayer;
  /** 現在画面を開いているプレイヤーのID */
  readonly playerId: PlayerId;
  /** レンダリング対象のDOM */
  readonly rendererDOM: HTMLElement;
};
