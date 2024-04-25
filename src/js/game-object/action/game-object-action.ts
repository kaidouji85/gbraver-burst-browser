import { merge, Observable, share } from "rxjs";

import type { PreRender } from "../../game-loop/pre-render";
import type { Update } from "../../game-loop/update";
import type { OverlapEvent } from "../../render/overlap-event/overlap-event";

/** 全てのゲームオブジェクトが受け取り可能なアクション */
export type GameObjectAction = Update | PreRender | OverlapEvent;

/**
 * ゲームオブジェクトアクションストリームを生成する
 *
 * @param update アップデート
 * @param preRender プリレンダー
 * @param overlap 当たり判定
 * @returns 生成したストリーム
 */
export function gameObjectStream(
  update: Observable<Update>,
  preRender: Observable<PreRender>,
  overlap: Observable<OverlapEvent>,
): Observable<GameObjectAction> {
  return merge(update, preRender, overlap).pipe(share());
}
