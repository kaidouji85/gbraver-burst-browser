import { filter, first, map, Observable } from "rxjs";

import type { Update } from "../../game-loop/update";
import type { GameObjectAction } from "./game-object-action";

/**
 * 初回だけ発火するUpdateストリームを生成する
 *
 * @param gameObjectAction ストリーム生成元
 * @returns 生成結果
 */
export function firstUpdate(
  gameObjectAction: Observable<GameObjectAction>,
): Observable<Update> {
  return gameObjectAction.pipe(
    filter((v) => v.type === "Update"),
    map((v) => v as Update),
    first(),
  );
}
