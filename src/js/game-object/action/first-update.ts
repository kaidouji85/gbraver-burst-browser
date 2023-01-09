import type { Update } from "../../game-loop/update";
import { filter, first, map } from "../../stream/operator";
import type { Stream } from "../../stream/stream";
import type { GameObjectAction } from "./game-object-action";

/**
 * 初回だけ発火するUpdateストリームを生成する
 *
 * @param gameObjectAction ストリーム生成元
 * @return 生成結果
 */
export function firstUpdate(
  gameObjectAction: Stream<GameObjectAction>
): Stream<Update> {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  return gameObjectAction
    .chain(filter((v) => v.type === "Update"))
    .chain(map((v) => v as any as Update))
    .chain(first());
  /* eslint-enable */
}
