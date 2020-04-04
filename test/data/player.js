// @flow

import type {Player} from "gbraver-burst-core/lib/player/player";
import {EMPTY_ARMDOZER} from "./armdozer";

/** 空のプレイヤー */
export const EMPTY_PLAYER: Player = {
  playerId: '',
  armdozer: EMPTY_ARMDOZER
};