import { SoundResource } from "../resource/sound/resource";

/** SE再生オブジェクト */
export interface SEPlayer {
  /** 効果音のマスターボリューム、設定画面で入力したものをセットする */
  volume: number;

  /**
   * 効果音を再生する
   * @param sound 再生する効果音
   */
  play(sound: SoundResource): void;
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
  play(sound: SoundResource): void {
    sound.sound.volume(this.volume * sound.volumeScale);
  }
}

/**
 * SEPlayerを生成する
 * @return 生成したSEPlayer
 */
export const createSEPlayer = (): SEPlayer => new SimpleSEPlayer();
