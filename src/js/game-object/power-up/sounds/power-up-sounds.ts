import { Howl } from "howler";

import type { Resources } from "../../../resource";
import { SOUND_IDS } from "../../../resource/sound/ids";

/**
 * ポップアップ 効果音
 */
export class PowerUpSounds {
  benefitEffect: Howl;

  constructor(resources: Resources) {
    this.benefitEffect =
      resources.sounds.find((v) => v.id === SOUND_IDS.BENEFIT_EFFECT)?.sound ??
      new Howl({ src: "" });
  }
}
