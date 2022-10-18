// @flow
import type {GameState, Player} from "gbraver-burst-core";
import type {BGMManager} from "../../bgm/bgm-manager";
import {CssHUDUIScale} from "../../css/hud-ui-scale";
import type {GameLoop} from "../../game-loop/game-loop";
import {gameLoopStream} from "../../game-loop/game-loop";
import {Renderer} from "../../render";
import type {Resources} from "../../resource";
import type {SoundId} from "../../resource/sound";
import type {Stream, StreamSource, Unsubscriber} from "../../stream/stream";
import {createStreamSource} from "../../stream/stream";
import type {PushWindow} from "../../window/push-window";
import type {Resize} from "../../window/resize";
import type {GameAction} from "../game-actions";
import {BattleScene} from "./battle";
import type {BattleProgress} from "./battle/battle-progress";
import type {CustomBattleEvent} from "./battle/custom-battle-event";
import type {TDScene} from "./td-scene";

/** @deprecated 戦闘シーン開始パラメータ */
type StartBattleParams = {
  /** リソース管理オブジェクト */
  resources: Resources,
  /** BGM管理オブジェクト */
  bgm: BGMManager,
  /** 再生するBGM */
  playingBGM: SoundId,
  /** ピクセルレート */
  pixelRatio: number,
  /** アニメーションタイムスケール初期値 */
  initialAnimationTimeScale: number,
  /** バトル進行オブジェクト */
  battleProgress: BattleProgress,
  /** プレイヤー情報 */
  player: Player,
  /** 敵情報 */
  enemy: Player,
  /** 初期ゲームステート */
  initialState: GameState[],
  /** カスタムバトルイベント */
  customBattleEvent?: CustomBattleEvent,
};

/**
 * 3Dシーン・ゲームアクション接続関数
 *
 * @template X シーンのデータ型
 * @param scene 3Dシーン
 * @param gameAction ゲームアクションストリーム
 * @return ゲームションションのアンサブスクライブ
 */
export type GameActionConnector<X: TDScene> = (scene: X, gameAction: StreamSource<GameAction>) => Unsubscriber[];

/** three.js系シーンをバインドする */
export class TDSceneBinder {
  /** ゲームアクション */
  #gameAction: StreamSource<GameAction>;
  /** ゲームループ */
  #gameLoop: Stream<GameLoop>;
  /** リサイズ */
  #resize: Stream<Resize>;
  /** ウインドウ押下 */
  #pushWindow: Stream<PushWindow>;
  /** レンダラ管理オブジェクト */
  #renderer: Renderer;
  /** cssカスタムプロパティ --hud-ui-scale */
  #hudUIScale: CssHUDUIScale;
  /** DOMレイヤーをバインドするHTML要素 */
  #domLayerElement: HTMLElement;
  /** 現在表示中のシーン、何も表示していない場合はnullがセットされる */
  #scene: ?TDScene;
  /** アンサブスクライバ */
  #unsubscribers: Unsubscriber[];

  /**
   * コンストラクタ
   *
   * @param resize リサイズストリーム
   * @param pushWindow window押下ストリーム
   */
  constructor(resize: Stream<Resize>, pushWindow: Stream<PushWindow>) {
    this.#resize = resize;
    this.#pushWindow = pushWindow;
    this.#renderer = new Renderer(this.#resize);
    this.#gameAction = createStreamSource();
    this.#gameLoop = gameLoopStream();
    this.#hudUIScale = new CssHUDUIScale(this.#renderer.getRendererDOM(), resize);
    this.#scene = null;
    this.#domLayerElement = document.createElement('div');
    this.#unsubscribers = [];
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this.#disposeScene();
    this.#hudUIScale.destructor();
  }

  /**
   * 3D系シーンをバインドする
   *
   * @param scene バインドするシーン
   * @param connector
   * @return 生成したシーン
   */
  bind<X: TDScene>(scene: X, connector: GameActionConnector<X>): void {
    this.#disposeScene();
    this.#scene = scene;
    this.#unsubscribers = connector(scene, this.#gameAction);
  }

  /**
   * ゲームアクション通知を取得する
   *
   * @return イベント通知ストリーム
   */
  gameActionNotifier(): Stream<GameAction> {
    return this.#gameAction;
  }

  /**
   * @deprecated
   * 戦闘シーンを開始する
   *
   * @param params 戦闘シーン開始パラメータ
   * @return 生成した戦闘シーン
   */
  startBattle(params: StartBattleParams): BattleScene {
    this.#disposeScene();

    this.#renderer.setPixelRatio(params.pixelRatio);
    const scene = new BattleScene({resources: params.resources, bgm: params.bgm, playingBGM: params.playingBGM,
      renderer: this.#renderer, battleProgress: params.battleProgress, initialAnimationTimeScale: params.initialAnimationTimeScale,
      player: params.player, enemy: params.enemy, initialState: params.initialState, gameLoop: this.#gameLoop, resize: this.#resize,
      pushWindow: this.#pushWindow, customBattleEvent: params.customBattleEvent});
    this.#scene = scene;
    scene.getDOMLayerElements().forEach(element => {
      this.#domLayerElement.appendChild(element);
    });
    this.#unsubscribers = [
      scene.gameEndNotifier().subscribe(v => {
        this.#gameAction.next({type: 'EndBattle', gameEnd: v.gameEnd, animationTimeScale: v.animationTimeScale});
      })
    ];
    // iPadOS 15.7で--hud-ui-scaleに正しい値がセットされないことがあった
    // なので、3Dシーンが始まる前に強制的に値を更新している
    this.#hudUIScale.update();
    return scene;
  }

  /**
   * 3Dシーンを非表示にする
   */
  hidden(): void {
    this.#disposeScene();
  }

  /**
   * 本クラスで利用している全HTML要素を取得する
   *
   * @return 本クラスで利用している全HTML要素
   */
  getHTMLElements(): HTMLElement[] {
    return [this.#domLayerElement, this.#renderer.getRendererDOM()];
  }

  /**
   * 現在表示しているシーンを破棄する
   */
  #disposeScene(): void {
    this.#scene && this.#scene.destructor();
    this.#renderer.disposeRenders();
    this.#domLayerElement.innerHTML = '';
    this.#unsubscribers.forEach(v => {
      v.unsubscribe();
    });
  }
}