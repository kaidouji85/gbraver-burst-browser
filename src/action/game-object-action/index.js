// @flow

import type {GameLoop} from "../game-loop/game-loop";
import type {SpriteGameLoop} from "../sprite-game-loop/sprite-game-loop";
import type {OverlapAction} from "../overlap";

/** 全てのゲームオブジェクトが受け取り可能なアクション */
export type GameObjectAction = GameLoop | SpriteGameLoop | OverlapAction;