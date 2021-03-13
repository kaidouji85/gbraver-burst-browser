// @flow

import {Renderer} from "../../render";
import {Observable, Subject, Subscription} from "rxjs";
import type {Resources} from "../../resource";
import type {BattleRoom, InitialState} from "../../battle-room/battle-room";
import {BattleScene} from "./battle";
import type {Scene} from "./scene";
import type {GameLoop} from "../../game-loop/game-loop";
import type {Resize} from "../../window/resize";
import type {EndBattle, GameAction} from "../actions/game-actions";
import {map} from "rxjs/operators";
import {deprecated_gameLoopStream} from "../../game-loop/game-loop";
import type {Stream} from "../../stream/core";
import {toStream} from "../../stream/rxjs";

/** three.js系シーンを集めたもの */
export class TDScenes {
  _endBattle: Subject<EndBattle>;
  _gameLoop: Observable<GameLoop>;
  _resize: Stream<Resize>;
  _renderer: Renderer;
  _scene: ?Scene;
  _sceneSubscriptions: Subscription[];

  /**
   * コンストラクタ
   *
   * @param resize リサイズストリーム
   */
  constructor(resize: Stream<Resize>) {
    this._endBattle = new Subject<EndBattle>();
    this._gameLoop = deprecated_gameLoopStream();
    this._resize = resize;

    this._renderer = new Renderer({
      resize: this._resize,
    });

    this._scene = null;
    this._sceneSubscriptions = [];
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
  gameActionNotifier(): Observable<GameAction> {
    return this._endBattle.pipe(
      map(v => (v: GameAction))
    );
  }

  /**
   * 戦闘シーンを開始する
   *
   * @param resources リソース管理オブジェクト
   * @param room 戦闘ルーム
   * @param initialState 初期状態
   * @return 生成した戦闘シーン
   */
  startBattle(resources: Resources, room: BattleRoom, initialState: InitialState): BattleScene {
    this._disposeScene();

    const scene = new BattleScene({
      resources: resources,
      renderer: this._renderer,
      battleProgress: room,
      initialState: initialState,
      listener: {
        gameLoop: toStream(this._gameLoop),
        resize: this._resize,
      }
    });
    this._scene = scene;
    this._sceneSubscriptions = [
      scene.notifier().endBattle.subscribe(v => {
        this._endBattle.next({
          type: 'EndBattle',
          gameEnd: v,
        });
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
    this._sceneSubscriptions.forEach(v => {
      v.unsubscribe();
    });
  }
}