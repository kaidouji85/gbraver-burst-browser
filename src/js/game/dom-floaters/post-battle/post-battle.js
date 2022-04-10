// @flow
import {waitFinishAnimation} from "../../../wait/wait-finish-animation";
import type {Stream, StreamSource, Unsubscriber} from "../../../stream/core";
import {RxjsStreamSource} from "../../../stream/rxjs";
import type {PostBattle} from "../../post-battle";
import type {PostBattleButtonConfig} from "./post-battle-button-config";
import {pushDOMStream} from "../../../dom/push/push-dom";

/** ルートHTML要素のclass属性 */
const ROOT_CLASS = 'post-battle';

/** アクションボタン */
type ActionButton = {
  /** ボタンのHTML要素 */
  button: HTMLButtonElement,
  /** ボタンイベントのUnsubscriber */
  unsubscriber: Unsubscriber,
};

/** バトル終了後行動選択フローター */
export class PostBattleFloater {
  _root: HTMLElement;
  _selectionComplete: StreamSource<PostBattle>;
  _unsubscribers: Unsubscriber[];

  /**
   * コンストラクタ
   * 本クラスの初期表示は(display: none)である
   */
  constructor() {
    this._root = document.createElement('div');
    this._root.className = ROOT_CLASS;
    this._root.style.display = 'none';
    this._selectionComplete = new RxjsStreamSource();
    this._unsubscribers = [];
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this._unsubscribers.forEach(v => {
      v.unsubscribe();
    });
    this._root.innerHTML = '';
  }

  /**
   * ルートHTML要素を取得する
   *
   * @return 取得結果
   */
  getRootHTMLElement(): HTMLElement {
    return this._root;
  }

  /**
   * アニメーション付きでフローターを表示する
   *
   * @param buttons アクションボタン設定
   * @return アニメーションが完了したら発火するPromise
   */
  async show(buttons: PostBattleButtonConfig[]): Promise<void> {
    this.destructor();

    const actionButtons = this._createActionButtons(buttons);
    actionButtons.forEach(v => {
      this._root.appendChild(v.button);
    });
    this._unsubscribers = actionButtons.map(v => v.unsubscriber);
    await this._bottomUp();
  }

  /**
   * フローターを非表示にする
   */
  hidden(): void {
    this._root.style.display = 'none';
  }

  /**
   * 選択完了通知
   * ストリームには選択した戦闘終了後の挙動が渡される
   *
   * @return 通知ストリーム
   */
  selectionCompleteNotifier(): Stream<PostBattle> {
    return this._selectionComplete;
  }

  /**
   * 本フローターをボトムアップ表示する
   *
   * @return アニメーションが完了したら発火するプロミス
   */
  async _bottomUp(): Promise<void> {
    this._root.style.display = 'flex';
    const animation = this._root.animate([
      {transform: 'translate(-50%, 100%)'},
      {transform: 'translate(-50%, 0)'}
    ], {
      duration: 400,
      fill: "forwards",
      easing: 'ease'
    });
    await waitFinishAnimation(animation);
  }

  /**
   * 戦闘後アクションボタンを生成する
   *
   * @param buttons ボタン設定
   * @return 生成結果
   */
  _createActionButtons(buttons: PostBattleButtonConfig[]): ActionButton[] {
    const getClassName = style => {
      switch(style) {
        case 'MainButton':
          return `${ROOT_CLASS}__main-action`;
        case 'SubButton':
          return `${ROOT_CLASS}__sub-action`;
        default:
          return `${ROOT_CLASS}__sub-action`;
      }
    };
    return buttons.map(({style, action, label}) => {
      const button = document.createElement('button');
      button.innerText = label;
      button.className = getClassName(style);
      const unsubscriber = pushDOMStream(button).subscribe(({event}) => {
        event.preventDefault();
        event.stopPropagation();
        this._selectionComplete.next(action);
      });
      return {button, unsubscriber};
    });
  }
}