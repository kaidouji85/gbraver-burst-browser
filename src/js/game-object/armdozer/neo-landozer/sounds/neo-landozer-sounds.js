// @flow

import {Howl} from 'howler';
import type {Resources} from "../../../../resource";
import {SOUND_IDS} from "../../../../resource/sound";

/**
 * ネオランドーザ 音
 */
export class NeoLandozerSounds {
  motor: typeof Howl;

  constructor(resources: Resources) {
    const motorResource = resources.sounds.find(v => v.id === SOUND_IDS.MOTOR);
    this.motor = motorResource
      ? motorResource.sound
      : new Howl();
  }
}