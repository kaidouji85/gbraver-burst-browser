import { Howl } from "howler";

import type { Resources } from "../../../../resource";
import { SOUND_IDS } from "../../../../resource/sound/ids";

/**
 * ネオランドーザ 音
 */
export class NeoLandozerSounds {
  motor: Howl;

  constructor(resources: Resources) {
    const motorResource = resources.sounds.find(
      (v) => v.id === SOUND_IDS.MOTOR,
    );
    this.motor = motorResource ? motorResource.sound : new Howl({ src: "" });
  }
}
