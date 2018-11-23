// @flow

import {NeoLandozerModel} from "../model/neo-landozer-model";
import {Animate} from "../../../../animation/animate";
import {process} from "../../../../animation/process";
import {tween} from "../../../../animation/tween";
import {Tween} from '@tweenjs/tween.js';

/** ノックバックからの復帰 */
export function recoverKnockBack(model: NeoLandozerModel): Animate {
  return process(() => {
    model.animation.frame = 1;
    model.animation.type = 'KNOCK_BACK';
  }).chain(
    tween(new Tween(model.animation)
      .to({frame: 0}, 500)
    )
  );
}