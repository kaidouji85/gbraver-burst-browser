/** ネットワークエラー発生 */
export type NetworkError = {
  type: "NetworkError";
  /** エラー情報 */
  error: unknown;
};
