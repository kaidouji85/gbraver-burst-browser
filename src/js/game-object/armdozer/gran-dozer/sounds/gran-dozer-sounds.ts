import { ResourcesContainer } from "../../../../resource";
import { createEmptySoundResource } from "../../../../resource/sound/empty-sound-resource";
import { SOUND_IDS } from "../../../../resource/sound/ids";
import { SoundResource } from "../../../../resource/sound/resource";

/** グランドーザ 効果音 */
export type GranDozerSounds = {
  /** モーター音 */
  motor: SoundResource;
};

/** オプション */
type Options = ResourcesContainer;

/**
 * ジェネシスブレイバー効果音を生成する
 * @param options オプション
 * @returns 生成結果
 */
export function createGranDozerSounds(options: Options): GranDozerSounds {
  const { resources } = options;
  const motor =
    resources.sounds.find((v) => v.id === SOUND_IDS.MOTOR) ??
    createEmptySoundResource();
  return {
    motor,
  };
}
