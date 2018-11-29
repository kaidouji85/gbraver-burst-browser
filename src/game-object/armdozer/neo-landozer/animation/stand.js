// @flow

import {NeoLandozerModel} from "../model/neo-landozer-model";
import {Animate} from "../../../../animation/animate";
import {process} from "../../../../animation/process";

/** 立ちポーズにする */
export function stand(model: NeoLandozerModel): Animate {
  return process(() => {
    model.animation.frame = 0;
    model.animation.type = 'STAND';
  });
}