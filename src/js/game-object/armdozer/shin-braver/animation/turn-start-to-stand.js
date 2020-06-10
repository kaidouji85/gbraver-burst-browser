// @flow

import {Animate} from "../../../../animation/animate";
import type {ShinBraverModel} from "../model/shin-braver-model";
import {process} from "../../../../animation/process";
import {tween} from "../../../../animation/tween";
import {ShinBraverSounds} from "../sounds/shin-braver-sounds";
import {delay} from "../../../../animation/delay";

/** ターンスタート -> 立ち */
export function turnStartToStand(model: ShinBraverModel, sounds: ShinBraverSounds): Animate {
  return process(() => {
    model.animation.type = 'GUTS_DOWN';
    model.animation.frame = 1;
    sounds.motor.play();
  })
    .chain(tween(model.animation, t => t.to({frame: 0}, 300)))
    .chain(process(() => {
      model.animation.type = 'GUTS_UP';
      model.animation.frame = 1;
    }))
    .chain(delay(300))
    .chain(process(() => {
      sounds.motor.play();
    }))
    .chain(tween(model.animation, t => t.to({frame: 0}, 300)))
    .chain(process(() => {
      model.animation.type = 'STAND';
      model.animation.frame = 0;
    }));
}