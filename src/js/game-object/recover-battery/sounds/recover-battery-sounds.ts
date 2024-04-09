import { Howl } from "howler";

import type { Resources } from "../../../resource";
import { SOUND_IDS } from "../../../resource/sound/ids";

/**
 * バッテリー回復 効果音
 */
export class RecoverBatterySounds {
  recoverBattery: Howl;

  constructor(resources: Resources) {
    this.recoverBattery =
      resources.sounds.find((v) => v.id === SOUND_IDS.BATTERY_RECOVER)?.sound ??
      new Howl({ src: "" });
  }
}
