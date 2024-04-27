import { Howl } from "howler";

import { ResourceRoot } from "../resource-root";

/** 音リソースのユニークID */
export type SoundId = string;

/** 音リソースの設定 */
export type SoundConfig = {
  /** 音ID*/
  readonly id: SoundId;
  /** ボリュームスケール */
  readonly volumeScale: number;

  /**
   * 素材のパス
   * @param resourceRoot リソースルート
   * @returns 素材のパス
   */
  path: (resourceRoot: ResourceRoot) => string;
};

/**音リソース */
export type SoundResource = {
  /** 音ID */
  readonly id: SoundId;
  /** 音声データ */
  readonly sound: Howl;

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
