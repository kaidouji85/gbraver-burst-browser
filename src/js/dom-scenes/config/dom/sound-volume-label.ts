import { SoundVolume } from "../../../game/config/browser-config";

/**
 * 音量を画面表示用にパースするヘルパー関数
 *
 * @param volume 音量
 * @returns パース結果
 */
export function soundVolumeLabel(volume: SoundVolume): string {
  return volume.toFixed(1);
}
