// @flow

import {Animate} from "../../../../animation/animate";
import type {LightningBarrierModel} from "../model/lightning-barrier-model";
import {tween} from "../../../../animation/tween";
import {LightningBarrierSounds} from "../sounds/lightning-barrier-sounds";
import {process} from '../../../../animation/process';

/**
 * バリアを表示する
 *
 * @param model モデル
 * @param sounds 効果音
 * @return アニメーション
 */
export function show(model: LightningBarrierModel, sounds: LightningBarrierSounds): Animate {
  return process(() => {
    sounds.lightningBarrier.play();
  })
    .chain(tween(model, t => t.to({opacity: 1}, 1000))
    )
}