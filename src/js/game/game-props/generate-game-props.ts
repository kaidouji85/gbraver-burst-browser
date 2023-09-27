import {ResourceRoot} from "../../resource/resource-root";
import {BrowserSDK} from "@gbraver-burst-network/browser-sdk";
import {GBraverBurstBrowserConfigRepository} from "../config/repository/repository";
import {resizeStream} from "../../window/resize";
import {pushWindowsStream} from "../../window/push-window";
import {Renderer} from "../../render";
import {gameLoopStream} from "../../game-loop/game-loop";
import {CssHUDUIScale} from "../../css/hud-ui-scale";
import {emptyResources} from "../../resource";
import {createVisibilityChange} from "../../visibility-change/visibility-change";
import {CssVH} from "../../css/vh";
import {FutureSuddenlyBattleEnd} from "../future-suddenly-battle-end";
import {DOMFader} from "../../components/dom-fader/dom-fader";
import {InterruptScenes} from "../innterrupt-scenes";
import {DOMSceneBinder} from "../dom-scene-binder";
import {DOMDialogBinder} from "../dom-dialog-binder";
import {DOMFloaters} from "../dom-floaters/dom-floaters";
import {postBattleConnector} from "../action-connector/post-battle-connector";
import {TDSceneBinder} from "../td-scene-binder";
import {createBGMManager} from "../../bgm/bgm-manager";
import {GameProps} from "./index";
import {map, merge, Observable} from "rxjs";
import {GameAction} from "../game-actions";

/** GamePropsジェネレータパラメータ */
export type GamePropsGeneratorParam = {
  /** リソースルート */
  resourceRoot: ResourceRoot;
  /** 遊び方スライドのURL */
  howToPlayURL: string;
  /** 利用規約ページのURL */
  termsOfServiceURL: string;
  /** 問い合わせページのURL */
  contactURL: string;
  /** プライバシーポリシーページのURL */
  privacyPolicyURL: string;
  /** FPS統計を表示するか否か、trueで表示する */
  isPerformanceStatsVisible: boolean;
  /** サービスワーカーを利用するか否か、trueで利用する */
  isServiceWorkerUsed: boolean;
  /** APIサーバ系機能が利用可能か否か、trueで利用可能 */
  isAPIServerEnable: boolean;
  /** APIサーバのSDK */
  api: BrowserSDK;
  /** ブラウザ設定リポジトリ */
  config: GBraverBurstBrowserConfigRepository;
  /** 開発中のチュートリアルをプレイできるか否かのフラグ、trueでプレイできる */
  canPlayTutorialInDevelopment: boolean;
  /** 開発中のリソースをロードするか否かのフラグ、trueでロードする */
  shouldLoadDevelopingResource: boolean;
  /** 開発中のアームドーザを選択できるか否かのフラグ、trueで選択できる */
  canPlayDevelopingArmdozer: boolean;
  /** 開発中のパイロットを選択できるか否かのフラグ、trueで選択できる */
  canPlayDevelopingPilot: boolean;
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
  const suddenlyBattleEnd = new FutureSuddenlyBattleEnd();
  const suddenlyBattleEndNotifier: Observable<GameAction> =
    suddenlyBattleEnd.stream().pipe(
      map(() => ({
        type: "SuddenlyBattleEnd",
      })),
    );
  const webSocketAPIErrorNotifier: Observable<GameAction> = param.api
    .websocketErrorNotifier()
    .pipe(
      map((error) => ({
        type: "WebSocketAPIError",
        error,
      })),
    );
  const tdBinder = new TDSceneBinder(renderer, hudUIScale);
  const domSceneBinder = new DOMSceneBinder();
  const domDialogBinder = new DOMDialogBinder()
  const domFloaters = new DOMFloaters({
    postBattleConnector,
  });
  const gameAction: Observable<GameAction> = merge(
    tdBinder.gameActionNotifier(),
    domSceneBinder.gameActionNotifier(),
    domDialogBinder.gameActionNotifier(),
    domFloaters.gameActionNotifier(),
    suddenlyBattleEndNotifier,
    webSocketAPIErrorNotifier,
  );
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
    inProgress: {
      type: "None",
    },
    resize,
    pushWindow,
    gameLoop,
    gameAction,
    visibilityChange: createVisibilityChange(),
    vh: new CssVH(resize),
    hudUIScale: new CssHUDUIScale(renderer.getRendererDOM(), resize),
    api: param.api,
    config: param.config,
    suddenlyBattleEnd,
    fader: new DOMFader(),
    interruptScenes: new InterruptScenes(),
    domSceneBinder,
    domDialogBinder,
    domFloaters,
    renderer,
    tdBinder,
    serviceWorker: null,
    bgm: createBGMManager(),
    canPlayTutorialInDevelopment: param.canPlayTutorialInDevelopment,
    shouldLoadDevelopingResource: param.shouldLoadDevelopingResource,
    canPlayDevelopingArmdozer: param.canPlayDevelopingArmdozer,
    canPlayDevelopingPilot: param.canPlayDevelopingPilot,
  };
}