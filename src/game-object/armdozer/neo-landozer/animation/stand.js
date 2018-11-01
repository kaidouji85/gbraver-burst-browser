// @flow

import {Group, Tween} from '@tweenjs/tween.js';
import {NeoLandozerModel} from "../model/neo-landozer-model";
import {createEmptyTweenByGroup} from "../../../../depricated-tween/empty-tween";

/** 立ちポーズにする */
export function stand(model: NeoLandozerModel, group: Group): Tween {
  return createEmptyTweenByGroup(group)
    .onStart(() => {
      model.animation.frame = 0;
      model.animation.type = 'STAND';
    });
}