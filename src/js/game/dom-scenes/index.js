// @flow

import {Observable, Subject, Subscription} from "rxjs";
import type {PushGameStart, PushHowToPlay} from "../../action/game/title";
import type {ResourcePath} from "../../resource/path/resource-path";
import type {SelectionComplete} from "../../action/game/selection-complete";
import type {LoadingAction} from "../../action/loading/loading";
import type {DOMScene} from "./dom-scene";
import {Loading} from "./loading";
import {Title} from "./title";
import {PlayerSelect} from "./player-select";
import {MatchCard} from "./match-card";
import type {ArmDozerId} from "gbraver-burst-core/lib/player/armdozer/armdozer";
import type {EndMatchCard} from "../../action/game/end-match-card";

/** コンストラクタのパラメータ */
type Param = {
  resourcePath: ResourcePath,
  loading: Observable<LoadingAction>
};

/** イベント通知 */
type Notifier = {
  pushGameStart: Observable<PushGameStart>,
  pushHowToPlay: Observable<PushHowToPlay>,
  selectionComplete: Observable<SelectionComplete>,
  endMatchCard: Observable<EndMatchCard>,
};

/**
 * HTMLオンリーで生成されたシーンを集めたもの
 * 本クラス配下のいずれか1シーンのみが表示される想定
 */
export class DOMScenes {
  _resourcePath: ResourcePath;
  _root: HTMLElement;
  _scene: ?DOMScene;
  _loading: Observable<LoadingAction>;
  _pushGameStart: Subject<PushGameStart>;
  _pushHowToPlay: Subject<PushHowToPlay>;
  _selectionComplete: Subject<SelectionComplete>;
  _endMatchCard: Subject<EndMatchCard>;
  _sceneSubscriptions: Subscription[];

  constructor(param: Param) {
    this._resourcePath = param.resourcePath;
    this._loading = param.loading;
    this._root = document.createElement('div');
    this._pushGameStart = new Subject();
    this._pushHowToPlay = new Subject();
    this._selectionComplete = new Subject();
    this._endMatchCard = new Subject();
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
      endMatchCard: this._endMatchCard,
    }
  }

  /**
   * ローディング画面を表示する
   */
  showLoading(): void {
    this._removeCurrentScene();
    const scene = new Loading(this._loading);
    this._scene = scene
    this._root.appendChild(scene.getRootHTMLElement());
  }

  /** タイトルを表示する */
  showTitle(): void {
    this._removeCurrentScene();

    const scene = new Title(this._resourcePath);
    const notifier = scene.notifier();
    this._sceneSubscriptions = [
      notifier.pushGameStart.subscribe(this._pushGameStart),
      notifier.pushHowToPlay.subscribe(this._pushHowToPlay)
    ];
    this._scene = scene;
    this._root.appendChild(scene.getRootHTMLElement());
  }

  /**
   * プレイヤーセレクトを表示する
   */
  showPlayerSelect(): void {
    this._removeCurrentScene();

    const scene = new PlayerSelect(this._resourcePath);
    const notifier = scene.notifier();
    this._sceneSubscriptions = [
      notifier.selectionComplete.subscribe(this._selectionComplete)
    ];
    this._scene = scene;
    this._root.appendChild(scene.getRootHTMLElement());
  }

  /**
   * 対戦カードシーンを表示する
   *
   * @param player プレイヤー側 アームドーザID
   * @param enemy 敵側 アームドーザID
   * @param caption ステージ名
   */
  showMatchCard(player: ArmDozerId, enemy: ArmDozerId, caption: string): void {
    this._removeCurrentScene();

    const scene = new MatchCard({
      resourcePath: this._resourcePath,
      player: player,
      enemy: enemy,
      caption: caption
    });
    const notifier = scene.notifier();
    notifier.endMatchCard.subscribe(this._endMatchCard);
    this._scene = scene;
    this._root.appendChild(scene.getRootHTMLElement());
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