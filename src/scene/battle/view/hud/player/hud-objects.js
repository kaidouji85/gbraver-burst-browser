// @flow

import type {PlayerId} from "gbraver-burst-core/lib/player/player";
import {Gauge} from "../../../../../game-object/gauge/gauge";

/** HUDレイヤーのプレイヤー関連オブジェクト */
export type HUDObjects = {
  playerId: PlayerId,
  gauge: Gauge,
};
