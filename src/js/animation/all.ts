import { Animate } from "./animate";
import { empty } from "./delay";

/**
 * 全てのアニメーションが完了してから次に進む
 *
 * @param animations 再生待ちをするアニメーション
 * @returns アニメーション
 */
export function all(...animations: Animate[]): Animate {
  const next = animations.reduce(
    (a, b) => (a._time < b._time ? b : a),
    empty(),
  );
  const parallels = animations.filter((v) => v !== next);
  return empty().chain(next, ...parallels);
}
