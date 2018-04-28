// @flow

/** シーン */
export interface Scene {
  /** ゲームループ毎の処理 */
  gameLoop(time: DOMHighResTimeStamp): void;
}