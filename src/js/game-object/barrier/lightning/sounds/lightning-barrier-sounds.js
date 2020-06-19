// @flow

import {Howl} from 'howler';
import type {Resources} from "../../../../resource";
import {SOUND_IDS} from "../../../../resource/sound";

/**
 * 電撃バリア 音
 */
export class LightningBarrierSounds {
  lightning: Howl;

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    const lightningResource = resources.sounds.find(v => v.id === SOUND_IDS.LIGHTNING);
    this.lightning = lightningResource
      ? lightningResource.sound
      : new Howl();
  }
}