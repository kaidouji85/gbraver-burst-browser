import { ResourcesContainer } from "../../../../resource";
import { createEmptySoundResource } from "../../../../resource/sound/empty-sound-resource";
import { SOUND_IDS } from "../../../../resource/sound/ids";
import { SoundResource } from "../../../../resource/sound/resource";

/** ジェネシスブレイバー 効果音 */
export type GenesisBraverSounds = {
  /** モーター音 */
  motor: SoundResource;
};

/** 生成パラメータ */
type CreatorParams = ResourcesContainer;

/**
 * ジェネシスブレイバー効果音を生成する
 * @param params 生成パラメータ
 * @returns 生成結果
 */
export function createGenesisBraverSounds(
  params: CreatorParams
): GenesisBraverSounds {
  const { resources } = params;
  const motor =
    resources.sounds.find((v) => v.id === SOUND_IDS.MOTOR) ??
    createEmptySoundResource();
  return {
    motor,
  };
}
