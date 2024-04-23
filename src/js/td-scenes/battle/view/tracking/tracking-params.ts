import { PlayerId } from "gbraver-burst-core";

import { HUDLayer } from "../hud";
import { ThreeDimensionLayer } from "../td";

/** トラッキングのパラメータ */
export type TrackingParams = {
  /** 3Dレイヤー */
  readonly td: ThreeDimensionLayer;
  /** HUDレイヤー */
  readonly hud: HUDLayer;
  /** アクティブプレイヤー */
  readonly activePlayerId: PlayerId;
  /** レンダリング対象のDOM */
  readonly rendererDOM: HTMLElement;
};
