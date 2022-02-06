// @flow

import {HowToPlay} from "./how-to-play/how-to-play-dialog";
import type {GameAction} from "../actions/game-actions";
import type {Resources} from "../../resource";
import type {DOMDialog} from "./dialog";
import {RxjsStreamSource} from "../../stream/rxjs";
import type {Stream, StreamSource, Unsubscriber} from "../../stream/core";
import {LoginDialog} from './login/login-dialog';
import {WaitingDialog} from "./waiting/waiting-dialog";
import {NetworkErrorDialog} from './network-error/network-error-dialog';
import type {PostNetworkError} from '../network/post-network-error';
import {DeleteAccountConsentDialog} from "./delete-account-consent/delete-account-consent-dialog";
import {DifficultyDialog} from "./difficulty/difficulty-dialog";

/** HTML ダイアログをあつめたもの */
export class DOMDialogs {
  _root: HTMLElement;
  _dialog: ?DOMDialog;
  _gameAction: StreamSource<GameAction>;
  _unsubscribers: Unsubscriber[];

  /**
   * コンストラクタ
   */
  constructor() {
    this._root = document.createElement('div');
    this._dialog = null;
    this._gameAction = new RxjsStreamSource();
    this._unsubscribers = [];
  }

  /**
   * 遊び方ダイアログを表示する
   *
   * @param resources リソース管理オブジェクト
   * @param movieURL 動画のURL
   */
  startHowToPlay(resources: Resources, movieURL: string): void {
    this._removeCurrentDialog();

    const howToPlay = new HowToPlay(resources, movieURL);
    this._unsubscribers = [
      howToPlay.closeNotifier().subscribe(() => {
        this._gameAction.next({type: 'EndHowToPlay'});
      })
    ];
    this._root.appendChild(howToPlay.getRootHTMLElement());
    this._dialog = howToPlay;
  }

  /**
   * ログインダイアログを表示する
   *
   * @param resources リソース管理オブジェクト
   * @param caption キャプション
   */
  startLogin(resources: Resources, caption: string): void {
    this._removeCurrentDialog();

    const login = new LoginDialog(resources, caption);
    this._unsubscribers = [
      login.loginNotifier().subscribe(() => {
        this._gameAction.next({type: 'UniversalLogin'});
      }),
      login.closeDialogNotifier().subscribe(() => {
        this._gameAction.next({type: 'LoginCancel'});
      }),
    ];
    this._root.appendChild(login.getRootHTMLElement());
    this._dialog = login;
  }

  /**
   * 作業待ちダイアログを表示する
   *
   * @param caption ダイアログに表示する文言
   */
  startWaiting(caption: string): void {
    this._removeCurrentDialog();

    const waiting = new WaitingDialog(caption);
    this._root.appendChild(waiting.getRootHTMLElement());
    this._dialog = waiting;
  }

  /**
   * 通信エラーダイアログを表示する
   *
   * @param resources リソース管理オブジェクト
   * @param postNetworkError 通信エラーの後処理情報
   */
  startNetworkError(resources: Resources, postNetworkError: PostNetworkError): void {
    this._removeCurrentDialog();
    
    const networkError = new NetworkErrorDialog(resources, postNetworkError);
    this._unsubscribers = [
      networkError.postNetworkErrorNotifier().subscribe((postNetworkError) => {
        this._gameAction.next({type: 'EndNetworkError', postNetworkError});
      })
    ];
    this._root.appendChild(networkError.getRootHTMLElement());
    this._dialog = networkError;
  }

  /**
   * アカウント削除同意ダイアログを表示する
   * 
   * @param resources リソース管理オブジェクト
   */
  startDeleteAccountConsent(resources: Resources): void {
    this._removeCurrentDialog();

    const deleteAccountConsent = new DeleteAccountConsentDialog(resources);
    this._unsubscribers = [
      deleteAccountConsent.deleteAccountNotifier().subscribe(() => {
        this._gameAction.next({type: 'DeleteAccount'});
      }),
      deleteAccountConsent.closeDialogNotifier().subscribe(() => {
        this._gameAction.next({type: 'CancelAccountDeletion'});
      }),
    ];
    this._root.appendChild(deleteAccountConsent.getRootHTMLElement());
    this._dialog = deleteAccountConsent;
  }

  /**
   * 難易度選択ダイアログを表示する
   *
   * @param resources リソース管理オブジェクト
   */
  startDegreeOfDifficulty(resources: Resources): void {
    this._removeCurrentDialog();

    const degreeOfDifficulty = new DifficultyDialog(resources);
    this._unsubscribers = [
      degreeOfDifficulty.selectionCompleteNotifier().subscribe(difficulty => {
        this._gameAction.next({type: 'DifficultySelectionComplete', difficulty});
      }),
      degreeOfDifficulty.closeDialogNotifier().subscribe(() => {
        this._gameAction.next({type: 'DifficultySelectionCancel'});
      })
    ];
    this._root.appendChild(degreeOfDifficulty.getRootHTMLElement());
    this._dialog = degreeOfDifficulty;
  }

  /**
   * 現在表示しているダイアログを非表示にする
   */
  hidden(): void {
    this._removeCurrentDialog();
  }

  /**
   * ゲームアクション通知
   *
   * @return イベント通知ストリーム
   */
  gameActionNotifier(): Stream<GameAction> {
    return this._gameAction;
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
   * 現在表示しているダイアログを取り除く
   */
  _removeCurrentDialog(): void {
    this._dialog && this._dialog.destructor();
    this._dialog && this._dialog.getRootHTMLElement().remove();
    this._dialog = null;

    this._unsubscribers.forEach(v => {
      v.unsubscribe();
    });
    this._unsubscribers = [];
  }
}