import { Resources } from "../../../resource";
import { createEmptySoundResource } from "../../../resource/sound/empty-sound-resource";
import { SOUND_IDS } from "../../../resource/sound/ids";
import { PredicatedDamageSounds } from "./predicated-damage-sounds";

/**
 * ダメージ予想のサウンドを生成する
 * @param resources リソース管理オブジェクト
 * @returns 生成結果
 */
export function createPredicatedDamageSounds(
  resources: Resources,
): PredicatedDamageSounds {
  return {
    changeValue:
      resources.sounds.find((v) => v.id === SOUND_IDS.CHANGE_VALUE) ??
      createEmptySoundResource(),
  };
}
