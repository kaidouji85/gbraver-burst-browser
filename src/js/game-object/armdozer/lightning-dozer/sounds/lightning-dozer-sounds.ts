import { ResourcesContainer } from "../../../../resource";
import { createEmptySoundResource } from "../../../../resource/sound/empty-sound-resource";
import { SOUND_IDS } from "../../../../resource/sound/ids";
import { SoundResource } from "../../../../resource/sound/resource";

/** ライトニングドーザ効果音 */
export type LightningDozerSounds = {
  /** モーター音 */
  motor: SoundResource;
};

/** 生成パラメータ */
type CreatorParams = ResourcesContainer;

/**
 * LightningDozerSoundsを生成する
 * @param params 生成パラメータ
 * @returns 生成結果
 */
export function createLightningDozerSounds(
  params: CreatorParams,
): LightningDozerSounds {
  const { resources } = params;
  return {
    motor:
      resources.sounds.find((v) => v.id === SOUND_IDS.MOTOR) ??
      createEmptySoundResource(),
  };
}
