import { Howl } from "howler";

import type { Resources } from "../../../../resource";
import { SOUND_IDS } from "../../../../resource/sound/ids";

/**
 * ウィングドーザ関連の音
 */
export class WingDozerSounds {
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
