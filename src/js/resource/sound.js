// flow

import type {ResourcePath} from "./path/resource-path";
import {Howl} from 'howler';

/** 音楽リソースのユニークID */
export type SoundId = string;

/**
 * 音楽リソースの設定
 */
export type SoundConfig = {
  id: SoundId,
  path: (resourcePath: ResourcePath) => string
};

/**
 * 音楽リソース
 */
export type SoundResource = {
  id: SoundId,
  sound: Howl,
}

/**
 * 音楽IDを集めたもの
 */
export const SOUND_IDS = {
  PUSH_BUTTON: 'PUSH_BUTTON',
};

/**
 * 音楽設定をあつめたもの
 */
export const SOUND_CONFIGS: SoundConfig[] = [
  {
    id: SOUND_IDS.PUSH_BUTTON,
    path: resourcePath => `${resourcePath.get()}/button/push-button.mp3`
  }
];

/**
 * 指定した音楽リソースを読み込む
 *
 * @param resourcePath リソースパス
 * @param config 音楽設定
 */
export function loadSound(resourcePath: ResourcePath, config: SoundConfig): Promise<SoundResource> {
  return new Promise((resolve, reject) => {
    const sound = new Howl({
      src: [config.path(resourcePath)]
    });
    sound.once('load', () => {
      const resource: SoundResource = {
        id: config.id,
        sound: sound
      };
      resolve(resource);
    });
    sound.once('loaderror', () => {
      reject();
    });
  });
}

/**
 * 全ての音楽リソースを読み込む
 *
 * @param resourcePath リソースパス
 * @return 全ての音楽リソース
 */
export function loadAllSounds(resourcePath: ResourcePath): Promise<SoundResource[]> {
  return Promise.all(
    SOUND_CONFIGS.map(config => loadSound(resourcePath, config))
  );
}
