// @flow

import {Howl} from 'howler';
import type {DOMDialog} from "../dialog";
import {domUuid} from "../../../uuid/dom-uuid";
import type {Stream, StreamSource, Unsubscriber} from "../../../stream/core";
import {RxjsStreamSource} from '../../../stream/rxjs';
import {pushDOMStream} from '../../../dom/push/push-dom';
import {Exclusive} from "../../../exclusive/exclusive";
import {pop} from "../../../dom/animation/pop";
import type {Resources} from "../../../resource";
import {SOUND_IDS} from "../../../resource/sound";

/** ルート要素のcssクラス名 */
const ROOT_CLASS_NAME = 'network-error';

/** data-idを集めたもの */
type DataIDs = {
  nextActionButton: string
};

/**
 * ルート要素のinnerHTML
 *
 * @param ids data-idを集めたもの
 * @param nextAction ボタンに表示される文言
 * @return innerHTML
 */
function rootInnerHTML(ids: DataIDs, nextAction: string): string {
  return `
    <div class="${ROOT_CLASS_NAME}__background"></div>
    <div class="${ROOT_CLASS_NAME}__dialog">
      <span class="${ROOT_CLASS_NAME}__dialog__caption">通信エラーが発生しました</span>
      <button class="${ROOT_CLASS_NAME}__dialog__next-action" data-id="${ids.nextActionButton}">${nextAction}</button>
    </div>
  `;
}

/** ルート要素の子孫要素 */
type Elements = {
  nextActionButton: HTMLButtonElement
};

/**
 * ルート要素から子孫要素を抽出する
 *
 * @param root ルート要素
 * @param ids data-idを集めたもの
 * @return 抽出結果
 */
 function extractElements(root: HTMLElement, ids: DataIDs): Elements {
  const nextActionButtonElement = root.querySelector(`[data-id="${ids.nextActionButton}"]`);
  const nextActionButton = (nextActionButtonElement instanceof HTMLButtonElement) ? nextActionButtonElement : document.createElement('button');
  return {nextActionButton};
 }

/** 通信エラー ダイアログ */
export class NetworkErrorDialog implements DOMDialog {
  _root: HTMLElement;
  _nextActionButton: HTMLButtonElement;
  _nextAction: StreamSource<void>;
  _pushButton: typeof Howl;
  _unsubscribers: Unsubscriber[];
  _exclusive: Exclusive;

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   * @param nextAction ボタンに表示される文言
   */
  constructor(resources: Resources, nextAction: string) {
    const dataIDs = {nextActionButton: domUuid()};
    this._root = document.createElement('div');
    this._root.className = ROOT_CLASS_NAME;
    this._root.innerHTML = rootInnerHTML(dataIDs, nextAction);
    const elements = extractElements(this._root, dataIDs);
    this._nextActionButton = elements.nextActionButton;

    this._nextAction = new RxjsStreamSource();
    this._unsubscribers = [
      pushDOMStream(this._nextActionButton).subscribe(() => {
        this._onNextActionPush();
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
   * 次の行動を実施するタイミングを通知する
   * 
   * @return 通知ストリーム
   */
  nextActionNotifier(): Stream<void> {
    return this._nextAction;
  }

  /**
   * 次の行動が書かれたボタンを押した時の処理
   */
  _onNextActionPush(): void {
    this._exclusive.execute(async ()=> {
      await Promise.all([
        this._pushButton.play(),
        pop(this._nextActionButton)
      ]);
      this._nextAction.next();
    });    
  }
}