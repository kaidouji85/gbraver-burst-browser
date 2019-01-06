// @flow

import {NeoLandozerModel} from "../model/neo-landozer-model";
import {Animate} from "../../../../animation/animate";
import {process} from "../../../../animation/process";
import {tween} from "../../../../animation/tween";

/** 避ける */
export function avoid(model: NeoLandozerModel): Animate {
  return process(() => {
    model.animation.frame = 0;
    model.animation.type = 'STAND';
  }).chain(
    tween(model.position, t =>
      t.to({x: '+50', z: '-50'}, 150))
  ).chain(
    tween(model.position, t =>
      t.to({x: '-50', z: '+50'}, 150))
  );
}