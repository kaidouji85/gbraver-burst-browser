import { ResourcesContainer } from "../../../../resource";
import { createEmptySoundResource } from "../../../../resource/sound/empty-sound-resource";
import { SOUND_IDS } from "../../../../resource/sound/ids";
import { SoundResource } from "../../../../resource/sound/resource";

/** ネオランドーザ効果音 */
export type NeoLandozerSounds = {
  /** モーター音 */
  motor: SoundResource;
};

/** 生成パラメータ */
type CreatorParams = ResourcesContainer;

/**
 * NeoLandozerSoundsを生成する
 * @param params 生成パラメータ
 * @returns 生成結果
 */
export function createNeoLandozerSounds(
  params: CreatorParams,
): NeoLandozerSounds {
  const { resources } = params;
  return {
    motor:
      resources.sounds.find((v) => v.id === SOUND_IDS.MOTOR) ??
      createEmptySoundResource(),
  };
}
