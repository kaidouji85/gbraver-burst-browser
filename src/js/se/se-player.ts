import { SoundResource } from "../resource/sound/resource";

/** 効果音再生オプション */
type SEPlayerOptions = {
  /** ボリューム */
  volume?: number;
};

/** SE再生オブジェクト */
export interface SEPlayer {
  /** 効果音のマスターボリューム、設定画面で入力したものをセットする */
  volume: number;

  /**
   * 効果音を再生する
   * @param sound 再生する効果音
   * @param option 再生オプション
   */
  play(sound: SoundResource, option?: SEPlayerOptions): void;
}

/** SE再生オブジェクトのシンプルな実装 */
class SimpleSEPlayer implements SEPlayer {
  /** @override */
  volume: number;

  /**
   * コンストラクタ
   */
  constructor() {
    this.volume = 1;
  }

  /** @override */
  play(sound: SoundResource, option?: SEPlayerOptions): void {
    const playVolume = option?.volume ?? 1;
    sound.sound.volume(this.volume * sound.volumeScale * playVolume);
    sound.sound.play();
  }
}

/**
 * SEPlayerを生成する
 * @returns 生成したSEPlayer
 */
export const createSEPlayer = (): SEPlayer => new SimpleSEPlayer();

/**
 * SE再生オブジェクトコンテナ
 * プロパティ、パラメータでResourcesを使う場合、
 * 同じプロパティ名にしてオブジェクトの引き回しが出来るようにする
 */
export type SEPlayerContainer = {
  /** SE再生オブジェクト */
  readonly se: SEPlayer;
};
