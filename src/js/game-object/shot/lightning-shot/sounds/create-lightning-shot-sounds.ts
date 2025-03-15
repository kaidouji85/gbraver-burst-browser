import { ResourcesContainer } from "../../../../resource";
import { createEmptySoundResource } from "../../../../resource/sound/empty-sound-resource";
import { SOUND_IDS } from "../../../../resource/sound/ids";
import { LightningShotSounds } from "./lightning-shot-sounds";

/**
 * 電撃ショットのサウンドを生成する
 * @param options オプション
 * @returns 電撃ショットのサウンド
 */
export function createLightningShotSounds(
  options: ResourcesContainer,
): LightningShotSounds {
  const { resources } = options;
  const lightningAttack =
    resources.sounds.find((s) => s.id === SOUND_IDS.LIGHTNING_ATTACK) ??
    createEmptySoundResource();
  return { lightningAttack };
}
