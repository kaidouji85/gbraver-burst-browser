import type { Resources } from "../../../../resource";
import { createEmptySoundResource } from "../../../../resource/sound/empty-sound-resource";
import { SOUND_IDS } from "../../../../resource/sound/ids";
import type { SoundResource } from "../../../../resource/sound/resource";

/** ジェネシスブレイバー 効果音 */
export type GenesisBraverSounds = {
  /** モーター音 */
  motor: SoundResource;
};

/**
 * ジェネシスブレイバー効果音を生成する
 * @param resources リソース管理オブジェクト
 * @returns 生成結果
 */
export function createGenesisBraverSounds(
  resources: Resources,
): GenesisBraverSounds {
  const motor =
    resources.sounds.find((v) => v.id === SOUND_IDS.MOTOR) ??
    createEmptySoundResource();
  return {
    motor,
  };
}
