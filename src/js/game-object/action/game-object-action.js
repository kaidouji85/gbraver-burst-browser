// @flow

import {merge, Observable} from "rxjs";
import type {Update} from "../../game-loop/update";
import type {PreRender} from "../../game-loop/pre-render";
import type {OverlapEvent} from "../../render/overlap-event/overlap-event";
import {share} from "rxjs/operators";
import type {Stream} from "../../stream/core";
import {toStream} from "../../stream/rxjs";

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
  const origin = [update, preRender, overlap]
    .map(v => v.getRxjsObservable())
    .map(v => ((v: any): Observable<GameObjectAction>));  // TODO rxjsのflow-typedを廃止したら、この行は消す
  const merged = merge(...origin)
    .pipe(share());
  return toStream(merged);
}
