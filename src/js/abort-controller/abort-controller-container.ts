/**
 * AbortControllerコンテナ
 * 戦闘アニメーション、メッセージおくりなどを強制終了するために利用する
 */
export type AbortControllerContainer = {
  /** AbortController */
  abortController: AbortController;
};
