import type { Resources } from "../../../resource";
import { createEmptySoundResource } from "../../../resource/sound/empty-sound-resource";
import { SOUND_IDS } from "../../../resource/sound/ids";
import { SoundResource } from "../../../resource/sound/resource";

/** タイムスケールボタンサウンド */
export type TimeScaleButtonSounds = {
  /** 値変更 */
  changeValue: SoundResource;
};

/**
 * タイムスケールサウンドを生成する
 * @param resources リソース管理オブジェクト
 * @return 生成結果
 */
export function createTimeScaleButtonSounds(
  resources: Resources,
): TimeScaleButtonSounds {
  return {
    changeValue:
      resources.sounds.find((v) => v.id === SOUND_IDS.CHANGE_VALUE) ??
      createEmptySoundResource(),
  };
}
