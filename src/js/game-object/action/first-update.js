// @flow

import type {Stream} from "../../stream/core";
import type {GameObjectAction} from "./game-object-action";
import type {Update} from "../../game-loop/update";
import {filter, map, first} from "../../stream/operator";

/**
 * 初回だけ発火するUpdateストリームを生成する
 *
 * @param gameObjectAction ストリーム生成元
 * @return 生成結果
 */
export function firstUpdate(gameObjectAction: Stream<GameObjectAction>): Stream<Update> {
  return gameObjectAction
    .chain(filter(v => v.type === 'Update'))
    .chain(map(v => ((v: any): Update)))
    .chain(first());
}