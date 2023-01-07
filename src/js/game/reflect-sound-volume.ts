import type { Resources } from "../resource";
import type { SoundResource } from "../resource/sound";
import { howlVolume } from "../resource/sound";
import type { GbraverBurstBrowserConfig } from "./config/browser-config";

/**
 * サウンドリソース種別に応じたボリュームを取得する
 *
 * @param sound サウンドリソース
 * @param config ブラウザ設定
 * @return ボリューム
 */
function getVolume(sound: SoundResource, config: GbraverBurstBrowserConfig) {
  switch (sound.type) {
    case "BGM":
      return config.bgmVolume;

    case "SE":
      return config.seVolume;

    default:
      return 1;
  }
}

/**
 * 音量設定を音リソースに反映させるヘルパー関数
 * 本関数にはresourcesを変更する副作用がある
 *
 * @param resources リソース管理オブジェクト
 * @param config 反映するブラウザ設定
 */
export function reflectSoundVolume(resources: Resources, config: GbraverBurstBrowserConfig): void {
  resources.sounds.forEach(sound => {
    sound.volume = getVolume(sound, config);
    sound.sound.volume(howlVolume(sound));
  });
}