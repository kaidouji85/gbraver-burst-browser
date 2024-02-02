import { all } from "../../../../animation/all";
import { Animate } from "../../../../animation/animate";
import { empty } from "../../../../animation/delay";
import { onStart } from "../../../../animation/on-start";
import { tween } from "../../../../animation/tween";
import type { ShinBraverModel } from "../model/shin-braver-model";

/** ノックバック */
export function knockBack(model: ShinBraverModel): Animate {
  const motion = onStart(() => {
    model.animation.frame = 1;
    model.animation.type = "KNOCK_BACK";
  });
  const position = tween(model.position, (t) =>
    t.to(
      {
        x: "+20",
      },
      100,
    ),
  ).chain(
    tween(model.position, (t) =>
      t.to(
        {
          x: "-20",
        },
        100,
      ),
    ),
  );
  return empty().chain(all(motion, position));
}
