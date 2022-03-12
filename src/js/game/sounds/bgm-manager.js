// @flow
import type {SoundResource} from "../../resource/sound";

/** BGMの状態 */
export type BGM = NowPlayingBGM | NoBGM;

/** BGM再生中 */
export type NowPlayingBGM = {
  type: 'NowPlayingBGM',
  /** 再生中のBGM */
  resource: SoundResource
};

/** BGMなし */
export type NoBGM = {
  type: 'NoBGM',
};

/** BGM管理オブジェクト */
export interface BGMManager {
  /**
   * BGMを切り替える
   * 
   * @param bgm 切り替えるBGM
   */
  switch(bgm: BGM): void;

  /**
   * 現在のBGMを取得する
   * 
   * @return 取得結果
   */
  get(): BGM;
}

/** BGM管理オブジェクトのシンプルな実装 */
class SimpleBGMManager implements BGMManager {
  _bgm: BGM;

  /**
   * コンストラクタ
   */
  constructor() {
    this._bgm = {type: 'NoBGM'};
  }

  /** @override */
  switch(bgm: BGM): void {
    this._bgm = bgm;
  }

  /** @override */
  get(): BGM {
    return this._bgm;
  }
}

/**
 * BGM管理オブジェクトを生成する
 * 
 * @return 生成結果
 */
export function createBGMManager(): BGMManager {
  return new SimpleBGMManager();
}