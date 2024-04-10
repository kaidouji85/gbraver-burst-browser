import type { Resources } from "../../../resource";
import { createEmptySoundResource } from "../../../resource/sound/empty-sound-resource";
import { SOUND_IDS } from "../../../resource/sound/ids";
import { SoundResource } from "../../../resource/sound/resource";

/** パイロットボタン 効果音 */
export class PilotButtonSounds {
  /** ボタン押下音 */
  pushButton: SoundResource;

  /**
   * コンストラクタ
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    this.pushButton = resources.sounds.find((v) => v.id === SOUND_IDS.PUSH_BUTTON)
      ?? createEmptySoundResource();
  }
}
