// @flow

import type {Update} from "../../game-loop/update";
import type {PreRender} from "../../game-loop/pre-render";
import type {OverlapEvent} from "../../render/overlap-event/overlap-event";
import type {Stream} from "../../stream/core";
import {merge, map, share} from "../../stream/operator";

/** 全てのゲームオブジェクトが受け取り可能なアクション */
export type GameObjectAction = Update | PreRender | OverlapEvent;

/**
 * ゲームオブジェクトアクションストリームを生成する
 *
 * @param update アップデート
 * @param preRender プリレンダー
 * @param overlap 当たり判定
 * @return 生成したストリーム
 */
export function gameObjectStream(update: Stream<Update>, preRender: Stream<PreRender>, overlap: Stream<OverlapEvent>): Stream<GameObjectAction> {
  return update
    .chain(merge(preRender))
    .chain(merge(overlap))
    .chain(map(v => (v: GameObjectAction)))
    .chain(share());
}
