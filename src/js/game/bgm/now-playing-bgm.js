// @flow

import {Howl} from 'howler';

/** 
 * 再生中BGM管理オブジェクト
 * 
 * BGMはシーンを超えて利用することがあり、
 * 例えば2シーン前で再生されたBGMを停止したいというケースがある。
 * このケースに対応するにはゲーム全体でBGMを保持する必要があるので、
 * 本オブジェクトがその役割を担う。
 */
export interface NowPlayingBGM {
  /**
   * 再生中のBGMを入れ替える
   * 
   * @param bgm 入れ替えるBGM
   */
  switch(bgm: typeof Howl): void;

  /**
   * 現在再生中のBGMを取得する
   * 
   * @return 現在再生中のBGM
   */
  get(): (typeof Howl);
}

/** NowPlayingBGMのシンプルな実装 */
class SimpleNowPlayingBGM implements NowPlayingBGM {
  _playingBGM: (typeof Howl) | null;

  /**
   * コンストラクタ
   */
  constructor() {
    this._playingBGM = null;
  }

  /** @override */
  switch(bgm: typeof Howl): void {
    this._playingBGM = bgm;
  }

  /** @override */
  get(): typeof Howl {
    return this._playingBGM ?? new Howl({mute: true});
  }
}

/**
 * NowPlayingBGMを生成する
 * 
 * @return 生成結果
 */
export function createNowPlayingBGM(): NowPlayingBGM {
  return new SimpleNowPlayingBGM();
}