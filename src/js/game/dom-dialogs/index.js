// @flow

import {HowToPlay} from "./how-to-play/how-to-play-dialog";
import type {GameAction} from "../actions/game-actions";
import type {Resources} from "../../resource";
import type {DOMDialog} from "./dialog";
import {RxjsStreamSource} from "../../stream/rxjs";
import type {Stream, StreamSource, Unsubscriber} from "../../stream/core";
import type {OwnAPI as LoginDialogAPI} from './login/login-dialog';
import {LoginDialog} from './login/login-dialog';
import {WaitingDialog} from "./waiting/waiting-dialog";
import {NetworkErrorDialog} from './network-error/network-error-dialog';

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
   * @param api APIサーバSDK
   * @param caption キャプション
   */
  startLogin(resources: Resources, api: LoginDialogAPI, caption: string): void {
    this._removeCurrentDialog();

    const login = new LoginDialog(resources, api, caption);
    this._unsubscribers = [
      login.loginSuccessNotifier().subscribe(() => {
        this._gameAction.next({type: 'LoginSuccess'});
      }),
      login.closeDialogNotifier().subscribe(() => {
        this._gameAction.next({type: 'LoginCancel'});
      })
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
   * @param nextAction 次に起こるアクション
   */
  startNetworkError(resources: Resources, nextAction: string): void {
    this._removeCurrentDialog();
    
    const networkError = new NetworkErrorDialog(resources, nextAction);
    this._unsubscribers = [
      networkError.postNetworkErrorNotifier().subscribe(() => {
        this._gameAction.next({type: 'EndNetworkError'});
      })
    ];
    this._root.appendChild(networkError.getRootHTMLElement());
    this._dialog = networkError;
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