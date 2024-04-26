import type { Resources } from "../../resource";
import { createEmptySoundResource } from "../../resource/sound/empty-sound-resource";
import { SOUND_IDS } from "../../resource/sound/ids";
import type { SoundResource } from "../../resource/sound/resource";
import type { SoundId } from "../../resource/sound/resource";

/** 戦闘シーン 効果音 */
export class BattleSceneSounds {
  /** バッテリー決定音 */
  batteryDeclaration: SoundResource;
  /** バッテリー回復音 */
  batteryRecover: SoundResource;
  /** メッセージ送り音 */
  sendMessage: SoundResource;
  /** BGM */
  bgm: SoundResource;

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   * @param playingBGM 再生するBGMのID
   */
  constructor(resources: Resources, playingBGM: SoundId) {
    this.batteryDeclaration =
      resources.sounds.find((v) => v.id === SOUND_IDS.BATTERY_DECLARATION) ??
      createEmptySoundResource();
    this.batteryRecover =
      resources.sounds.find((v) => v.id === SOUND_IDS.BATTERY_RECOVER) ??
      createEmptySoundResource();
    this.sendMessage =
      resources.sounds.find((v) => v.id === SOUND_IDS.SEND_MESSAGE) ??
      createEmptySoundResource();
    this.bgm =
      resources.sounds.find((v) => v.id === playingBGM) ??
      createEmptySoundResource();
  }
}
