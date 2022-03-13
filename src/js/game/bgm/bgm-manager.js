// @flow
import type {BGM} from "./bgm";
import type {BGMOperator} from "./bgm-operators";

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