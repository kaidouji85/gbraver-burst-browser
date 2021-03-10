// @flow

import type {Stream} from "../../stream/core";
import type {GameObjectAction} from "./game-object-action";
import type {Update} from "../../game-loop/update";
import {filter, map, first} from "rxjs/operators";
import {toStream} from "../../stream/rxjs";

/**
 * 初回だけ発火するUpdateストリームを生成する
 *
 * @param gameObjectAction ストリーム生成元
 * @return 生成結果
 */
export function firstUpdate(gameObjectAction: Stream<GameObjectAction>): Stream<Update> {
  const observable: any/*  TODO typeof Observable にする */ = gameObjectAction.getRxjsObservable();
  const firstUpdateRxjs = observable.pipe(
    filter(v => v.type === 'Update'),
    map(v => ((v: any): Update)),
    first()
  );
  return toStream(firstUpdateRxjs);
}