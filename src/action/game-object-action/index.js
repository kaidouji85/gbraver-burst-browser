// @flow

import type {SpriteGameLoop} from "../sprite-game-loop/sprite-game-loop";
import type {OverlapAction} from "../overlap";
import type {Update} from "../game-loop/update";
import type {PreRender} from "../game-loop/pre-render";

/** 全てのゲームオブジェクトが受け取り可能なアクション */
export type GameObjectAction = Update | PreRender | SpriteGameLoop | OverlapAction;