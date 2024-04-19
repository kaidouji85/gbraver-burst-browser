import type { BGM } from "./bgm";
import type { BGMOperator } from "./bgm-operators";

/** BGM管理オブジェクト */
export interface BGMManager {
  /**
   * BGMにオペレータを適用する
   * @param operator オペレータ
   * @return オペレータ後のBGM
   */
  do(operator: BGMOperator): Promise<BGM>;
}

/** BGM管理オブジェクトのシンプルな実装 */
class SimpleBGMManager implements BGMManager {
  /** BGMの状態 */
  #bgm: BGM;
  /** 最後に適応したオペレータが完了したら発火するPromise */
  #lastOperation: Promise<BGM>;

  /**
   * コンストラクタ
   */
  constructor() {
    this.#bgm = {
      type: "NoBGM",
      bgmVolume: 1,
    };
    this.#lastOperation = Promise.resolve(this.#bgm);
  }

  /** @override */
  async do(operator: BGMOperator): Promise<BGM> {
    const prevOperation = this.#lastOperation;
    this.#lastOperation = operator(this.#bgm);
    await prevOperation;
    this.#bgm = await this.#lastOperation;
    return this.#bgm;
  }
}

/**
 * BGM管理オブジェクトを生成する
 * @return 生成結果
 */
export function createBGMManager(): BGMManager {
  return new SimpleBGMManager();
}

/** 
 * BGM管理オブジェクトコンテナ
 * プロパティ、パラメータでBGMManagerを使う場合、
 * 同じプロパティ名にしてオブジェクトの引き回しが出来るようにする
 */
export type BGMManagerContainer = {
  /** BGM管理オブジェクト */
  readonly bgm: BGMManager;
}