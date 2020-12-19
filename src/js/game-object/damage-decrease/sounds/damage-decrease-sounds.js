// @flow

import {Howl} from 'howler';
import type {Resources} from "../../../resource";
import {SOUND_IDS} from "../../../resource/sound";

/**
 * ダメージ減少 効果音
 */
export class DamageDecreaseSounds {
  benefitEffect: typeof Howl;

  constructor(resources: Resources) {
    this.benefitEffect = resources.sounds
      .find(v => v.id === SOUND_IDS.BENEFIT_EFFECT)
      ?.sound ?? new Howl();
  }
}