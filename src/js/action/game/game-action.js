// @flow

import type {EndBattle} from "./end-battle";
import type {EndTitle} from "./end-title";
import type {EndHowToPlay} from "./end-how-to-play";

/** ゲーム全体に関連するアクション */
export type GameAction = EndBattle | EndTitle | EndHowToPlay;