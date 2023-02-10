import { PostNetworkError } from "../post-network-error";

/** 通信エラーダイアログを閉じる */
export type EndNetworkError = {
  type: "EndNetworkError";
  /** ダイアログを閉じた後の処理に必要な情報 */
  postNetworkError: PostNetworkError;
};
