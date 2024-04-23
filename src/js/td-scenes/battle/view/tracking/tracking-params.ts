import { PlayerId } from "gbraver-burst-core";

import { DOMLayer } from "../dom";
import { HUDLayer } from "../hud";
import { ThreeDimensionLayer } from "../td";

/** トラッキングのパラメータ */
export type TrackingParams = {
  /** 3Dレイヤー */
  readonly td: ThreeDimensionLayer;
  /** HUDレイヤー */
  readonly hud: HUDLayer;
  /** DOMレイヤー */
  readonly dom: DOMLayer;
  /** アクティブプレイヤー */
  readonly activePlayerId: PlayerId;
  /** レンダリング対象のDOM */
  readonly rendererDOM: HTMLElement;
};
