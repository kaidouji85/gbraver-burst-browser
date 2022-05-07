// @flow
import type {ResourceRoot} from "./resource-root";
import {Howl} from 'howler';

/** 音リソースのユニークID */
export type SoundId = string;

/** 音種別 */
export type SoundType = 'BGM' | 'SE';

/**
 * 音リソースの設定
 */
export type SoundConfig = {
  /** 音ID*/
  id: SoundId,
  /** 音種別 */
  type: SoundType,
  /** 素材のパス */
  path: (resourceRoot: ResourceRoot) => string,
  /** 音のボリューム */
  volume: number
};

/**音リソース */
export type SoundResource = {
  /** 音ID */
  id: SoundId,
  /** 音種別 */
  type: SoundType,
  /** 音声データ */
  sound: typeof Howl,
  /** ボリューム係数 */
  volumeCoefficient: number,
  /** 音種別ごとのボリューム */
  soundTypeVolume: number,
}

/**
 * 音リソースのHowlボリュームを取得する
 *
 * @param sound 音リソース
 * @return Howlで使うボリューム
 */
export function getVolume(sound: SoundResource): number {
  return sound.volumeCoefficient * sound.soundTypeVolume;
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
  TITLE_BGM: 'TITLE_BGM',
  BATTLE_BGM_01: 'BATTLE_BGM_01',
  BATTLE_BGM_02: 'BATTLE_BGM_02',
  BATTLE_BGM_03: 'BATTLE_BGM_03',
};

/**
 * 音設定をあつめたもの
 */
export const SOUND_CONFIGS: SoundConfig[] = [
  {
    id: SOUND_IDS.PUSH_BUTTON,
    type: 'SE',
    path: resourceRoot => `${resourceRoot.get()}/sounds/push-button.mp3`,
    volume: 1
  },
  {
    id: SOUND_IDS.CHANGE_VALUE,
    type: 'SE',
    path: resourceRoot => `${resourceRoot.get()}/sounds/change-value.mp3`,
    volume: 0.4
  },
  {
    id: SOUND_IDS.MECHA_IMPACT,
    type: 'SE',
    path: resourceRoot => `${resourceRoot.get()}/sounds/mecha-impact.mp3`,
    volume: 1
  },
  {
    id: SOUND_IDS.MOTOR,
    type: 'SE',
    path: resourceRoot => `${resourceRoot.get()}/sounds/motor.mp3`,
    volume: 1
  },
  {
    id: SOUND_IDS.LIGHTNING_ATTACK,
    type: 'SE',
    path: resourceRoot => `${resourceRoot.get()}/sounds/lightning-attack.mp3`,
    volume: 1
  },
  {
    id: SOUND_IDS.LIGHTNING_BARRIER,
    type: 'SE',
    path: resourceRoot => `${resourceRoot.get()}/sounds/lightning-barrier.mp3`,
    volume: 1
  },
  {
    id: SOUND_IDS.BATTERY_RECOVER,
    type: 'SE',
    path: resourceRoot => `${resourceRoot.get()}/sounds/battery-recover.mp3`,
    volume: 1
  },
  {
    id: SOUND_IDS.BATTERY_DECLARATION,
    type: 'SE',
    path: resourceRoot => `${resourceRoot.get()}/sounds/battery-declaration.mp3`,
    volume: 1
  },
  {
    id: SOUND_IDS.BENEFIT_EFFECT,
    type: 'SE',
    path: resourceRoot => `${resourceRoot.get()}/sounds/benefit-effect.mp3`,
    volume: 1
  },
  {
    id: SOUND_IDS.TITLE_BGM,
    type: 'BGM',
    path: resourceRoot => `${resourceRoot.get()}/sounds/title-bgm.mp3`,
    volume: 0.2
  },
  {
    id: SOUND_IDS.BATTLE_BGM_01,
    type: 'BGM',
    path: resourceRoot => `${resourceRoot.get()}/sounds/battle-01.mp3`,
    volume: 0.2
  },
  {
    id: SOUND_IDS.BATTLE_BGM_02,
    type: 'BGM',
    path: resourceRoot => `${resourceRoot.get()}/sounds/battle-02.mp3`,
    volume: 0.2
  },
  {
    id: SOUND_IDS.BATTLE_BGM_03,
    type: 'BGM',
    path: resourceRoot => `${resourceRoot.get()}/sounds/battle-03.mp3`,
    volume: 0.2
  }
];

/**
 * 指定した音リソースを読み込む
 * 音種別ごとのボリュームには初期値として1がセットされる
 *
 * @param resourceRoot リソースルート
 * @param config 音設定
 * @return 読み込み結果
 */
export function loadSound(resourceRoot: ResourceRoot, config: SoundConfig): Promise<SoundResource> {
  return new Promise((resolve, reject) => {
    const sound = new Howl({src: [config.path(resourceRoot)], volume: config.volume});
    const resource: SoundResource = {id: config.id, type: config.type, sound: sound, volumeCoefficient: config.volume,
      soundTypeVolume: 1};
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
 * 空の音リソースを生成する
 *
 * @return 生成結果
 */
export function createEmptySoundResource(): SoundResource {
  return {
    id: 'EmptyResource',
    type: 'SE',
    sound: new Howl({mute: true}),
    soundTypeVolume: 1,
    volumeCoefficient: 1,
  };
}