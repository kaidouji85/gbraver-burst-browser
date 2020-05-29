// flow

import type {ResourcePath} from "./path/resource-path";
import {Howl} from 'howler';

/** 音リソースのユニークID */
export type SoundId = string;

/**
 * 音リソースの設定
 */
export type SoundConfig = {
  id: SoundId,
  path: (resourcePath: ResourcePath) => string
};

/**
 * 音リソース
 */
export type SoundResource = {
  id: SoundId,
  sound: Howl,
}

/**
 * 音IDを集めたもの
 */
export const SOUND_IDS = {
  PUSH_BUTTON: 'PUSH_BUTTON',
};

/**
 * 音設定をあつめたもの
 */
export const SOUND_CONFIGS: SoundConfig[] = [
  {
    id: SOUND_IDS.PUSH_BUTTON,
    path: resourcePath => {
      console.log(`${resourcePath.get()}/button/push-button.mp3`);
      return `${resourcePath.get()}/button/push-button.mp3`;
    }
  }
];

/**
 * 指定した音リソースを読み込む
 *
 * @param resourcePath リソースパス
 * @param config 音設定
 */
export function loadSound(resourcePath: ResourcePath, config: SoundConfig): Promise<SoundResource> {
  return new Promise((resolve, reject) => {
    const sound = new Howl({
      src: [config.path(resourcePath)]
    });
    const resource: SoundResource = {
      id: config.id,
      sound: sound
    };

    if (sound.state() === 'loaded') {
      resolve(resource);
      return;
    }

    sound.on('load', () => {
      resolve(resource);
    });
    sound.on('loaderror', () => {
      reject();
    });
  });
}

/**
 * 全ての音リソースを読み込む
 *
 * @param resourcePath リソースパス
 * @return 全ての音リソース
 */
export function loadingAllSounds(resourcePath: ResourcePath): Array<Promise<SoundResource>> {
  return SOUND_CONFIGS.map(config => loadSound(resourcePath, config));
}
