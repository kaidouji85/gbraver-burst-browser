import {
  BrowserSDK,
  createBrowserSDK,
  initializeBrowserSDK,
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
export async function createOnlineContext(options: {
  /** cognito ユーザープールID */
  userPoolId: string;
  /** cognito ユーザープールクライアントID */
  userPoolClientId: string;
  /** cognito ホスティッドUIドメイン */
  hostedUIDomain: string;
  /** 自分のURL */
  ownURL: string;
  /** WebSocket APIのURL */
  webSocketAPIURL: string;
}): Promise<Online> {
  initializeBrowserSDK(options);
  const sdk = await createBrowserSDK(options.webSocketAPIURL);
  return { type: "online", sdk };
}
