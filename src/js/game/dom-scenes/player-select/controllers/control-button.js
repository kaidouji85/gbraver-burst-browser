// @flow

import {Observable, Subject, Subscription} from "rxjs";
import {pushDOMStream} from "../../../../action/push/push-dom";
import {waitFinishAnimation} from "../../../../wait/wait-finish-animation";

/**
 * ボタン
 */
export class ControlButton {
  _root: HTMLButtonElement;
  _pushed: Subject<void>;
  _subscription: Subscription;

  /**
   * コンストラクタ
   *
   * @param label ボタンのラベル
   * @param className クラス名
   */
  constructor(label: string, className: string) {
    this._root = document.createElement('button');
    this._root.className = className;
    this._root.innerText = label;

    this._pushed = new Subject();
    this._subscription = pushDOMStream(this._root).subscribe(() => {
      this._pushed.next();
    });
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this._subscription.unsubscribe();
  }

  /**
   * ルートHTML要素を取得する
   *
   * @return ルートHTML要素
   */
  getRootHTMLElement(): HTMLElement {
    return this._root;
  }

  /**
   * ボタンのポップアニメーション
   *
   * @return アニメーション
   */
  async pop(): Promise<void> {
    const animation = this._root.animate([
      {transform: 'scale(1)'},
      {transform: 'scale(1.1)'},
      {transform: 'scale(1)'},
    ], {
      duration: 200,
      fill: "forwards",
      easing: 'ease'
    });
    await waitFinishAnimation(animation);
  }

  /**
   * ボタン押下通知
   *
   * @return 通知ストリーム
   */
  pushedNotifier(): Observable<void> {
    return this._pushed;
  }
}