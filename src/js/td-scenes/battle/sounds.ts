import { ResourcesContainer } from "../../resource";
import { createEmptySoundResource } from "../../resource/sound/empty-sound-resource";
import { SOUND_IDS } from "../../resource/sound/ids";
import { SoundId, SoundResource } from "../../resource/sound/resource";

/** 戦闘シーン 効果音 */
export type BattleSceneSounds = {
  /** バッテリー決定音 */
  readonly batteryDeclaration: SoundResource;
  /** バッテリー回復音 */
  readonly batteryRecover: SoundResource;
  /** メッセージ送り音 */
  readonly sendMessage: SoundResource;
  /** BGM */
  readonly bgm: SoundResource;
};

/** 生成パラメータ */
type BattleSceneSoundsCreatorParams = ResourcesContainer & {
  /** 再生するBGM */
  playingBGM: SoundId;
};

/**
 * BattleSceneSoundsを生成する
 * @param params 生成パラメータ
 * @returns 生成結果
 */
export function createBattleSceneSounds(
  params: BattleSceneSoundsCreatorParams,
): BattleSceneSounds {
  const { resources, playingBGM } = params;
  return {
    batteryDeclaration:
      resources.sounds.find((v) => v.id === SOUND_IDS.BATTERY_DECLARATION) ??
      createEmptySoundResource(),
    batteryRecover:
      resources.sounds.find((v) => v.id === SOUND_IDS.BATTERY_RECOVER) ??
      createEmptySoundResource(),
    sendMessage:
      resources.sounds.find((v) => v.id === SOUND_IDS.SEND_MESSAGE) ??
      createEmptySoundResource(),
    bgm:
      resources.sounds.find((v) => v.id === playingBGM) ??
      createEmptySoundResource(),
  };
}
