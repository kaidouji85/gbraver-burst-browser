// @flow
import type {BGM} from "./bgm";
import type {BGMOperator} from "./bgm-operators";

/** BGM管理オブジェクト */
export interface BGMManager {
  /**
   * BGMにオペレータを適用する
   *
   * @param operator オペレータ
   * @return オペレータ後のBGM
   */
  do(operator: BGMOperator): Promise<BGM>;
}

/** BGM管理オブジェクトのシンプルな実装 */
class SimpleBGMManager implements BGMManager {
  _bgm: BGM;
  _lastOperation: Promise<BGM>;

  /**
   * コンストラクタ
   */
  constructor() {
    this._bgm = {type: 'NoBGM'};
    this._lastOperation = Promise.resolve(this._bgm);
  }

  /** @override */
  async do(operator: BGMOperator): Promise<BGM> {
    const prevOperation = this._lastOperation;
    this._lastOperation = operator(this._bgm);
    await prevOperation;
    this._bgm = await this._lastOperation;
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