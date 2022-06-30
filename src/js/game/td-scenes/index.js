// @flow
import type {GameState, Player} from "gbraver-burst-core";
import type {BGMManager} from "../../bgm/bgm-manager";
import type {GameLoop} from "../../game-loop/game-loop";
import {gameLoopStream} from "../../game-loop/game-loop";
import {Renderer} from "../../render";
import type {Resources} from "../../resource";
import type {SoundId} from "../../resource/sound";
import type {Stream, StreamSource, Unsubscriber} from "../../stream/stream";
import {createStreamSource} from "../../stream/stream";
import type {Resize} from "../../window/resize";
import type {GameAction} from "../game-actions";
import {BattleScene} from "./battle";
import type {BattleProgress} from "./battle/battle-progress";
import type {CustomBattleEvent} from "./battle/custom-battle-event";
import type {Scene} from "./scene";

/** 戦闘シーン開始パラメータ */
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

/** three.js系シーンを集めたもの */
export class TDScenes {
  #gameAction: StreamSource<GameAction>;
  #gameLoop: Stream<GameLoop>;
  #resize: Stream<Resize>;
  #renderer: Renderer;
  #rootHTMLElement: HTMLElement;
  #scene: ?Scene;
  #unsubscriber: Unsubscriber[];

  /**
   * コンストラクタ
   *
   * @param resize リサイズストリーム
   */
  constructor(resize: Stream<Resize>) {
    this.#resize = resize;
    this.#renderer = new Renderer(this.#resize);
    this.#gameAction = createStreamSource();
    this.#gameLoop = gameLoopStream();
    this.#scene = null;
    this.#rootHTMLElement = document.createElement('div');
    this.#unsubscriber = [];
  }

  /** デストラクタ相当の処理 */
  destructor(): void {
    this.#disposeScene();
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
      player: params.player, enemy: params.enemy, initialState: params.initialState, gameLoop: this.#gameLoop, resize: this.#resize});
    this.#scene = scene;
    scene.getHTMLElements().forEach(element => {
      this.#rootHTMLElement.appendChild(element);
    });
    this.#unsubscriber = [
      scene.gameEndNotifier().subscribe(v => {
        this.#gameAction.next({type: 'EndBattle', gameEnd: v.gameEnd, animationTimeScale: v.animationTimeScale});
      })
    ];
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
    return [this.#rootHTMLElement, this.#renderer.getRendererDOM()];
  }

  /**
   * 現在表示しているシーンを破棄する
   */
  #disposeScene(): void {
    this.#scene && this.#scene.destructor();
    this.#renderer.disposeRenders();
    this.#rootHTMLElement.innerHTML = '';
    this.#unsubscriber.forEach(v => {
      v.unsubscribe();
    });
  }
}