import { Howl } from "howler";

import type { Resources } from "../../../../resource";
import { SOUND_IDS } from "../../../../resource/sound/ids";

/**
 * 電撃バリア 音
 */
export class LightningBarrierSounds {
  lightningBarrier: Howl;

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    const lightningResource = resources.sounds.find(
      (v) => v.id === SOUND_IDS.LIGHTNING_BARRIER,
    );
    this.lightningBarrier = lightningResource
      ? lightningResource.sound
      : new Howl({ src: "" });
  }
}
