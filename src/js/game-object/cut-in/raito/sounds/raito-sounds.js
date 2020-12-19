// @flow

import {Howl} from 'howler';
import type {Resources} from "../../../../resource";
import {SOUND_IDS} from "../../../../resource/sound";

/**
 * ライト カットイン 効果音
 */
export class RaitoSounds {
  benefitEffect: typeof Howl;

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    this.benefitEffect = resources.sounds
      .find(v => v.id === SOUND_IDS.BENEFIT_EFFECT)
      ?.sound ?? new Howl();
  }
}