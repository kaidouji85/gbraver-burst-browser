// @flow
import {Howl} from 'howler';
import {pop} from "../../../dom/animation";
import type {PushDOM} from "../../../dom/event-stream";
import {pushDOMStream} from "../../../dom/event-stream";
import {Exclusive} from "../../../exclusive/exclusive";
import type {Resources} from "../../../resource";
import {PathIds} from "../../../resource/path";
import {SOUND_IDS} from "../../../resource/sound";
import type {Stream, StreamSource, Unsubscriber} from "../../../stream/stream";
import {createStreamSource} from "../../../stream/stream";
import {domUuid} from "../../../uuid/dom-uuid";
import type {DOMDialog} from "../dialog";

/** ルート要素のcssクラス名 */
const ROOT_CLASS = 'matching';

/** data-idを集めたもの */
type DataIDs = {
  closer: string,
  cancel: string
};

/**
 * ルート要素のinnerHTML
 *
 * @param ids data-idを集めたもの
 * @param resources リソース管理オブジェクト
 * @return innerHTML
 */
function rootInnerHTML(ids: DataIDs, resources: Resources): string {
  const closerPath = resources.paths.find(v => v.id === PathIds.CLOSER)?.path ?? '';
  return `
    <div class="${ROOT_CLASS}__background"></div>
    <div class="${ROOT_CLASS}__dialog">
      <img class="${ROOT_CLASS}__dialog__closer" alt="閉じる" src="${closerPath}" data-id="${ids.closer}">
      <span class="${ROOT_CLASS}__dialog__caption">マッチング中......</span>    
      <button class="${ROOT_CLASS}__dialog__cancel" data-id="${ids.cancel}">やめる</button>
    </div>
  `;
}

/** ルート要素の子孫要素 */
type Elements = {
  closer: HTMLImageElement,
  cancel: HTMLElement,
};

/**
 * ルート要素から子孫要素を抽出する
 *
 * @param root ルート要素
 * @param ids data-idを集めたもの
 * @return 抽出結果
 */
function extractElements(root: HTMLElement, ids: DataIDs): Elements {
  const closerElement = root.querySelector(`[data-id="${ids.closer}"]`);
  const closer = (closerElement instanceof HTMLImageElement) ? closerElement : document.createElement('img');
  const cancel = root.querySelector(`[data-id="${ids.cancel}"]`) ?? document.createElement('button');
  return {closer, cancel};
}

/** マッチング ダイアログ */
export class MatchingDialog implements DOMDialog {
  _root: HTMLElement;
  _closer: HTMLImageElement;
  _cancel: HTMLElement;
  _changeValue: typeof Howl;
  _pushButton: typeof Howl;
  _exclusive: Exclusive;
  _matchingCanceled: StreamSource<void>;
  _unsubscribers: Unsubscriber[];

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    const ids = {closer: domUuid(), cancel: domUuid()};
    this._root = document.createElement('div');
    this._root.className = ROOT_CLASS;
    this._root.innerHTML = rootInnerHTML(ids, resources);
    const elements = extractElements(this._root, ids);
    this._closer = elements.closer;
    this._cancel = elements.cancel;
    this._changeValue = resources.sounds.find(v => v.id === SOUND_IDS.CHANGE_VALUE)?.sound ?? new Howl();
    this._pushButton = resources.sounds.find(v => v.id === SOUND_IDS.PUSH_BUTTON)?.sound ?? new Howl();
    this._exclusive = new Exclusive();
    this._matchingCanceled = createStreamSource();
    this._unsubscribers = [
      pushDOMStream(this._closer).subscribe(action => {
        this._onCloserPush(action);
      }),
      pushDOMStream(this._cancel).subscribe(action => {
        this._onCancelPush(action);
      })
    ];
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this._unsubscribers.forEach(v => {
      v.unsubscribe();
    });
  }

  /**
   * ルートのHTML要素を取得する
   *
   * @return 取得結果
   */
  getRootHTMLElement(): HTMLElement {
    return this._root;
  }

  /**
   * マッチングキャンセル通知
   *
   * @return 通知ストリーム
   */
  matchingCanceledNotifier(): Stream<void> {
    return this._matchingCanceled;
  }

  /**
   * クローザが押された際の処理
   *
   * @param action アクション
   */
  _onCloserPush(action: PushDOM): void {
    action.event.preventDefault();
    action.event.stopPropagation();
    this._exclusive.execute(async () => {
      this._changeValue.play();
      await pop(this._closer, 1.3);
      this._matchingCanceled.next();
    });
  }

  /**
   * やめるが押された際の処理
   *
   * @param action アクション
   */
  _onCancelPush(action: PushDOM): void {
    action.event.preventDefault();
    action.event.stopPropagation();
    this._exclusive.execute(async () => {
      this._pushButton.play();
      await pop(this._cancel);
      this._matchingCanceled.next();
    });
  }
}