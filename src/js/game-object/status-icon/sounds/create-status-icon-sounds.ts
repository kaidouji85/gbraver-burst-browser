import { Resources } from "../../../resource";
import { createEmptySoundResource } from "../../../resource/sound/empty-sound-resource";
import { SOUND_IDS } from "../../../resource/sound/ids";
import { StatusIconSounds } from "./status-icon-sounds";

/**
 * ステータスアイコンサウンドを生成する
 * @param resources リソース管理オブジェクト
 * @returns 生成結果
 */
export function createStatusIconSounds(resources: Resources): StatusIconSounds {
  return {
    changeValue:
      resources.sounds.find((v) => v.id === SOUND_IDS.CHANGE_VALUE) ??
      createEmptySoundResource(),
  };
}
