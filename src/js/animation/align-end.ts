import { all } from "./all";
import { Animate } from "./animate";
import { delay } from "./delay";

/**
 * 終了時間ぞろえする
 * @param animations 終了時間ぞろえするアニメーション
 * @return アニメーション
 */
export function alignEnd(...animations: Animate[]): Animate {
  const maxDuration = Math.max(
    0,
    ...animations.map((animate) => animate._time),
  );
  return all(
    ...animations.map((animate) =>
      delay(maxDuration - animate._time).chain(animate),
    ),
  );
}
