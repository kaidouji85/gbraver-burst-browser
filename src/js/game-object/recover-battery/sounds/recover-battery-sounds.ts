import type { Resources } from "../../../resource";
import { createEmptySoundResource } from "../../../resource/sound/empty-sound-resource";
import { SOUND_IDS } from "../../../resource/sound/ids";
import { SoundResource } from "../../../resource/sound/resource";

/** バッテリー回復 効果音 */
export class RecoverBatterySounds {
  /** バッテリー回復音 */
  recoverBattery: SoundResource;

  /**
   * コンストラクタ
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    this.recoverBattery =
      resources.sounds.find((v) => v.id === SOUND_IDS.BATTERY_RECOVER) ??
      createEmptySoundResource();
  }
}
