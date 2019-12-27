// @flow

import {merge, Observable} from "rxjs";
import type {GameObjectAction} from "./index";
import type {Update} from "../game-loop/update";
import type {PreRender} from "../game-loop/pre-render";
import type {OverlapAction} from "../overlap";
import {map, share, tap} from "rxjs/operators";

/**
 * ゲームオブジェクトアクションストリームを生成する
 *
 * @param update アップデート
 * @param preRender プリレンダー
 * @param overlap 当たり判定
 * @return 生成したストリーム
 */
export function gameObjectStream(update: Observable<Update>, preRender: Observable<PreRender>, overlap: Observable<OverlapAction>): Observable<GameObjectAction> {
  return merge(update, preRender, overlap).pipe(
    map(v => {
      const ret: GameObjectAction = v;
      return ret;
    }),
    share()
  );
}