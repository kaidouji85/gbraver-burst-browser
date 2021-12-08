// @flow

import type {PostNetworkError} from '../../network/post-network-error';
import {Howl} from 'howler';
import type {DOMDialog} from "../dialog";
import {domUuid} from "../../../uuid/dom-uuid";
import type {Stream, StreamSource, Unsubscriber} from "../../../stream/core";
import {RxjsStreamSource} from '../../../stream/rxjs';
import {pushDOMStream} from '../../../dom/push/push-dom';
import type {PushDOM} from '../../../dom/push/push-dom';
import {Exclusive} from "../../../exclusive/exclusive";
import {pop} from "../../../dom/animation/pop";
import type {Resources} from "../../../resource";
import {SOUND_IDS} from "../../../resource/sound";

/** ルート要素のcssクラス名 */
const ROOT_CLASS_NAME = 'network-error';

/** data-idを集めたもの */
type DataIDs = {
  postNetworkErrorButton: string
};

/**
 * 通信エラー後処理情報に対応した、ボタンの文言を取得する
 * 
 * @param postNetworkError 通信エラー後処理情報
 * @return ボタン文言
 */
function postNetowrkErrorLabel(postNetworkError: PostNetworkError) {
  switch(postNetworkError.type) {
    case 'Close':
      return '閉じる';
    case 'GotoTitle':
      return 'タイトルへ';
    default:
      return '';  
  }
}

/**
 * ルート要素のinnerHTML
 *
 * @param ids data-idを集めたもの
 * @param postNetworkErrorLabel 通信エラー後処理ボタンの文言
 * @return innerHTML
 */
function rootInnerHTML(ids: DataIDs, postNetworkErrorLabel: string): string {
  return `
    <div class="${ROOT_CLASS_NAME}__background"></div>
    <div class="${ROOT_CLASS_NAME}__dialog">
      <span class="${ROOT_CLASS_NAME}__dialog__caption">通信エラーが発生しました</span>
      <button class="${ROOT_CLASS_NAME}__dialog__post-network-error" data-id="${ids.postNetworkErrorButton}">${postNetworkErrorLabel}</button>
    </div>
  `;
}

/** ルート要素の子孫要素 */
type Elements = {
  postNetworkErrorButton: HTMLButtonElement
};

/**
 * ルート要素から子孫要素を抽出する
 *
 * @param root ルート要素
 * @param ids data-idを集めたもの
 * @return 抽出結果
 */
 function extractElements(root: HTMLElement, ids: DataIDs): Elements {
  const postNetworkErrorButtonElement = root.querySelector(`[data-id="${ids.postNetworkErrorButton}"]`);
  const postNetworkErrorButton = (postNetworkErrorButtonElement instanceof HTMLButtonElement) ? postNetworkErrorButtonElement : document.createElement('button');
  return {postNetworkErrorButton};
 }

/** 通信エラー ダイアログ */
export class NetworkErrorDialog implements DOMDialog {
  _root: HTMLElement;
  _postNetworkErrorButton: HTMLButtonElement;
  _postNetworkError: PostNetworkError;
  _postNetworkErrorSource: StreamSource<PostNetworkError>;
  _pushButton: typeof Howl;
  _unsubscribers: Unsubscriber[];
  _exclusive: Exclusive;

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   * @param postNetworkError 通信エラーの後処理情報
   */
  constructor(resources: Resources, postNetworkError: PostNetworkError) {
    this._postNetworkError = postNetworkError;
    
    const dataIDs = {postNetworkErrorButton: domUuid()};
    this._root = document.createElement('div');
    this._root.className = ROOT_CLASS_NAME;
    const label = postNetowrkErrorLabel(this._postNetworkError);
    this._root.innerHTML = rootInnerHTML(dataIDs, label);
    const elements = extractElements(this._root, dataIDs);
    this._postNetworkErrorButton = elements.postNetworkErrorButton;

    this._postNetworkErrorSource = new RxjsStreamSource();
    this._unsubscribers = [
      pushDOMStream(this._postNetworkErrorButton).subscribe(action => {
        this._onPostNetworkErrorButtonPush(action);
      })
    ];

    this._exclusive = new Exclusive();

    this._pushButton = resources.sounds.find(v => v.id === SOUND_IDS.PUSH_BUTTON)
      ?.sound ?? new Howl();
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
   * 通信エラー後処理の実行タイミングを通知する
   * 
   * @return 通知ストリーム
   */
  postNetworkErrorNotifier(): Stream<PostNetworkError> {
    return this._postNetworkErrorSource;
  }

  /**
   * 通信エラー後処理ボタンを押した時の処理
   * 
   * @param action アクション
   */
  _onPostNetworkErrorButtonPush(action: PushDOM): void {
    this._exclusive.execute(async ()=> {
      action.event.preventDefault();
      await Promise.all([
        this._pushButton.play(),
        pop(this._postNetworkErrorButton)
      ]);
      this._postNetworkErrorSource.next(this._postNetworkError);
    });    
  }
}