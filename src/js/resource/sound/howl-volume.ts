import { SoundResource } from "./resource";

/**
 * @deprecated
 * Howlで利用するボリューム
 * @param sound 音リソース
 * @return Howlで使うボリューム
 */
export function howlVolume(sound: SoundResource): number {
  return sound.volumeScale * sound.volume;
}
