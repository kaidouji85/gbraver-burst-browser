import { Howl } from "howler";

import { ResourceRoot } from "./resource-root";

/** 音リソースのユニークID */
export type SoundId = string;

/**
 * 音種別
 * 音量調整のグルーピングに利用する
 * たとえばBGMは音量0、SEは音量MAXとしたい時に、本データ型で音の種別を判別する
 */
export type SoundType = "BGM" | "SE";

/**
 * 音リソースの設定
 */
export type SoundConfig = {
  /** 音ID*/
  readonly id: SoundId;
  /** 音種別 */
  readonly type: SoundType;
  /** ボリュームスケール */
  readonly volumeScale: number;

  /**
   * 素材のパス
   * @param resourceRoot リソースルート
   * @return 素材のパス
   */
  path: (resourceRoot: ResourceRoot) => string;
};

/**音リソース */
export type SoundResource = {
  /** 音ID */
  readonly id: SoundId;
  /** 音種別 */
  readonly type: SoundType;
  /** 音声データ */
  readonly sound: Howl;

  /**
   * ボリューム
   * 本プロパティには設定画面の入力内容をセットする想定であり、フェードイン、フェードアウトで利用する
   * フェードイン処理とは音量を0 -> X に変更することだが、
   * フェードイン開始時にHowlの音量が0であることが多いので、Xの値をHowlから取得できない
   * フェードインのためにどこかしらにXの値を保持する必要があるので、本プロパティにXをセットしている
   */
  volume: number;

  /**
   * ボリュームスケール
   * ソフトウェア的に音量調整をするために利用する
   * たとえば、効果音AをBGMの半分の音量にしたい場合、
   *   BGM volumeScale = 1
   *   効果音A volumeScale = 0.5
   * とする
   */
  readonly volumeScale: number;
};

/**
 * Howlで利用するボリューム
 * @param sound 音リソース
 * @return Howlで使うボリューム
 */
export function howlVolume(sound: SoundResource): number {
  return sound.volumeScale * sound.volume;
}

/** 音IDを集めたもの */
export const SOUND_IDS = {
  PUSH_BUTTON: "PUSH_BUTTON",
  CHANGE_VALUE: "CHANGE_VALUE",
  MECHA_IMPACT: "MECHA_IMPACT",
  MOTOR: "MOTOR",
  LIGHTNING_ATTACK: "LIGHTNING",
  LIGHTNING_BARRIER: "SRTART_LIGHTNING_BARRIER",
  BATTERY_RECOVER: "BATTERY_RECOVER",
  BATTERY_DECLARATION: "BATTERY_DECLARATION",
  BENEFIT_EFFECT: "BENEFIT_EFFECT",
  SEND_MESSAGE: "SEND_MESSAGE",
  TITLE_BGM: "TITLE_BGM",
  TUTORIAL_BGM: "TUTORIAL_BGM",
  BATTLE_BGM_01: "BATTLE_BGM_01",
  BATTLE_BGM_02: "BATTLE_BGM_02",
  BATTLE_BGM_03: "BATTLE_BGM_03",
  YUUYA_BATTLE: "YUUYA_BATTLE",
  GAI_BATTLE: "GAI_BATTLE",
  NPC_ENDING: "NPC_ENDING",
};

/**
 * 音設定をあつめたもの
 */
