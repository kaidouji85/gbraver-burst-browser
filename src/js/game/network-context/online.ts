import {
  BrowserSDK,
  createBrowserSDK,
  initializeBrowserSDK,
} from "@gbraver-burst-network/browser-sdk";
import {
  AuthTokenManager,
  createAuthTokenManager,
  createGuestLocalWebRTCSDK,
  createHostLocalWebRTCSDK,
  GuestLocalWebRTCSDK,
  HostLocalWebRTCSDK,
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

  /** ローカルWebRTC用認証トークンマネージャー */
  localAuthTokenManager: AuthTokenManager;
  /** ローカルWebRTCホスト用のSDK */
  localHostSDK: HostLocalWebRTCSDK;
  /** ローカルWebRTCゲスト用のSDK */
  localGuestSDK: GuestLocalWebRTCSDK;
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
  wsSignalUrl: string;
  /** WebRTC対戦ヘルパーAPIのURL */
  webRTCHelperApiURL: string;
  /** coturn サーバーのドメイン名 */
  coturnDomainName: string;
  /** オンラインベータ機能が利用できるか否か、trueで利用できる */
  canBeta: boolean;
}): Promise<Online> {
  initializeBrowserSDK(options);
  const { webSocketAPIURL, wsSignalUrl, webRTCHelperApiURL, coturnDomainName } =
    options;
  const sdk = await createBrowserSDK(webSocketAPIURL);
  const localAuthTokenManager = createAuthTokenManager(webRTCHelperApiURL);
  const localHostSDK = createHostLocalWebRTCSDK({
    authToken: localAuthTokenManager,
    wsSignalUrl,
    webRTCHelperApiURL,
    coturnDomainName,
  });
  const localGuestSDK = createGuestLocalWebRTCSDK({
    authToken: localAuthTokenManager,
    wsSignalUrl,
    webRTCHelperApiURL,
    coturnDomainName,
  });
  return {
    type: "online",
    canBeta: options.canBeta,

    sdk,

    localAuthTokenManager,
    localHostSDK,
    localGuestSDK,
  };
}
