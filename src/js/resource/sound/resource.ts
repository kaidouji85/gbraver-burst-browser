import { Howl } from "howler";

import { ResourceRoot } from "../resource-root";

/** 音リソースのユニークID */
export type SoundId = string;

/**
 * 音種別
 * 音量調整のグルーピングに利用する
 * たとえばBGMは音量0、SEは音量MAXとしたい時に、本データ型で音の種別を判別する
 */
export type SoundType = "BGM" | "SE";

/** 音リソースの設定 */
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
