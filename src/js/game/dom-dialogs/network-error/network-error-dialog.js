// @flow

import type {DOMDialog} from "../dialog";
import {domUuid} from "../../../uuid/dom-uuid";

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
 * @param caption ダイアログに表示する文言
 * @param nextAction ボタンに表示される文言
 * @return innerHTML
 */
function rootInnerHTML(ids: DataIDs, caption: string, nextAction: string): string {
  return `
    <div class="${ROOT_CLASS_NAME}__background"></div>
    <div class="${ROOT_CLASS_NAME}__dialog">
      <span class="${ROOT_CLASS_NAME}__dialog__caption">${caption}</span>
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

  /**
   * コンストラクタ
   *
   * @param caption ダイアログに表示する文言
   * @param nextAction ボタンに表示される文言
   */
  constructor(caption: string, nextAction: string) {
    const dataIDs = {nextActionButton: domUuid()};
    this._root = document.createElement('div');
    this._root.className = ROOT_CLASS_NAME;
    this._root.innerHTML = rootInnerHTML(dataIDs, caption, nextAction);
    const elements = extractElements(this._root, dataIDs);
    this._nextActionButton = elements.nextActionButton;
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    // NOP
  }

  /**
   * ルートのHTML要素を取得する
   *
   * @return 取得結果
   */
  getRootHTMLElement(): HTMLElement {
    return this._root;
  }
}