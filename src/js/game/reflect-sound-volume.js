// @flow
import type {Resources} from "../resource";
import {howlVolume} from "../resource/sound";
import type {GbraverBurstBrowserConfig} from "./config/browser-config";

/**
 * 音量設定を音リソースに反映させるヘルパー関数
 * 本関数にはresourcesを変更する副作用がある
 *
 * @param resources リソース管理オブジェクト
 * @param config 反映するブラウザ設定
 */
export function reflectSoundVolume(resources: Resources, config: GbraverBurstBrowserConfig): void {
  const getVolume = sound => {
    switch(sound.type) {
      case 'BGM':
        return config.bgmVolume;
      case 'SE':
        return config.seVolume;
      default:
        return sound.volume;
    }
  };

  resources.sounds.forEach(sound => {
    sound.volume = getVolume(sound);
    sound.sound.volume(howlVolume(sound));
  });
}