// @flow

import {Howl} from 'howler';
import type {Resources} from "../../../../resource";
import {SOUND_IDS} from "../../../../resource/sound";

/**
 * シンヤ カットイン 効果音
 */
export class ShinyaSounds {
  pilotSkill: typeof Howl;

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    this.pilotSkill = resources.sounds
      .find(v => v.id === SOUND_IDS.PILOT_SKILL)
      ?.sound ?? new Howl();
  }
}