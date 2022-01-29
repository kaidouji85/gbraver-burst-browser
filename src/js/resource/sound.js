// @flow

import type {ResourceRoot} from "./resource-root";
import {Howl} from 'howler';

/** 音リソースのユニークID */
export type SoundId = string;

/**
 * 音リソースの設定
 */
export type SoundConfig = {
  id: SoundId,
  path: (resourceRoot: ResourceRoot) => string,
  volume: number
};

/**
 * 音リソース
 */
export type SoundResource = {
  id: SoundId,
  sound: typeof Howl,
}

/**
 * 音IDを集めたもの
 */
export const SOUND_IDS = {
  PUSH_BUTTON: 'PUSH_BUTTON',
  CHANGE_VALUE: 'CHANGE_VALUE',
  MECHA_IMPACT: 'MECHA_IMPACT',
  MOTOR: 'MOTOR',
  LIGHTNING_ATTACK: 'LIGHTNING',
  LIGHTNING_BARRIER: 'SRTART_LIGHTNING_BARRIER',
  BATTERY_RECOVER: 'BATTERY_RECOVER',
  BATTERY_DECLARATION: 'BATTERY_DECLARATION',
  BENEFIT_EFFECT: 'BENEFIT_EFFECT',
};

/**
 * 音設定をあつめたもの
 */
export const SOUND_CONFIGS: SoundConfig[] = [
  {
    id: SOUND_IDS.PUSH_BUTTON,
    path: resourceRoot => `${resourceRoot.get()}/sounds/push-button.mp3`,
    volume: 1
  },
  {
    id: SOUND_IDS.CHANGE_VALUE,
    path: resourceRoot => `${resourceRoot.get()}/sounds/change-value.mp3`,
    volume: 1
  },
  {
    id: SOUND_IDS.MECHA_IMPACT,
    path: resourceRoot => `${resourceRoot.get()}/sounds/mecha-impact.mp3`,
    volume: 1
  },
  {
    id: SOUND_IDS.MOTOR,
    path: resourceRoot => `${resourceRoot.get()}/sounds/motor.mp3`,
    volume: 0.3
  },
  {
    id: SOUND_IDS.LIGHTNING_ATTACK,
    path: resourceRoot => `${resourceRoot.get()}/sounds/lightning-attack.mp3`,
    volume: 0.3
  },
  {
    id: SOUND_IDS.LIGHTNING_BARRIER,
    path: resourceRoot => `${resourceRoot.get()}/sounds/lightning-barrier.mp3`,
    volume: 0.3
  },
  {
    id: SOUND_IDS.BATTERY_RECOVER,
    path: resourceRoot => `${resourceRoot.get()}/sounds/battery-recover.mp3`,
    volume: 0.3
  },
  {
    id: SOUND_IDS.BATTERY_DECLARATION,
    path: resourceRoot => `${resourceRoot.get()}/sounds/battery-declaration.mp3`,
    volume: 0.3
  },
  {
    id: SOUND_IDS.BENEFIT_EFFECT,
    path: resourceRoot => `${resourceRoot.get()}/sounds/benefit-effect.mp3`,
    volume: 0.3
  },
];

/**
 * 指定した音リソースを読み込む
 *
 * @param resourceRoot リソースルート
 * @param config 音設定
 * @return 読み込み結果
 */
export function loadSound(resourceRoot: ResourceRoot, config: SoundConfig): Promise<SoundResource> {
  return new Promise((resolve, reject) => {
    const sound = new Howl({
      src: [config.path(resourceRoot)],
      volume: config.volume,
    });
    const resource: SoundResource = {
      id: config.id,
      sound: sound,
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
