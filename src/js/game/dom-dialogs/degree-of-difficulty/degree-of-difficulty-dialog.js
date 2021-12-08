// @flow
import type {Resources} from "../../../resource";
import type {DOMDialog} from '../dialog';
import {PathIds} from "../../../resource/path";

/** ルート要素 class属性 */
const ROOT_CLASS = 'degree-of-difficulty';

/**
 * ルート要素のinnerHTML
 * 
 * @param resources リソース管理オブジェクト
 * @return innerHTML
 */
function rootInnerHTML(resources: Resources): string {
  const closerPath = resources.paths.find(v => v.id === PathIds.CLOSER)?.path ?? '';
  return `
    <div class="${ROOT_CLASS}__background"></div>
    <img class="${ROOT_CLASS}__closer" alt="閉じる" src="${closerPath}"">
    <div class="${ROOT_CLASS}__dialog">
    </div>  
  `;
}

/** 難易度選択ダイアログ */
export class DegreeOfDifficultyDialog implements DOMDialog {
  _root: HTMLElement;

  /**
   * コンストラクタ
   * 
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    this._root = document.createElement('div');
    this._root.className = ROOT_CLASS;
    this._root.innerHTML = rootInnerHTML(resources);
  }

  /** @override */
  destructor(): void {
    // NOP
  }

  /** @override */
  getRootHTMLElement(): HTMLElement {
    return this._root;
  }
}