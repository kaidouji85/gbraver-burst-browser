import { SOUND_IDS } from "./ids";
import { SoundConfig } from "./resource";

/** 音設定をあつめたもの */
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
