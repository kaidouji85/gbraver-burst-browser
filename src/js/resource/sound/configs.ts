import { SOUND_IDS } from "./ids";
import { SoundConfig } from "./resource";

/** 音設定をあつめたもの */
export const SOUND_CONFIGS: SoundConfig[] = [
  {
    id: SOUND_IDS.PUSH_BUTTON,
    path: (resourceRoot) => `${resourceRoot.get()}/sounds/push-button.mp3`,
    volumeScale: 1,
  },
  {
    id: SOUND_IDS.CHANGE_VALUE,
    path: (resourceRoot) => `${resourceRoot.get()}/sounds/change-value.mp3`,
    volumeScale: 0.4,
  },
  {
    id: SOUND_IDS.MECHA_IMPACT,
    path: (resourceRoot) => `${resourceRoot.get()}/sounds/mecha-impact.mp3`,
    volumeScale: 1,
  },
  {
    id: SOUND_IDS.MOTOR,
    path: (resourceRoot) => `${resourceRoot.get()}/sounds/motor.mp3`,
    volumeScale: 1,
  },
  {
    id: SOUND_IDS.LIGHTNING_ATTACK,
    path: (resourceRoot) => `${resourceRoot.get()}/sounds/lightning-attack.mp3`,
    volumeScale: 1,
  },
  {
    id: SOUND_IDS.LIGHTNING_BARRIER,
    path: (resourceRoot) =>
      `${resourceRoot.get()}/sounds/lightning-barrier.mp3`,
    volumeScale: 1,
  },
  {
    id: SOUND_IDS.BATTERY_RECOVER,
    path: (resourceRoot) => `${resourceRoot.get()}/sounds/battery-recover.mp3`,
    volumeScale: 1,
  },
  {
    id: SOUND_IDS.BATTERY_DECLARATION,
    path: (resourceRoot) =>
      `${resourceRoot.get()}/sounds/battery-declaration.mp3`,
    volumeScale: 1,
  },
  {
    id: SOUND_IDS.BENEFIT_EFFECT,
    path: (resourceRoot) => `${resourceRoot.get()}/sounds/benefit-effect.mp3`,
    volumeScale: 1,
  },
  {
    id: SOUND_IDS.SEND_MESSAGE,
    path: (resourceRoot) => `${resourceRoot.get()}/sounds/send-message.mp3`,
    volumeScale: 0.2,
  },
  {
    id: SOUND_IDS.TITLE_BGM,
    path: (resourceRoot) => `${resourceRoot.get()}/sounds/title-bgm.mp3`,
    volumeScale: 0.2,
  },
  {
    id: SOUND_IDS.TUTORIAL_BGM,
    path: (resourceRoot) => `${resourceRoot.get()}/sounds/tutorial-bgm.mp3`,
    volumeScale: 0.3,
  },
  {
    id: SOUND_IDS.BATTLE_BGM_01,
    path: (resourceRoot) => `${resourceRoot.get()}/sounds/battle-01.mp3`,
    volumeScale: 0.2,
  },
  {
    id: SOUND_IDS.BATTLE_BGM_02,
    path: (resourceRoot) => `${resourceRoot.get()}/sounds/battle-02.mp3`,
    volumeScale: 0.2,
  },
  {
    id: SOUND_IDS.BATTLE_BGM_03,
    path: (resourceRoot) => `${resourceRoot.get()}/sounds/battle-03.mp3`,
    volumeScale: 0.2,
  },
  {
    id: SOUND_IDS.YUUYA_BATTLE,
    path: (resourceRoot) => `${resourceRoot.get()}/sounds/yuuya-battle.mp3`,
    volumeScale: 0.2,
  },
  {
    id: SOUND_IDS.GAI_BATTLE,
    path: (resourceRoot) => `${resourceRoot.get()}/sounds/gai-battle.mp3`,
    volumeScale: 0.2,
  },
  {
    id: SOUND_IDS.NPC_ENDING,
    path: (resourceRoot) => `${resourceRoot.get()}/sounds/npc-ending.mp3`,
    volumeScale: 0.2,
  },
];
