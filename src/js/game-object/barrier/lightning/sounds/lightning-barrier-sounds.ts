import type { Resources } from "../../../../resource";
import { createEmptySoundResource } from "../../../../resource/sound/empty-sound-resource";
import { SOUND_IDS } from "../../../../resource/sound/ids";
import { SoundResource } from "../../../../resource/sound/resource";

/** 電撃バリア 音 */
export class LightningBarrierSounds {
  /** 電撃バリア */
  lightningBarrier: SoundResource;

  /**
   * コンストラクタ
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    this.lightningBarrier =
      resources.sounds.find((v) => v.id === SOUND_IDS.LIGHTNING_BARRIER) ??
      createEmptySoundResource();
  }
}
