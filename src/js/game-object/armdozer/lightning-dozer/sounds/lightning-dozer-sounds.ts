import { Howl } from "howler";

import type { Resources } from "../../../../resource";
import { SOUND_IDS } from "../../../../resource/sound/ids";

/**
 * ライトニングドーザ 音
 */
export class LightningDozerSounds {
  motor: Howl;

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    const motorResource = resources.sounds.find(
      (v) => v.id === SOUND_IDS.MOTOR,
    );
    this.motor = motorResource ? motorResource.sound : new Howl({ src: "" });
  }
}
