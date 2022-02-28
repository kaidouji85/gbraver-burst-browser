// @flow

import {Animate} from "../../../animation/animate";
import type {TurnStartModel} from "../model/turn-start-model";
import {process} from "../../../animation/process";
import {all} from "../../../animation/all";
import {tween} from "../../../animation/tween";
import {TurnStartSounds} from "../sounds/turn-start-sounds";

/**
 * 表示アニメーション
 *
 * @param model モデル
 * @return アニメーション
 */
export function show(model: TurnStartModel): Animate {
  return process(() => {
    model.opacity = 0;
    model.position.x = 200;
  })
    .chain(all(
      tween(model, t => t.to({opacity: 1}, 400)),
      tween(model.position, t => t.to({x: 0}, 400))
    ))
}

/**
 * 音付きで表示する
 *
 * @param model モデル
 * @param sounds 効果音
 * @return アニメーション
 */
export function showWithSound(model: TurnStartModel, sounds: TurnStartSounds): Animate {
  return all(
    show(model),
    process(() => {
      sounds.batteryRecover.play()
    })
  );
}