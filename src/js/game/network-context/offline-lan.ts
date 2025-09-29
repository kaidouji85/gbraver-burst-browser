import { createOfflineBrowserSDK } from "@gbraver-burst-network/offline-browser-sdk";
import { OfflineBrowserSDK } from "@gbraver-burst-network/offline-browser-sdk/lib/offline-browser-sdk";

/** オフラインLAN */
export type OfflineLAN = {
  type: "offline-lan";
  /** オフラインLAN用のSDK */
  sdk: OfflineBrowserSDK;
};

/**
 * オフラインLAN用のネットワークコンテキストを作成する
 * @param backendURL バックエンドのURL
 * @returns オフラインLAN用のネットワークコンテキスト
 */
export function createOfflineLanContext(backendURL: string): OfflineLAN {
  return {
    type: "offline-lan",
    sdk: createOfflineBrowserSDK({ backendURL }),
  };
}
