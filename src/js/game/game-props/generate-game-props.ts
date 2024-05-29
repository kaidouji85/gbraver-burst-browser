import { BrowserSDK } from "@gbraver-burst-network/browser-sdk";

import { createBGMManager } from "../../bgm/bgm-manager";
import { CssHUDUIScale } from "../../css/hud-ui-scale";
import { DOMFader } from "../../game-dom/dom-fader/dom-fader";
import { gameLoopStream } from "../../game-loop/game-loop";
import { Renderer } from "../../render";
import { emptyResources } from "../../resource/empty-resources";
import type { ResourceRoot } from "../../resource/resource-root";
import { createSEPlayer } from "../../se/se-player";
import { pushWindowsStream } from "../../window/push-window";
import { resizeStream } from "../../window/resize";
import { postBattleConnector } from "../action-connector/post-battle-connector";
import { GBraverBurstBrowserConfigRepository } from "../config/repository/repository";
import { DOMDialogBinder } from "../dom-dialog-binder";
import { DOMFloaters } from "../dom-floaters/dom-floaters";
import { DOMSceneBinder } from "../dom-scene-binder";
import { FutureSuddenlyBattleEnd } from "../future-suddenly-battle-end";
import { InterruptScenes } from "../innterrupt-scenes";
import { TDSceneBinder } from "../../binder/td-scene-binder";
import { GameProps } from "./index";

/** GamePropsジェネレータパラメータ */
export type GamePropsGeneratorParams = {
  /** サービスワーカーを利用するか否か、trueで利用する */
  isServiceWorkerUsed: boolean;
  /** APIサーバ系機能が利用可能か否か、trueで利用可能 */
  isAPIServerEnable: boolean;
  /** 開発中のエピソードをプレイできるか否かのフラグ、trueでプレイできる */
  canPlayEpisodeInDevelopment: boolean;
  /** 開発中のリソースをロードするか否かのフラグ、trueでロードする */
  shouldLoadDevelopingResource: boolean;
  /** 開発中のアームドーザを選択できるか否かのフラグ、trueで選択できる */
  canPlayDevelopingArmdozer: boolean;
  /** 開発中のパイロットを選択できるか否かのフラグ、trueで選択できる */
  canPlayDevelopingPilot: boolean;

  /** 遊び方スライドのURL */
  howToPlayURL: string;
  /** 利用規約ページのURL */
  termsOfServiceURL: string;
  /** 問い合わせページのURL */
  contactURL: string;
  /** プライバシーポリシーページのURL */
  privacyPolicyURL: string;

  /** ブラウザ設定リポジトリ */
  config: GBraverBurstBrowserConfigRepository;

  /** APIサーバのSDK */
  api: BrowserSDK;

  /** リソースルート */
  resourceRoot: ResourceRoot;
};

/**
 * ゲームプロパティを生成する
 *
 * @params params パラメータ
 * @returns 生成結果
 */
export function generateGameProps(params: GamePropsGeneratorParams): GameProps {
  const resize = resizeStream();
  const pushWindow = pushWindowsStream();
  const renderer = new Renderer(resize);
  const gameLoop = gameLoopStream();
  const hudUIScale = new CssHUDUIScale(renderer.getRendererDOM(), resize);
  return {
    ...params,
    performanceStats: null,
    resources: emptyResources(params.resourceRoot),
    isFullResourceLoaded: false,
    inProgress: {
      type: "None",
    },
    resize,
    pushWindow,
    gameLoop,
    hudUIScale: new CssHUDUIScale(renderer.getRendererDOM(), resize),
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
    se: createSEPlayer(),
  };
}
