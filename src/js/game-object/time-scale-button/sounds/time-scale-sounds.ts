import { Howl } from "howler";

import type { Resources } from "../../../resource";
import { SOUND_IDS } from "../../../resource/sound/ids";

/** タイムスケールボタンサウンド */
export type TimeScaleButtonSounds = {
  /** 値変更 */
  changeValue: Howl;
};

/**
 * タイムスケールサウンドを生成する
 *
 * @param resources リソース管理オブジェクト
 * @return 生成結果
 */
export function createTimeScaleButtonSounds(
  resources: Resources,
): TimeScaleButtonSounds {
  const changeValue =
    resources.sounds.find((v) => v.id === SOUND_IDS.CHANGE_VALUE)?.sound ??
    new Howl({ src: "" });
  return {
    changeValue,
  };
}
