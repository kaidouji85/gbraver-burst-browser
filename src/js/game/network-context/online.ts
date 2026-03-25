import {
  BrowserSDK,
  createBrowserSDK,
  initializeBrowserSDK,
} from "@gbraver-burst-network/browser-sdk";
import {
  createLocalWebRTCGuestSDK,
  createLocalWebRTCHostSDK,
  LocalWebRTCGuestSDK,
  LocalWebRTCHostSDK,
} from "@gbraver-burst-network/local-webrtc-browser-sdk";

/** オンライン */
export type Online = {
  type: "online";

  /**
   * ベータ版機能が利用できるか否か、trueで利用できる
   * 本フラグはボタン表示制御に利用される
   */
  canBeta: boolean;

  /** オンライン用のSDK */
  sdk: BrowserSDK;

  /** ローカルWebRTCホスト用のSDK */
  localHostSDK: LocalWebRTCHostSDK;
  /** ローカルWebRTCゲスト用のSDK */
  localGuestSDK: LocalWebRTCGuestSDK;
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
  /** ローカルWebRTC用シグナルサーバーのURL */
  signalServerURL: string;
  /** オンラインベータ機能が利用できるか否か、trueで利用できる */
  canBeta: boolean;
}): Promise<Online> {
  initializeBrowserSDK(options);
  const sdk = await createBrowserSDK(options.webSocketAPIURL);
  const localHostSDK = createLocalWebRTCHostSDK(options.signalServerURL);
  const localGuestSDK = createLocalWebRTCGuestSDK(options.signalServerURL);
  return {
    type: "online",
    canBeta: options.canBeta,

    sdk,

    localHostSDK,
    localGuestSDK,
  };
}
