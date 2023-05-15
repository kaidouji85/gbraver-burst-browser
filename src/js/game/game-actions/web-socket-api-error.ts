/** WebSocketAPI エラー発生 */
export type WebSocketAPIError = {
  type: "WebSocketAPIError";

  /** エラー情報 */
  error: unknown;
};
