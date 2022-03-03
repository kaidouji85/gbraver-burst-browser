// @flow

import {Howl} from 'howler';
import type {Resources} from "../../../../resource";
import {SOUND_IDS} from "../../../../resource/sound";

/**
 * 戦闘シーン 効果音
 */
export class BattleSceneSounds {
  batteryDeclaration: typeof Howl;
  batteryRecover: typeof Howl;

  constructor(resources: Resources) {
    this.batteryDeclaration = resources.sounds.find(v => v.id === SOUND_IDS.BATTERY_DECLARATION)?.sound ?? new Howl();
    this.batteryRecover = resources.sounds.find(v => v.id === SOUND_IDS.BATTERY_RECOVER)?.sound ?? new Howl();
  }
}