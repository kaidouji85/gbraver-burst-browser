// @flow
import {Howl} from 'howler';
import {waitFinishAnimation} from "../../../wait/wait-finish-animation";
import type {Stream, StreamSource, Unsubscriber} from "../../../stream/stream";
import type {PostBattle} from "../../post-battle";
import type {PostBattleButtonConfig} from "./post-battle-button-config";
import {pushDOMStream} from "../../../dom/push/push-dom";
import {pop} from "../../../dom/animation/pop";
import type {Resources} from "../../../resource";
import {SOUND_IDS} from "../../../resource/sound";
import {Exclusive} from "../../../exclusive/exclusive";
import {createStreamSource} from "../../../stream/stream";

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
  _exclusive: Exclusive;
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
    this._exclusive = new Exclusive();
    this._selectionComplete = createStreamSource();
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
   * @param resources リソース管理オブジェクト
   * @param buttons アクションボタン設定
   * @return アニメーションが完了したら発火するPromise
   */
  async show(resources: Resources, buttons: PostBattleButtonConfig[]): Promise<void> {
    await this._exclusive.execute(async () => {
      const actionButtons = this._createActionButtons(resources, buttons);
      actionButtons.forEach(v => {
        this._root.appendChild(v.button);
      });
      this._unsubscribers = actionButtons.map(v => v.unsubscriber);
      await this._bottomUp();
    });
  }

  /**
   * フローターを非表示にする
   */
  hidden(): void {
    this._root.style.display = 'none';
    this.destructor();
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
   * @param resources リソース管理オブジェクト
   * @param buttons ボタン設定
   * @return 生成結果
   */
  _createActionButtons(resources: Resources, buttons: PostBattleButtonConfig[]): ActionButton[] {
    const pushButton = resources.sounds.find(v => v.id === SOUND_IDS.PUSH_BUTTON)?.sound ?? new Howl();
    const changeValue = resources.sounds.find(v => v.id === SOUND_IDS.CHANGE_VALUE)?.sound ?? new Howl();
    const createButtonStyle = style => {
      switch(style) {
        case 'MainButton':
          return {className: `${ROOT_CLASS}__main-action`, sound: pushButton};
        case 'SubButton':
        default:
          return {className: `${ROOT_CLASS}__sub-action`, sound: changeValue};
      }
    };
    return buttons.map(({style, action, label}) => {
      const button = document.createElement('button');
      button.innerText = label;
      const {className, sound} = createButtonStyle(style);
      button.className = className;
      const unsubscriber = pushDOMStream(button).subscribe(({event}) => {
        this._exclusive.execute(async () => {
          event.preventDefault();
          event.stopPropagation();
          sound.play();
          await pop(button);
          this._selectionComplete.next(action);
        });
      });
      return {button, unsubscriber};
    });
  }
}