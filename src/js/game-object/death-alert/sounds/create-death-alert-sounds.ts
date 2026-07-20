import { Resources } from "../../../resource";
import { createEmptySoundResource } from "../../../resource/sound/empty-sound-resource";
import { SOUND_IDS } from "../../../resource/sound/ids";
import { DeathAlertSounds } from "./death-alert-sounds";

/**
 * デスアラートサウンドを生成する
 * @param resources リソース管理オブジェクト
 * @returns デスアラートサウンド
 */
export const createDeathAlertSounds = (
  resources: Resources,
): DeathAlertSounds => {
  const deathAlertSound =
    resources.sounds.find((v) => v.id === SOUND_IDS.DEATH_ALERT) ??
    createEmptySoundResource();
  return {
    deathAlert: deathAlertSound,
  };
};
