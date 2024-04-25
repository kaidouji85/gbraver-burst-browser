import type { Resources } from "../../../resource";
import { createEmptySoundResource } from "../../../resource/sound/empty-sound-resource";
import { SOUND_IDS } from "../../../resource/sound/ids";
import { SoundResource } from "../../../resource/sound/resource";

/** バッテリーセレクタ効果音 */
export type BatterySelectorSounds = {
  /** 効果音ボタン押下 */
  pushButtonSound: SoundResource;
  /** 効果音値変更 */
  batteryChangeSound: SoundResource;
};

/**
 * バッテリーセレクタ効果音を生成する
 * @param resources リソース管理オブジェクト
 * @returns 生成結果
 */
export function createBatterySelectorSounds(
  resources: Resources,
): BatterySelectorSounds {
  return {
    pushButtonSound:
      resources.sounds.find((v) => v.id === SOUND_IDS.PUSH_BUTTON) ??
      createEmptySoundResource(),
    batteryChangeSound:
      resources.sounds.find((v) => v.id === SOUND_IDS.CHANGE_VALUE) ??
      createEmptySoundResource(),
  };
}
