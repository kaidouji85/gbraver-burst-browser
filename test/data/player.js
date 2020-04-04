// @flow

import type {Player} from "gbraver-burst-core";
import {EMPTY_ARMDOZER} from "./armdozer";

// TODO gbraver-burst-coreと共有する
/**
 * 空のプレイヤー
 */
export const EMPTY_PLAYER: Player = {
  playerId: '',
  armdozer: EMPTY_ARMDOZER
};