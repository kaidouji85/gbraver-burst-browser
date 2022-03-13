// @flow

import {Howl} from 'howler';
import type {Resources} from "../../../../resource";
import {createEmptySoundResource, SOUND_IDS} from "../../../../resource/sound";
import type {SoundId, SoundResource} from "../../../../resource/sound";

/** 戦闘シーン 効果音 */
export class BattleSceneSounds {
  batteryDeclaration: typeof Howl;
  batteryRecover: typeof Howl;
  bgm: SoundResource;

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   * @param playingBGM 再生するBGMのID
   */
  constructor(resources: Resources, playingBGM: SoundId) {
    this.batteryDeclaration = resources.sounds.find(v => v.id === SOUND_IDS.BATTERY_DECLARATION)?.sound ?? new Howl();
    this.batteryRecover = resources.sounds.find(v => v.id === SOUND_IDS.BATTERY_RECOVER)?.sound ?? new Howl();
    this.bgm = resources.sounds.find(v => v.id === playingBGM) ?? createEmptySoundResource();
  }
}