export const SOUND_CONFIGS: SoundConfig[] = [
  {
    id: SOUND_IDS.PUSH_BUTTON,
    type: "SE",
    path: (resourceRoot) => `${resourceRoot.get()}/sounds/push-button.mp3`,
    volumeScale: 1,
  },
  {
    id: SOUND_IDS.CHANGE_VALUE,
    type: "SE",
    path: (resourceRoot) => `${resourceRoot.get()}/sounds/change-value.mp3`,
    volumeScale: 0.4,
  },
  {
    id: SOUND_IDS.MECHA_IMPACT,
    type: "SE",
    path: (resourceRoot) => `${resourceRoot.get()}/sounds/mecha-impact.mp3`,
    volumeScale: 1,
  },
  {
    id: SOUND_IDS.MOTOR,
    type: "SE",
    path: (resourceRoot) => `${resourceRoot.get()}/sounds/motor.mp3`,
    volumeScale: 1,
  },
  {
    id: SOUND_IDS.LIGHTNING_ATTACK,
    type: "SE",
    path: (resourceRoot) => `${resourceRoot.get()}/sounds/lightning-attack.mp3`,
    volumeScale: 1,
  },
  {
    id: SOUND_IDS.LIGHTNING_BARRIER,
    type: "SE",
    path: (resourceRoot) =>
      `${resourceRoot.get()}/sounds/lightning-barrier.mp3`,
    volumeScale: 1,
  },
  {
    id: SOUND_IDS.BATTERY_RECOVER,
    type: "SE",
    path: (resourceRoot) => `${resourceRoot.get()}/sounds/battery-recover.mp3`,
    volumeScale: 1,
  },
  {
    id: SOUND_IDS.BATTERY_DECLARATION,
    type: "SE",
    path: (resourceRoot) =>
      `${resourceRoot.get()}/sounds/battery-declaration.mp3`,
    volumeScale: 1,
  },
  {
    id: SOUND_IDS.BENEFIT_EFFECT,
    type: "SE",
    path: (resourceRoot) => `${resourceRoot.get()}/sounds/benefit-effect.mp3`,
    volumeScale: 1,
  },
  {
    id: SOUND_IDS.SEND_MESSAGE,
    type: "SE",
    path: (resourceRoot) => `${resourceRoot.get()}/sounds/send-message.mp3`,
    volumeScale: 0.2,
  },
  {
    id: SOUND_IDS.TITLE_BGM,
    type: "BGM",
    path: (resourceRoot) => `${resourceRoot.get()}/sounds/title-bgm.mp3`,
    volumeScale: 0.2,
  },
  {
    id: SOUND_IDS.TUTORIAL_BGM,
    type: "BGM",
    path: (resourceRoot) => `${resourceRoot.get()}/sounds/tutorial-bgm.mp3`,
    volumeScale: 0.3,
  },
  {
    id: SOUND_IDS.BATTLE_BGM_01,
    type: "BGM",
    path: (resourceRoot) => `${resourceRoot.get()}/sounds/battle-01.mp3`,
    volumeScale: 0.2,
  },
  {
    id: SOUND_IDS.BATTLE_BGM_02,
    type: "BGM",
    path: (resourceRoot) => `${resourceRoot.get()}/sounds/battle-02.mp3`,
    volumeScale: 0.2,
  },
  {
    id: SOUND_IDS.BATTLE_BGM_03,
    type: "BGM",
    path: (resourceRoot) => `${resourceRoot.get()}/sounds/battle-03.mp3`,
    volumeScale: 0.2,
  },
  {
    id: SOUND_IDS.YUUYA_BATTLE,
    type: "BGM",
    path: (resourceRoot) => `${resourceRoot.get()}/sounds/yuuya-battle.mp3`,
    volumeScale: 0.2,
  },
  {
    id: SOUND_IDS.GAI_BATTLE,
    type: "BGM",
    path: (resourceRoot) => `${resourceRoot.get()}/sounds/gai-battle.mp3`,
    volumeScale: 0.2,
  },
  {
    id: SOUND_IDS.NPC_ENDING,
    type: "BGM",
    path: (resourceRoot) => `${resourceRoot.get()}/sounds/npc-ending.mp3`,
    volumeScale: 0.2,
  },
];

/**
 * 指定した音リソースを読み込む
 * ボリュームには初期値として1がセットされる
 *
 * @param resourceRoot リソースルート
 * @param config 音設定
 * @return 読み込み結果
 */
export function loadSound(
  resourceRoot: ResourceRoot,
  config: SoundConfig,
): Promise<SoundResource> {
  return new Promise((resolve, reject) => {
    const sound = new Howl({
      src: [config.path(resourceRoot)],
      volume: config.volumeScale,
    });
    const resource: SoundResource = {
      id: config.id,
      type: config.type,
      sound: sound,
      volumeScale: config.volumeScale,
      volume: 1,
    };

    if (sound.state() === "loaded") {
      resolve(resource);
      return;
    }

    sound.on("load", () => {
      resolve(resource);
    });
    sound.on("loaderror", () => {
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
    id: "EmptyResource",
    type: "SE",
    sound: new Howl({
      src: "",
      mute: true,
    }),
    volume: 1,
    volumeScale: 1,
  };
}
