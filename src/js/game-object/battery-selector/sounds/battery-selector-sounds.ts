import { Howl } from "howler";

import type { Resources } from "../../../resource";
import { SOUND_IDS } from "../../../resource/sound/ids";

/** バッテリーセレクタ効果音 */
export type BatterySelectorSounds = {
  /** 効果音ボタン押下 */
  pushButtonSound: Howl;

  /** 効果音値変更 */
  batteryChangeSound: Howl;
};

/**
 * バッテリーセレクタ効果音を生成する
 *
 * @param resources リソース管理オブジェクト
 * @return 生成結果
 */
export function createBatterySelectorSounds(
  resources: Resources,
): BatterySelectorSounds {
  const pushButtonSound =
    resources.sounds.find((v) => v.id === SOUND_IDS.PUSH_BUTTON)?.sound ??
    new Howl({ src: "" });
  const batteryChangeSound =
    resources.sounds.find((v) => v.id === SOUND_IDS.CHANGE_VALUE)?.sound ??
    new Howl({ src: "" });
  return {
    pushButtonSound,
    batteryChangeSound,
  };
}
