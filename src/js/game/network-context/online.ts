import {
  BrowserSDK,
  createBrowserSDK,
} from "@gbraver-burst-network/browser-sdk";

/** オンライン */
export type Online = {
  type: "online";
  /** オンライン用のSDK */
  sdk: BrowserSDK;
};

/**
 * オンライン用のネットワークコンテキストを作成する
 * @param webSocketAPIURL WebSocket APIのURL
 * @returns オンライン用のネットワークコンテキスト
 */
export async function createOnlineContext(
  webSocketAPIURL: string,
): Promise<Online> {
  return {
    type: "online",
    sdk: await createBrowserSDK(webSocketAPIURL),
  };
}
