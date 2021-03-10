// @flow

/**
 * 購読停止オブジェクト
 */
export interface UnSubscriber {
  /** ストリームの購読を停止する */
  unSubscribe(): void;
}