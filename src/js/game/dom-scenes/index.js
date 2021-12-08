// @flow

import type {LoadingActions} from "../../resource/loading-actions";
import type {DOMScene} from "./dom-scene";
import {Loading} from "./loading";
import {Title} from "./title/title";
import {PlayerSelect} from "./player-select";
import {MatchCard} from "./match-card";
import type {ArmDozerId} from "gbraver-burst-core";
import {waitTime} from "../../wait/wait-time";
import {NPCEnding} from "./npc-ending";
import type {Resources} from "../../resource";
import type {GameAction} from "../actions/game-actions";
import {RxjsStreamSource} from "../../stream/rxjs";
import type {Stream, StreamSource, Unsubscriber} from "../../stream/core";
import type {TitleAccount} from "./title/title-account";
import {MailVerifiedIncomplete} from "./mail-verified-incomplete/mail-verified-incomplete";
import {NPCStageTitle} from "./npc-stage-title/npc-stage-title";
import type {StageLevel} from "../npc-battle/npc-battle-stage";

/**
 * 最大読み込み待機時間(ミリ秒)
 */
const MAX_LOADING_TIME = 10000;

/**
 * HTMLオンリーで生成されたシーンを集めたもの
 * 本クラス配下のいずれか1シーンのみが表示される想定
 */
export class DOMScenes {
  _root: HTMLElement;
  _scene: ?DOMScene;
  _gameAction: StreamSource<GameAction>;
  _unsubscribers: Unsubscriber[];

  constructor() {
    this._root = document.createElement('div');
    this._gameAction = new RxjsStreamSource();
    this._scene = null;
    this._unsubscribers = [];
  }

  /** デストラクタ相当の処理 */
  destructor() {
    this._removeCurrentScene();
  }

  /**
   * ゲームアクション通知
   *
   * @return 通知ストリーム
   */
  gameActionNotifier(): Stream<GameAction> {
    return this._gameAction;
  }

  /**
   * メール認証未完了画面を開始する
   *
   * @param mailAddress 認証メール送信先
   * @return 開始されたメール認証未完了画面
   */
  startMailVerifiedIncomplete(mailAddress: string): MailVerifiedIncomplete {
    this._removeCurrentScene();

    const scene = new MailVerifiedIncomplete(mailAddress);
    this._root.appendChild(scene.getRootHTMLElement());
    this._scene = scene;
    return scene;
  }

  /**
   * 新しくローディング画面を開始する
   *
   * @param loading 読み込み状況ストリーム
   * @return 開始されたローディング画面
   */
  startLoading(loading: Stream<LoadingActions>): Loading {
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
   * @param account アカウント情報
   * @param isApiServerEnable APIサーバが利用可能か否か、trueで利用可能である
   * @param termsOfServiceURL 利用規約ページのURL
   * @param privacyPolicyURL プライバシーポリシーページのURL
   * @param contactURL 問い合わせページのURL
   * @return 開始されたタイトル画面
   */
  async startTitle(resources: Resources, account: TitleAccount, isApiServerEnable: boolean, termsOfServiceURL: string, privacyPolicyURL: string, contactURL: string): Promise<Title> {
    this._removeCurrentScene();

    const scene = new Title(resources, account, isApiServerEnable, termsOfServiceURL, privacyPolicyURL, contactURL);
    this._unsubscribers = [
      scene.pushLoginNotifier().subscribe(() => {
        this._gameAction.next({type: 'UniversalLogin'});
      }),
      scene.pushLogoutNotifier().subscribe(() => {
        this._gameAction.next({type: 'Logout'});
      }),
      scene.pushDeleteAccountNotifier().subscribe(() => {
        this._gameAction.next({type: 'AccountDeleteConsent'});
      }),
      scene.pushGameStartNotifier().subscribe(() => {
        this._gameAction.next({type: 'GameStart'});
      }),
      scene.pushHowToPlayNotifier().subscribe(() => {
        this._gameAction.next({type: 'ShowHowToPlay'});
      }),
      scene.pushCasualMatchNotifier().subscribe(() => {
        this._gameAction.next({type: 'CasualMatchStart'});
      })
    ];
    this._root.appendChild(scene.getRootHTMLElement());
    await Promise.race([
      scene.waitUntilLoaded(),
      waitTime(MAX_LOADING_TIME)
    ]);

    this._scene = scene;
    return scene;
  }

  /**
   * 新しくプレイヤー選択画面を開始する
   *
   * @param resources リソース管理オブジェクト
   * @return 開始されたプレイヤー選択画面
   */
  async startPlayerSelect(resources: Resources): Promise<PlayerSelect> {
    this._removeCurrentScene();

    const scene = new PlayerSelect(resources);
    this._unsubscribers = [
      scene.decideNotifier().subscribe(v => {
        this._gameAction.next({
          type: 'SelectionComplete',
          armdozerId: v.armdozerId,
          pilotId: v.pilotId,
        });
      }),
      scene.prevNotifier().subscribe(() => {
        this._gameAction.next({type: 'SelectionCancel'});
      }),
    ];
    this._root.appendChild(scene.getRootHTMLElement());
    await Promise.race([
      scene.waitUntilLoaded(),
      waitTime(MAX_LOADING_TIME),
    ]);

    this._scene = scene;
    return scene;
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
    this._removeCurrentScene();

    const scene = new MatchCard({
      resources: resources,
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
  }

  /**
   * NPCステージタイトル画面を開始する
   *
   * @param resources リソース管理オブジェクト
   * @param level ステージレベル
   * @param caption ステージ名
   * @param armDozerId アームドーザアイコンのID
   * @returns 開始されたNPCステージタイトル画面
   */
  async startNPCStageTitle(resources: Resources, level: StageLevel, caption: string[], armDozerId: ArmDozerId): Promise<NPCStageTitle> {
    this._removeCurrentScene();

    const scene = new NPCStageTitle(resources, level, caption, armDozerId);
    this._root.appendChild(scene.getRootHTMLElement());
    await Promise.race([
      scene.waitUntilLoaded(),
      waitTime(MAX_LOADING_TIME),
    ]);

    this._scene = scene;
    return scene;
  }

  /**
   * 新しくNPCエンディング画面を開始する
   *
   * @param resources リソース管理オブジェクト
   * @return 開始されたNPCエンディング画面
   */
  async startNPCEnding(resources: Resources): Promise<NPCEnding> {
    this._removeCurrentScene();

    const scene = new NPCEnding(resources);
    this._root.appendChild(scene.getRootHTMLElement());
    this._unsubscribers = [
      scene.endNPCEndingNotifier().subscribe(() => {
        this._gameAction.next({type: 'EndNPCEnding'});
      })
    ];
    await Promise.race([
      scene.waitUntilLoaded(),
      waitTime(MAX_LOADING_TIME),
    ]);

    this._scene = scene;
    return scene;
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

    this._unsubscribers.forEach(v => {
      v.unsubscribe();
    });
    this._unsubscribers = [];
  }
}