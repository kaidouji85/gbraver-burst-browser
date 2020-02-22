// @flow

import type {EndBattle} from "./battle";
import type {EndTitle} from "./title";

/** ゲーム全体に関連するアクション */
export type GameAction = EndBattle | EndTitle;