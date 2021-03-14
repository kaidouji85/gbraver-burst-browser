// @flow

import {HowToPlay} from "./how-to-play";
import {Subject, Subscription} from "rxjs";
import type {EndHowToPlay, GameAction} from "../actions/game-actions";
import type {Resources} from "../../resource";
import type {DOMDialog} from "./dialog";
import {map} from "rxjs/operators";
import {toStream} from "../../stream/rxjs";
import type {Stream} from "../../stream/core";

/** HTML ダイアログをあつめたもの */
export class DOMDialogs {
  _root: HTMLElement;
  _dialog: ?DOMDialog;
  _endHowToPlay: Subject<EndHowToPlay>;
  _dialogSubscriptions: Subscription[];

  /**
   * コンストラクタ
   */
  constructor() {
    this._root = document.createElement('div');
    this._dialog = null;
    this._endHowToPlay = new Subject();
    this._dialogSubscriptions = [];
  }

  /**
   * 遊び方ダイアログを表示する
   *
   * @param resources リソース管理オブジェクト
   */
  startHowToPlay(resources: Resources): void {
    this._removeCurrentDialog();

    const howToPlay = new HowToPlay(resources);
    const notifier = howToPlay.notifier();
    this._dialogSubscriptions = [
      notifier.endHowToPlay.subscribe(() => {
        this._endHowToPlay.next({type: 'EndHowToPlay'});
      })
    ];
    this._root.appendChild(howToPlay.getRootHTMLElement());
    this._dialog = howToPlay;
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
    const observable = this._endHowToPlay.pipe(
      map(v => (v: GameAction))
    );
    return toStream(observable);
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

    this._dialogSubscriptions.forEach(v => {
      v.unsubscribe();
    });
    this._dialogSubscriptions = [];
  }
}