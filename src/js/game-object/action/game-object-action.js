// @flow

import {merge, Observable} from "rxjs";
import type {Update} from "../../game-loop/update";
import type {PreRender} from "../../game-loop/pre-render";
import type {OverlapEvent} from "../../render/overlap-event/overlap-event";
import {map, share} from "rxjs/operators";

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
export function gameObjectStream(update: Observable<Update>, preRender: Observable<PreRender>, overlap: Observable<OverlapEvent>): Observable<GameObjectAction> {
  return merge(update, preRender, overlap).pipe(
    map(v => {
      const ret: GameObjectAction = v;
      return ret;
    }),
    share()
  );
}