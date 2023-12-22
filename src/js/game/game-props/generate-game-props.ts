import { BrowserSDK } from "@gbraver-burst-network/browser-sdk";

import { createBGMManager } from "../../bgm/bgm-manager";
import { DOMFader } from "../../components/dom-fader/dom-fader";
import { CssHUDUIScale } from "../../css/hud-ui-scale";
import { gameLoopStream } from "../../game-loop/game-loop";
import { Renderer } from "../../render";
import { emptyResources } from "../../resource";
import type { ResourceRoot } from "../../resource/resource-root";
import { pushWindowsStream } from "../../window/push-window";
import { resizeStream } from "../../window/resize";
import { postBattleConnector } from "../action-connector/post-battle-connector";
import { GBraverBurstBrowserConfigRepository } from "../config/repository/repository";
import { DOMDialogBinder } from "../dom-dialog-binder";
import { DOMFloaters } from "../dom-floaters/dom-floaters";
import { DOMSceneBinder } from "../dom-scene-binder";
import { FutureSuddenlyBattleEnd } from "../future-suddenly-battle-end";
import { InterruptScenes } from "../innterrupt-scenes";
import { TDSceneBinder } from "../td-scene-binder";
import { GameProps } from "./index";

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
  /** サービスワーカーを利用するか否か、trueで利用する */
  isServiceWorkerUsed: boolean;
  /** APIサーバ系機能が利用可能か否か、trueで利用可能 */
  isAPIServerEnable: boolean;
  /** APIサーバのSDK */
  api: BrowserSDK;
  /** ブラウザ設定リポジトリ */
  config: GBraverBurstBrowserConfigRepository;
  /** 開発中のエピソードをプレイできるか否かのフラグ、trueでプレイできる */
  canPlayEpisodeInDevelopment: boolean;
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
  return {
    performanceStats: null,
    resourceRoot: param.resourceRoot,
    resources: emptyResources(param.resourceRoot),
    isFullResourceLoaded: false,
    isServiceWorkerUsed: param.isServiceWorkerUsed,
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
    hudUIScale: new CssHUDUIScale(renderer.getRendererDOM(), resize),
    api: param.api,
    config: param.config,
    suddenlyBattleEnd: new FutureSuddenlyBattleEnd(),
    fader: new DOMFader(),
    interruptScenes: new InterruptScenes(),
    domSceneBinder: new DOMSceneBinder(),
    domDialogBinder: new DOMDialogBinder(),
    domFloaters: new DOMFloaters({
      postBattleConnector,
    }),
    renderer,
    tdBinder: new TDSceneBinder(renderer, hudUIScale),
    serviceWorker: null,
    bgm: createBGMManager(),
    canPlayEpisodeInDevelopment: param.canPlayEpisodeInDevelopment,
    shouldLoadDevelopingResource: param.shouldLoadDevelopingResource,
    canPlayDevelopingArmdozer: param.canPlayDevelopingArmdozer,
    canPlayDevelopingPilot: param.canPlayDevelopingPilot,
  };
}
