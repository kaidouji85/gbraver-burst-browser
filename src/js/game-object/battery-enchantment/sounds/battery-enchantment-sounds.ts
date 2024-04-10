import type { Resources } from "../../../resource";
import { createEmptySoundResource } from "../../../resource/sound/empty-sound-resource";
import { SOUND_IDS } from "../../../resource/sound/ids";
import { SoundResource } from "../../../resource/sound/resource";

/** バッテリー増強 効果音 */
export class BatteryEnchantmentSounds {
  /** メリット効果 */
  benefitEffect: SoundResource;

  constructor(resources: Resources) {
    this.benefitEffect =
      resources.sounds.find((v) => v.id === SOUND_IDS.BENEFIT_EFFECT) ??
      createEmptySoundResource();
  }
}
