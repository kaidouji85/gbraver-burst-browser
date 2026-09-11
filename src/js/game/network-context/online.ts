import {
  AuthTokenManager,
  createAuthTokenManager,
  createGuestAnonymousSDK,
  createHostAnonymousSDK,
  GuestAnonymousSDK,
  HostAnonymousSDK,
} from "@gbraver-burst-network/anonymous-browser-sdk";
import {
  BrowserSDK,
  createBrowserSDK,
  initializeBrowserSDK,
} from "@gbraver-burst-network/browser-sdk";

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
  /** ホスト用匿名バックエンドのSDK */
  hostAnonymousSDK: HostAnonymousSDK;
  /** ゲスト用匿名バックエンドのSDK */
  guestAnonymousSDK: GuestAnonymousSDK;
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
  /** 匿名バックエンド REST APIのURL */
  anonymousBackendApiURL: string;
  /** coturn サーバーのドメイン名 */
  coturnDomainName: string;
  /** オンラインベータ機能が利用できるか否か、trueで利用できる */
  canBeta: boolean;
}): Promise<Online> {
  initializeBrowserSDK(options);
  const {
    webSocketAPIURL,
    wsSignalUrl,
    anonymousBackendApiURL,
    coturnDomainName,
  } = options;
  const sdk = await createBrowserSDK(webSocketAPIURL);
  const localAuthTokenManager = createAuthTokenManager(anonymousBackendApiURL);
  const localHostSDK = createHostAnonymousSDK({
    authToken: localAuthTokenManager,
    wsSignalUrl,
    anonymousBackendApiURL,
    coturnDomainName,
  });
  const localGuestSDK = createGuestAnonymousSDK({
    authToken: localAuthTokenManager,
    wsSignalUrl,
    anonymousBackendApiURL,
    coturnDomainName,
  });
  return {
    type: "online",
    canBeta: options.canBeta,

    sdk,

    localAuthTokenManager,
    hostAnonymousSDK: localHostSDK,
    guestAnonymousSDK: localGuestSDK,
  };
}
