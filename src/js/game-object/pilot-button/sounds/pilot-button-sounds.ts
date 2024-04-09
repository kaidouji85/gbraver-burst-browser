import { Howl } from "howler";

import type { Resources } from "../../../resource";
import { SOUND_IDS } from "../../../resource/sound/ids";

/**
 * パイロットボタン 効果音
 */
export class PilotButtonSounds {
  pushButton: Howl;

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    const pushButtonResource = resources.sounds.find(
      (v) => v.id === SOUND_IDS.PUSH_BUTTON,
    );
    this.pushButton = pushButtonResource?.sound ?? new Howl({ src: "" });
  }
}
