// @flow

import {Howl} from 'howler';
import type {Resources} from "../../../resource";
import {SOUND_IDS} from "../../../resource/sound";

/**
 * ターンスタート 効果音
 */
export class TurnStartSounds {
  batteryRecover: typeof Howl;

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    this.batteryRecover = resources.sounds.find(v => v.id === SOUND_IDS.BATTERY_RECOVER)?.sound ?? new Howl();
  }
}