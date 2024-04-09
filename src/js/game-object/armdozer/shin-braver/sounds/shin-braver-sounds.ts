import { Howl } from "howler";

import type { Resources } from "../../../../resource";
import { SOUND_IDS } from "../../../../resource/sound/ids";

/**
 * シンブレイバー 効果音
 */
export class ShinBraverSounds {
  motor: Howl;

  /**
   * コンストラクタ
   *
   * @param resources リソース管理クラス
   */
  constructor(resources: Resources) {
    const motorResource = resources.sounds.find(
      (v) => v.id === SOUND_IDS.MOTOR,
    );
    this.motor = motorResource ? motorResource.sound : new Howl({ src: "" });
  }
}
