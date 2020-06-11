// @flow

import {Observable, Subject, Subscription} from "rxjs";
import type {PushGameStart, PushHowToPlay} from "../../action/game/title";
import type {SelectionComplete} from "../../action/game/selection-complete";
import type {LoadingAction} from "../../action/loading/loading";
import type {DOMScene} from "./dom-scene";
import {Loading} from "./loading";
import {Title} from "./title";
import {PlayerSelect} from "./player-select";
import {MatchCard} from "./match-card";
import type {ArmDozerId} from "gbraver-burst-core";
import {waitTime} from "../../wait/wait-time";
import {NPCEnding} from "./npc-ending";
import type {EndNPCEnding} from "../../action/game/npc-ending";
import type {Resources} from "../../resource";

/**
 * 最大読み込み待機時間(ミリ秒)
 */
const MAX_LOADING_TIME = 10000;

/** イベント通知 */
type Notifier = {
  pushGameStart: Observable<PushGameStart>,
  pushHowToPlay: Observable<PushHowToPlay>,
  selectionComplete: Observable<SelectionComplete>,
  endNPCEnding: Observable<EndNPCEnding>;
};

/**
 * HTMLオンリーで生成されたシーンを集めたもの
 * 本クラス配下のいずれか1シーンのみが表示される想定
 */
export class DOMScenes {
  _root: HTMLElement;
  _scene: ?DOMScene;
  _pushGameStart: Subject<PushGameStart>;
  _pushHowToPlay: Subject<PushHowToPlay>;
  _selectionComplete: Subject<SelectionComplete>;
  _endNPCEnding: Subject<EndNPCEnding>;
  _sceneSubscriptions: Subscription[];

  constructor() {
    this._root = document.createElement('div');
    this._pushGameStart = new Subject();
    this._pushHowToPlay = new Subject();
    this._selectionComplete = new Subject();
    this._endNPCEnding = new Subject();
    this._sceneSubscriptions = [];
    this._scene = null;
  }

  /** デストラクタ相当の処理 */
  destructor() {
    this._removeCurrentScene();
  }

  /**
   * イベント通知ストリームを取得する
   *
   * @return イベント通知ストリーム
   */
  notifier(): Notifier {
    return {
      pushGameStart: this._pushGameStart,
      pushHowToPlay: this._pushHowToPlay,
      selectionComplete: this._selectionComplete,
      endNPCEnding: this._endNPCEnding,
    }
  }

  /**
   * 新しくローディング画面を開始する
   *
   * @param loading 読み込み状況ストリーム
   * @return 開始されたローディング画面
   */
  startLoading(loading: Observable<LoadingAction>): Loading {
    this._removeCurrentScene();
    const scene = new Loading(loading);
    this._root.appendChild(scene.getRootHTMLElement());

    this._scene = scene
    return scene;
  }

  /**
   * 新しくタイトル画面を開始する
   *
   * @param resources リソース管理オブジェクト
   * @return 開始されたタイトル画面
   */
  async startTitle(resources: Resources): Promise<Title> {
    try {
      this._removeCurrentScene();

      const scene = new Title(resources);
      const notifier = scene.notifier();
      this._sceneSubscriptions = [
        notifier.pushGameStart.subscribe(this._pushGameStart),
        notifier.pushHowToPlay.subscribe(this._pushHowToPlay)
      ];
      this._root.appendChild(scene.getRootHTMLElement());
      await Promise.race([
        scene.waitUntilLoaded(),
        waitTime(MAX_LOADING_TIME)
      ]);

      this._scene = scene;
      return scene;
    } catch(e) {
      throw e;
    }
  }

  /**
   * 新しくプレイヤー選択画面を開始する
   *
   * @param resources リソース管理オブジェクト
   * @return 開始されたプレイヤー選択画面
   */
  async startPlayerSelect(resources: Resources): Promise<PlayerSelect> {
    try {
      this._removeCurrentScene();

      const scene = new PlayerSelect(resources);
      const notifier = scene.notifier();
      this._sceneSubscriptions = [
        notifier.selectionComplete.subscribe(this._selectionComplete)
      ];
      this._root.appendChild(scene.getRootHTMLElement());
      await Promise.race([
        scene.waitUntilLoaded(),
        waitTime(MAX_LOADING_TIME),
      ]);

      this._scene = scene;
      return scene;
    } catch(e) {
      throw e;
    }
  }

  /**
   * 新しく対戦カード画面を開始する
   *
   * @param resources リソース管理オブジェクト
   * @param player プレイヤー側 アームドーザID
   * @param enemy 敵側 アームドーザID
   * @param caption ステージ名
   * @return 開始された対戦カード画面
   */
  async startMatchCard(resources: Resources, player: ArmDozerId, enemy: ArmDozerId, caption: string): Promise<MatchCard> {
    try {
      this._removeCurrentScene();

      const scene = new MatchCard({
        resourcePath: resources.path,
        player: player,
        enemy: enemy,
        caption: caption
      });
      this._root.appendChild(scene.getRootHTMLElement());
      await Promise.race([
        scene.waitUntilLoaded(),
        waitTime(MAX_LOADING_TIME),
      ]);

      this._scene = scene;
      return scene;
    } catch(e) {
      throw e;
    }
  }

  /**
   * 新しくNPCエンディング画面を開始する
   *
   * @param resources リソース管理オブジェクト
   * @return 開始されたNPCエンディング画面
   */
  async startNPCEnding(resources: Resources): Promise<NPCEnding> {
    try {
      this._removeCurrentScene();

      const scene = new NPCEnding(resources);
      this._root.appendChild(scene.getRootHTMLElement());
      this._sceneSubscriptions = [
        scene.notifier().endNpcEnding.subscribe(this._endNPCEnding)
      ];
      await Promise.race([
        scene.waitUntilLoaded(),
        waitTime(MAX_LOADING_TIME),
      ]);

      this._scene = scene;
      return scene;
    } catch(e) {
      throw e;
    }
  }

  /**
   * 本クラス配下のシーンを全て非表示にする
   * 本メソッドは、3Dシーンを表示する前に呼ばれる想定である
   */
  hidden(): void {
    this._removeCurrentScene();
  }

  /**
   * 本クラスのルートHTML要素を取得する
   *
   * @return 取得結果
   */
  getRootHTMLElement(): HTMLElement {
    return this._root;
  }

  /**
   * 現在表示しているシーンを取り除く
   */
  _removeCurrentScene(): void {
    this._scene && this._scene.destructor();
    this._scene && this._scene.getRootHTMLElement().remove();
    this._scene = null;

    this._sceneSubscriptions.forEach(v => {
      v.unsubscribe();
    });
    this._sceneSubscriptions = [];
  }
}