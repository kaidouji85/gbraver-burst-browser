// @flow

import type {DOMScene} from "../dom-scene";

/** ルート要素のclass属性 */
const ROOT_CLASS = 'config-scene';

/**
 * ルート要素のHTML要素
 *
 * @return ルート要素のHTML要素
 */
function rootInnerHTML() {
  return `
    <div class="${ROOT_CLASS}__title">設定</div>
    <div class="${ROOT_CLASS}__configs">
      <div class="${ROOT_CLASS}__configs__webgl-pixel-ratio">
        <div class="${ROOT_CLASS}__configs__webgl-pixel-ratio__caption">WebGLピクセルレート</div>
        <select class="${ROOT_CLASS}__configs__webgl-pixel-ratio__selector">
          <option class="${ROOT_CLASS}__configs__webgl-pixel-ratio__selector__1" value="1">1</option>
          <option class="${ROOT_CLASS}__configs__webgl-pixel-ratio__selector__2" value="2">2</option>
        </select>
      </div>
    </div>
    <div class="${ROOT_CLASS}__footer">
      <button class="${ROOT_CLASS}__footer__prev">戻る</button>
      <button class="${ROOT_CLASS}__footer__config-change">設定変更する</button>
    </div>
  `;
}

/** 設定画面 */
export class ConfigScene implements DOMScene {
  _root: HTMLElement;

  /**
   * コンストラクタ
   */
  constructor() {
    this._root = document.createElement('div');
    this._root.innerHTML = rootInnerHTML();
    this._root.className = ROOT_CLASS;
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