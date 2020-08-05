// @flow

import type {Player} from "gbraver-burst-core";
import {EMPTY_ARMDOZER} from "./armdozer";
import {EMPTY_PILOT} from "./pilot";

// TODO gbraver-burst-coreと共有する
/**
 * 空のプレイヤー
 */
export const EMPTY_PLAYER: Player = {
  playerId: 'emptyPlayer',
  armdozer: EMPTY_ARMDOZER,
  pilot: EMPTY_PILOT,
};