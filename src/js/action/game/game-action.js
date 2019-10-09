// @flow

import type {EndBattle} from "./end-battle";
import type {EndTitle} from "./end-title";

/** ゲーム全体に関連するアクション */
export type GameAction = EndBattle | EndTitle;