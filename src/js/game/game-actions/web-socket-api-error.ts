/** WebSocketAPI エラー発生 */
export type WebSocketAPIError = {
  type: "WebSocketAPIError";

  /** エラー情報 */
  /* eslint-disable @typescript-eslint/no-explicit-any */
  error: any;
  /* eslint-enable */
};
