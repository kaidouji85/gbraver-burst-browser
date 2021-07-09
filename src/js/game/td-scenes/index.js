// @flow

import {Renderer} from "../../render";
import type {Resources} from "../../resource";
import type {BattleProgress} from "./battle/battle-progress";
import {BattleScene} from "./battle";
import type {Scene} from "./scene";
import type {GameLoop} from "../../game-loop/game-loop";
import type {Resize} from "../../window/resize";
import type {GameAction} from "../actions/game-actions";
import {gameLoopStream} from "../../game-loop/game-loop";
import type {Stream, StreamSource, Unsubscriber} from "../../stream/core";
import {RxjsStreamSource} from "../../stream/rxjs";
import type {Player, GameState} from "gbraver-burst-core";

/** three.js系シーンを集めたもの */
export class TDScenes {
  _gameAction: StreamSource<GameAction>;
  _gameLoop: Stream<GameLoop>;
  _resize: Stream<Resize>;
  _renderer: Renderer;
  _scene: ?Scene;
  _unsubscriber: Unsubscriber[];

  /**
   * コンストラクタ
   *
   * @param resize リサイズストリーム
   */
  constructor(resize: Stream<Resize>) {
    this._gameAction = new RxjsStreamSource();
    this._gameLoop = gameLoopStream();
    this._resize = resize;

    this._renderer = new Renderer({
      resize: this._resize,
    });

    this._scene = null;
    this._unsubscriber = [];
  }

  /** デストラクタ相当の処理 */
  destructor(): void {
    this._disposeScene();
  }

  /**
   * ゲームアクション通知を取得する
   *
   * @return イベント通知ストリーム
   */
  gameActionNotifier(): Stream<GameAction> {
    return this._gameAction;
  }

  /**
   * 戦闘シーンを開始する
   *
   * @param resources リソース管理オブジェクト
   * @param progress 戦闘を進める
   * @param player プレイヤー情報
   * @param enemy 敵情報
   * @param initialState ゲームの初期状態
   * @return 生成した戦闘シーン
   */
  startBattle(resources: Resources, progress: BattleProgress, player: Player, enemy: Player, initialState: GameState[]): BattleScene {
    this._disposeScene();

    const scene = new BattleScene({
      resources: resources,
      renderer: this._renderer,
      battleProgress: progress,
      player: player,
      enemy: enemy,
      initialState: initialState,
      listener: {
        gameLoop: this._gameLoop,
        resize: this._resize,
      }
    });
    this._scene = scene;
    this._unsubscriber = [
      scene.gameEndNotifier().subscribe(v => {
        this._gameAction.next({type: 'EndBattle', gameEnd: v,});
      }),
      scene.battleErrorNotifier().subscribe(() => {
        // オフライン系バトルプログレスはバグ以外では、例外を投げることはない
        // また、オンライン系バトルプログレスは通信エラー以外では、例外を投げることはない
        // よって、バトルプログレスエラーを通信エラーと見なす
        this._gameAction.next({type: 'NetworkError'});
      })
    ];

    return scene;
  }

  /**
   * 3Dシーンを非表示にする
   */
  hidden(): void {
    this._disposeScene();
  }

  /**
   * three.jsレンダラのHTML要素を取得する
   *
   * @return 取得結果
   */
  getRendererDOM(): HTMLElement {
    return this._renderer.getRendererDOM();
  }

  /**
   * 現在表示しているシーンを破棄する
   */
  _disposeScene(): void {
    this._scene && this._scene.destructor();
    this._renderer.dispose();
    this._unsubscriber.forEach(v => {
      v.unsubscribe();
    });
  }
}