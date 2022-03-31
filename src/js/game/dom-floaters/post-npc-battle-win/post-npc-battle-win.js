// @flow
import {waitFinishAnimation} from "../../../wait/wait-finish-animation";
import {domUuid} from "../../../uuid/dom-uuid";
import type {Stream, StreamSource, Unsubscriber} from "../../../stream/core";
import {pushDOMStream} from "../../../dom/push/push-dom";
import type {PushDOM} from "../../../dom/push/push-dom";
import {RxjsStreamSource} from "../../../stream/rxjs";
import type {PostBattle} from "./post-battle";

/** ルートHTML要素のclass属性 */
const ROOT_CLASS = 'post-npc-battle-win';

/** data-idを集めたもの */
type DataIDs = {
  gotoTitle: string,
  nextStage: string
};

/**
 * ルートHTML要素のinnerHTML
 *
 * @param ids data-idを集めたもの
 * @return ルートHTML要素のinnerHTML
 */
export function rootInnerHTML(ids: DataIDs): string {
  return `
    <button class="${ROOT_CLASS}__goto-title" data-id="${ids.gotoTitle}">タイトルへ</button>
    <button class="${ROOT_CLASS}__next-stage" data-id="${ids.nextStage}">次のステージ</button>
  `;
}

/** ルート要素の子孫要素 */
type Elements = {
  gotoTitle: HTMLElement,
  nextStage: HTMLElement,
};

/**
 * ルート要素から子孫要素を抽出する
 *
 * @param root ルート要素
 * @param ids data-idを集めたもの
 * @return 抽出結果
 */
function extractElements(root: HTMLElement, ids: DataIDs): Elements {
  const gotoTitle = root.querySelector(`[data-id="${ids.gotoTitle}"]`) ?? document.createElement('div');
  const nextStage = root.querySelector(`[data-id="${ids.nextStage}"]`) ?? document.createElement('div');
  return {gotoTitle, nextStage};
}

/** NPCバトル勝利後フローター */
export class PostNPCBattleWinFloater {
  _root: HTMLElement;
  _gotoTitle: HTMLElement;
  _nextStage: HTMLElement;
  _selectionComplete: StreamSource<PostBattle>;
  _unsubscribers: Unsubscriber[];

  /**
   * コンストラクタ
   * 本クラスの初期表示は(display: none)である
   */
  constructor() {
    const ids = {gotoTitle: domUuid(), nextStage: domUuid()};
    this._root = document.createElement('div');
    this._root.className = ROOT_CLASS;
    this._root.style.display = 'none';
    this._root.innerHTML = rootInnerHTML(ids);

    const elements = extractElements(this._root, ids);
    this._gotoTitle = elements.gotoTitle;
    this._nextStage = elements.nextStage;

    this._selectionComplete = new RxjsStreamSource();
    this._unsubscribers = [
      pushDOMStream(this._gotoTitle).subscribe(action => {
        this._onGotoTitlePush(action);
      }),
      pushDOMStream(this._nextStage).subscribe(action => {
        this._onNextStagePush(action);
      })
    ];
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this._unsubscribers.forEach(v => {
      v.unsubscribe();
    })
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
   * @return アニメーションが完了したら発火するPromise
   */
  async show(): Promise<void> {
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
   * 「タイトルへ」を押した時の処理
   *
   * @param action アクション
   */
  _onGotoTitlePush(action: PushDOM): void {
    action.event.preventDefault();
    action.event.stopPropagation();
    this._selectionComplete.next('GotoTitle');
  }

  /**
   * 「次のステージ」を押した時の処理
   *
   * @param action アクション
   */
  _onNextStagePush(action: PushDOM): void {
    action.event.preventDefault();
    action.event.stopPropagation();
    this._selectionComplete.next('NextStage');
  }
}