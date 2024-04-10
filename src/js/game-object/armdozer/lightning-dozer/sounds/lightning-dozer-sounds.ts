import type { Resources } from "../../../../resource";
import { createEmptySoundResource } from "../../../../resource/sound/empty-sound-resource";
import { SOUND_IDS } from "../../../../resource/sound/ids";
import { SoundResource } from "../../../../resource/sound/resource";

/** イトニングドーザ 音 */
export class LightningDozerSounds {
  /** モーター音 */
  motor: SoundResource;

  /**
   * コンストラクタ
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    this.motor =
      resources.sounds.find((v) => v.id === SOUND_IDS.MOTOR) ??
      createEmptySoundResource();
  }
}
