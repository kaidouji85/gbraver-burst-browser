import type { Resources } from "../../../../resource";
import { createEmptySoundResource } from "../../../../resource/sound/empty-sound-resource";
import { SOUND_IDS } from "../../../../resource/sound/ids";
import { SoundResource } from "../../../../resource/sound/resource";

/** 電撃 音 */
export class LightningSounds {
  /** 電撃 */
  lightning: SoundResource;

  /**
   * コンストラクタ
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    this.lightning = resources.sounds.find((v) => v.id === SOUND_IDS.LIGHTNING_ATTACK)
      ?? createEmptySoundResource();
  }
}
