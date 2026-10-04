import { AbortManager } from "../../event/abort-controller/abort-manager";
import { createActionManager } from "../../event/action-manager/action-manager";
import { createBGMManager } from "../../sounds/bgm/bgm-manager";
import { CssHUDUIScale } from "../../css/hud-ui-scale";
import { DOMDialogBinder } from "../scenes/dom-dialogs/dom-dialog-binder";
import { PostBattleFloater } from "../scenes/dom-floaters/post-battle";
import { DOMSceneBinder } from "../scenes/dom-scenes/dom-scene-binder";
import { DOMFader } from "../game-dom/dom-fader/dom-fader";
import { createGameLoop } from "../game-loop/game-loop";
import { Renderer } from "../../web-gl/render";
import { emptyResources } from "../../resource/empty-resources";
import { ResourceRoot } from "../../resource/resource-root";
import { createSEPlayer } from "../../sounds/se/se-player";
import { TDSceneBinder } from "../scenes/td-scenes/td-scene-binder";
import { pushWindowsStream } from "../../dom/window/push-window";
import { resizeStream } from "../../dom/window/resize";
import { GBraverBurstBrowserConfigRepository } from "../config/repository/repository";
import { GameAction } from "../game-actions";
import { InterruptScenes } from "../innterrupt-scenes";
import { NetworkContext } from "../network-context";
import { SuddenlyBattleEnd } from "../suddenly-battle-end";
import { GameProps } from "./index";

/** GamePropsジェネレータパラメータ */
export type GamePropsGeneratorParams = {
  /** サービスワーカーを利用するか否か、trueで利用する */
  isServiceWorkerUsed: boolean;
  /** 開発中のエピソードをプレイできるか否かのフラグ、trueでプレイできる */
  canPlayEpisodeInDevelopment: boolean;
  /** 開発中のアームドーザを選択できるか否かのフラグ、trueで選択できる */
  canPlayDevelopingArmdozer: boolean;
  /** 開発中のパイロットを選択できるか否かのフラグ、trueで選択できる */
  canPlayDevelopingPilot: boolean;
  /** タイトルヘルプアイコンを表示するか否かのフラグ、trueで表示する */
  isTitleHelpIconEnable: boolean;

  /** 遊び方スライドのURL */
  howToPlayURL: string;
  /** ロボ、パイロット説明スライドのURL */
  characterDescriptionURL: string;
  /** 利用規約ページのURL */
  termsOfServiceURL: string;
  /** 問い合わせページのURL */
  contactURL: string;
  /** プライバシーポリシーページのURL */
  privacyPolicyURL: string;

  /** ブラウザ設定リポジトリ */
  config: GBraverBurstBrowserConfigRepository;

  /** ネットワークコンテキスト */
  networkContext: NetworkContext;

  /** リソースルート */
  resourceRoot: ResourceRoot;
  /** WebGLのパワープリファレンス */
  webglPowerPreference: WebGLPowerPreference;
};

/**
 * ゲームプロパティを生成する
 *
 * @params params パラメータ
 * @returns 生成結果
 */
export function generateGameProps(params: GamePropsGeneratorParams): GameProps {
  const { webglPowerPreference } = params;
  const resize = resizeStream();
  const pushWindow = pushWindowsStream();
  const renderer = new Renderer({ webglPowerPreference, resize });
  const gameLoop = createGameLoop();
  const hudUIScale = new CssHUDUIScale(renderer.getRendererDOM(), resize);
  const abort = new AbortManager();
  return {
    ...params,
    abort,
    performanceStats: null,
    resources: emptyResources(params.resourceRoot),
    sharedResourceState: { type: "Idle" },
    inProgress: {
      type: "None",
    },
    resize,
    pushWindow,
    gameLoop,
    gameAction: createActionManager<GameAction>(),
    hudUIScale: new CssHUDUIScale(renderer.getRendererDOM(), resize),
    suddenlyBattleEnd: new SuddenlyBattleEnd(),
    fader: new DOMFader(),
    interruptScenes: new InterruptScenes(),
    domSceneBinder: new DOMSceneBinder(),
    domDialogBinder: new DOMDialogBinder(),
    postBattle: new PostBattleFloater({ abort }),
    renderer,
    tdSceneBinder: new TDSceneBinder(hudUIScale),
    serviceWorker: null,
    bgm: createBGMManager(),
    se: createSEPlayer(),
  };
}
