// @flow
import type {
  CasualMatch as CasualMatchSDK,
  LoggedInUserDelete,
  LoginCheck,
  Logout,
  MailVerify,
  UniversalLogin,
  UserMailGet,
  UserNameGet,
  UserPictureGet,
  WebsocketDisconnect,
  WebsocketErrorNotifier,
  WebsocketUnintentionalCloseNotifier,
} from "@gbraver-burst-network/browser-core";

import type { BGMManager } from "../bgm/bgm-manager";
import { createBGMManager } from "../bgm/bgm-manager";
import { DOMFader } from "../components/dom-fader/dom-fader";
import { CssHUDUIScale } from "../css/hud-ui-scale";
import { CssVH } from "../css/vh";
import type { GameLoop } from "../game-loop/game-loop";
import { gameLoopStream } from "../game-loop/game-loop";
import { Renderer } from "../render";
import type { Resources } from "../resource";
import { emptyResources } from "../resource";
import type { ResourceRoot } from "../resource/resource-root";
import type { Stream } from "../stream/stream";
import type { PushWindow } from "../window/push-window";
import { pushWindowsStream } from "../window/push-window";
import type { Resize } from "../window/resize";
import { resizeStream } from "../window/resize";
import type { GbraverBurstBrowserConfigRepository } from "./config/browser-config";
import { DOMDialogBinder } from "./dom-dialog-binder";
import { postBattleConnector } from "./dom-floaters/action-connector/post-battle-connector";
import { DOMFloaters } from "./dom-floaters/dom-floaters";
import { DOMSceneBinder } from "./dom-scene-binder";
import { FutureSuddenlyBattleEnd } from "./future-suddenly-battle-end";
import type { InProgress } from "./in-progress/in-progress";
import { InterruptScenes } from "./innterrupt-scenes";
import { TDSceneBinder } from "./td-scene-binder";

/** ゲーム管理オブジェクトで利用するAPIサーバの機能 */
export interface GameAPI
  extends UniversalLogin,
    LoginCheck,
    CasualMatchSDK,
    Logout,
    LoggedInUserDelete,
    UserNameGet,
    UserPictureGet,
    MailVerify,
    UserMailGet,
    WebsocketDisconnect,
    WebsocketErrorNotifier,
    WebsocketUnintentionalCloseNotifier {}

/**
 * ゲームプロパティ
 * 本オブジェクトはゲーム管理オブジェクト内部、各種ヘルパーで利用することを想定している
 */
export interface GameProps {
  /** FPS統計を表示するか否か、trueで表示する */
  isPerformanceStatsVisible: boolean;
  /** サービスワーカーを利用するか否か、trueで利用する */
  isServiceWorkerUsed: boolean;
  /** 遊び方スライドのURL */
  howToPlayURL: string;
  /** 利用規約ページのURL */
  termsOfServiceURL: string;
  /** プライバシーポリシーページのURL */
  privacyPolicyURL: string;
  /** 問い合わせページのURL */
  contactURL: string;
  /** APIサーバ系機能が利用可能か否か、trueで利用可能 */
  isAPIServerEnable: boolean;
  /** 現在進行中のフロー */
  inProgress: InProgress;
  /** ゲームで利用するAPI */
  api: GameAPI;
  /** ブラウザ設定リポジトリ */
  config: GbraverBurstBrowserConfigRepository;
  /** バトル強制終了監視 */
  suddenlyBattleEnd: FutureSuddenlyBattleEnd;
  /** リサイズ */
  resize: Stream<Resize>;
  /** window押下 */
  pushWindow: Stream<PushWindow>;
  /** ゲームループ */
  gameLoop: Stream<GameLoop>;
  /** cssカスタムプロパティ --vh */
  vh: CssVH;
  /** cssカスタムプロパティ --hud-ui-scale */
  hudUIScale: CssHUDUIScale;
  /** DOMフェーダ */
  fader: DOMFader;
  /** 強制割込シーン管理オブジェクト */
  interruptScenes: InterruptScenes;
  /** DOMシーンバインダー */
  domSceneBinder: DOMSceneBinder;
  /** DOMダイアログバインダー */
  domDialogBinder: DOMDialogBinder;
  /** DOMフローター管理オブジェクト */
  domFloaters: DOMFloaters;
  /** レンダラ管理オブジェクト */
  renderer: Renderer;
  /** 3Dシーンバインダー */
  tdBinder: TDSceneBinder;
  /** リソースルート */
  resourceRoot: ResourceRoot;
  /** リソース管理オブジェクト */
  resources: Resources;
  /** 全リソースを読み込んだか否かのフラグ、trueで全リソースを読み込んだ */
  isFullResourceLoaded: boolean;
  /** ServiceWorkerRegistrationのキャッシュ */
  serviceWorker: ?ServiceWorkerRegistration;
  /** BGM管理オブジェクト */
  bgm: BGMManager;
  /** 開発中のチュートリアルをプレイできるか否かのフラグ、trueでプレイできる */
  canPlayTutorialInDevelopment: boolean;
  /** 開発中のリソースをロードするか否かのフラグ、trueでロードする */
  shouldLoadDevelopingResource: boolean;
}

