// @flow

import {Animate} from "../../../animation/animate";
import {tween} from "../../../animation/tween";
import type {RecoverBatteryModel} from "../model/recover-battery-model";
import {delay} from "../../../animation/delay";

export function popUp(model: RecoverBatteryModel, battery: number): Animate {
  return tween(model, t => t
    .to({opacity: 0, value: battery}, 0)
  ).chain(
    tween(model, t => t
      .to({opacity: 1}, 300)
    )
  ).chain(
    delay(1000)
  ).chain(
    tween(model, t => t
      .to({opacity: 0}, 300)
    )
  )
}