import { PlayerId } from "gbraver-burst-core";

import { HUDLayer } from "../../hud";
import { TDLayer } from "../../td";

/** トラッキングのパラメータ */
export type TrackingParams = {
  /** 3Dレイヤー */
  readonly td: TDLayer;
  /** HUDレイヤー */
  readonly hud: HUDLayer;
  /** アクティブ プレイヤー */
  readonly activePlayerId: PlayerId;
  /** レンダリング対象のDOM */
  readonly rendererDOM: HTMLElement;
};