/** GamePropsジェネレータパラメータ */
export type GamePropsGeneratorParam = {
  /** リソースルート */
  resourceRoot: ResourceRoot,
  /** 遊び方スライドのURL */
  howToPlayURL: string,
  /** 利用規約ページのURL */
  termsOfServiceURL: string,
  /** 問い合わせページのURL */
  contactURL: string,
  /** プライバシーポリシーページのURL */
  privacyPolicyURL: string,
  /** FPS統計を表示するか否か、trueで表示する */
  isPerformanceStatsVisible: boolean,
  /** サービスワーカーを利用するか否か、trueで利用する */
  isServiceWorkerUsed: boolean,
  /** APIサーバ系機能が利用可能か否か、trueで利用可能 */
  isAPIServerEnable: boolean,
  /** APIサーバのSDK */
  api: GameAPI,
  /** ブラウザ設定リポジトリ */
  config: GbraverBurstBrowserConfigRepository,
  /** 開発中のチュートリアルをプレイできるか否かのフラグ、trueでプレイできる */
  canPlayTutorialInDevelopment: boolean,
  /** 開発中のリソースをロードするか否かのフラグ、trueでロードする */
  shouldLoadDevelopingResource: boolean,
};

/**
 * ゲームプロパティを生成する
 *
 * @param param パラメータ
 * @return 生成結果
 */
export function generateGameProps(param: GamePropsGeneratorParam): GameProps {
  const resize = resizeStream();
  const pushWindow = pushWindowsStream();
  const renderer = new Renderer(resize);
  const gameLoop = gameLoopStream();
  const hudUIScale = new CssHUDUIScale(renderer.getRendererDOM(), resize);
  return {
    resourceRoot: param.resourceRoot,
    resources: emptyResources(param.resourceRoot),
    isFullResourceLoaded: false,
    isServiceWorkerUsed: param.isServiceWorkerUsed,
    isPerformanceStatsVisible: param.isPerformanceStatsVisible,
    howToPlayURL: param.howToPlayURL,
    termsOfServiceURL: param.termsOfServiceURL,
    privacyPolicyURL: param.privacyPolicyURL,
    contactURL: param.contactURL,
    isAPIServerEnable: param.isAPIServerEnable,
    inProgress: { type: "None" },
    resize,
    pushWindow,
    gameLoop,
    vh: new CssVH(resize),
    hudUIScale: new CssHUDUIScale(renderer.getRendererDOM(), resize),
    api: param.api,
    config: param.config,
    suddenlyBattleEnd: new FutureSuddenlyBattleEnd(),
    fader: new DOMFader(),
    interruptScenes: new InterruptScenes(),
    domSceneBinder: new DOMSceneBinder(),
    domDialogBinder: new DOMDialogBinder(),
    domFloaters: new DOMFloaters({ postBattleConnector }),
    renderer,
    tdBinder: new TDSceneBinder(renderer, hudUIScale),
    serviceWorker: null,
    bgm: createBGMManager(),
    canPlayTutorialInDevelopment: param.canPlayTutorialInDevelopment,
    shouldLoadDevelopingResource: param.shouldLoadDevelopingResource,
  };
}
