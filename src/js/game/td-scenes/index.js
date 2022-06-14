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
import type {Scene} from "./scene";

/** three.js系シーンを集めたもの */
export class TDScenes {
  #gameAction: StreamSource<GameAction>;
  #gameLoop: Stream<GameLoop>;
  #resize: Stream<Resize>;
  #renderer: Renderer;
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
   * @param resources リソース管理オブジェクト
   * @param bgm BGM管理オブジェクト
   * @param playingBGM 再生するBGMのID
   * @param pixelRatio ピクセルレート
   * @param initialAnimationTimeScale 戦闘アニメタイムスケールの初期値
   * @param battleProgress 戦闘を進める
   * @param player プレイヤー情報
   * @param enemy 敵情報
   * @param initialState ゲームの初期状態
   * @return 生成した戦闘シーン
   */
  startBattle(resources: Resources, bgm: BGMManager, playingBGM: SoundId, pixelRatio: number, initialAnimationTimeScale: number, battleProgress: BattleProgress, player: Player, enemy: Player, initialState: GameState[]): BattleScene {
    this.#disposeScene();

    this.#renderer.setPixelRatio(pixelRatio);
    const scene = new BattleScene({resources, bgm, playingBGM, renderer: this.#renderer, battleProgress, initialAnimationTimeScale,
      player, enemy, initialState, gameLoop: this.#gameLoop, resize: this.#resize});
    this.#scene = scene;
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
   * three.jsレンダラのHTML要素を取得する
   *
   * @return 取得結果
   */
  getRendererDOM(): HTMLElement {
    return this.#renderer.getRendererDOM();
  }

  /**
   * 現在表示しているシーンを破棄する
   */
  #disposeScene(): void {
    this.#scene && this.#scene.destructor();
    this.#renderer.disposeRenders();
    this.#unsubscriber.forEach(v => {
      v.unsubscribe();
    });
  }
}