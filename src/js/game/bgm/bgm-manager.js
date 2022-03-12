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

/**
 * BGMオペレータ
 *
 * @param bgm 現在のBGM
 * @return オペレーション後のBGM
 */
export type BGMOperator = (bgm: BGM) => Promise<BGM>;

/** BGM管理オブジェクト */
export interface BGMManager {
  /**
   * BGMに何らかの操作をする
   *
   * @param operator オペレータ
   * @return オペレータ後のBGM
   */
  do(operator: BGMOperator): Promise<BGM>;
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
  async do(operator: BGMOperator): Promise<BGM> {
    const update = await operator(this._bgm);
    this._bgm = update;
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